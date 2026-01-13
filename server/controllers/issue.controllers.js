const expressAsyncHandler = require("express-async-handler");
const issueCollection = require("../models/issue.model");
const userCollection = require("../models/user.model");
const ApiResponse = require("../utils/ApiResponse.utils");
const ErrorHandler = require("../utils/ErrorHandler");

const createIssue = expressAsyncHandler(async (req, res) => {
  const { title, description, priority, assigned, forceCreate } = req.body;

  if (!title || !description) {
    throw new ErrorHandler("Title and description are required", 400);
  }

  let user = null;
  if (assigned) {
    user = await userCollection.findOne({ email: assigned });
    if (!user) {
      throw new ErrorHandler("Assigned user not found", 404);
    }
  }

  const similarIssues = await issueCollection
    .find({ $text: { $search: title } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .limit(5);

  if (similarIssues.length > 0 && !forceCreate) {
    return new ApiResponse(409, false, "Similar issues already exist", {
      warning: "Possible duplicate issues found",
      similarIssues,
    }).send(res);
  }

  const issue = await issueCollection.create({
    title,
    description,
    priority,
    createdBy: req.user.email,
    assigned: user?._id || null,
  });

  new ApiResponse(201, true, "Issue created successfully", issue).send(res);
});

const getMyIssues = expressAsyncHandler(async (req, res) => {
  const issues = await issueCollection
    .find({ assigned: req.user._id })
    .sort({ createdAt: -1 })
    .populate("assigned", "userName email");

  if (issues && issues.length === 0) {
    return new ApiResponse(200, true, "No issues found for the user", []).send(
      res
    );
  }

  new ApiResponse(200, true, "My issues fetched successfully", issues).send(
    res
  );
});

const updateIssueStatus = expressAsyncHandler(async (req, res, next) => {
  const { issueId } = req.params;
  const { status } = req.body;

  const issue = await issueCollection.findById(issueId);

  if (!issue) {
    throw new ErrorHandler("Issue not found", 404);
  }

  if (issue.status === "RESOLVED") {
    throw new ErrorHandler("Cannot update status of resolved issue", 400);
  }

  const updatedIssue = await issueCollection.findByIdAndUpdate(
    issueId,
    { status },
    { new: true }
  );

  new ApiResponse(200, true, "Status updated successfully", updatedIssue).send(
    res
  );
});

module.exports = { createIssue, getMyIssues, updateIssueStatus };
