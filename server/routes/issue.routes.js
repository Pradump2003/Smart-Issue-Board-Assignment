const { Router } = require("express");
const authenticate = require("../middleware/auth.middlewares");
const {
  createIssue,
  getMyIssues,
  updateIssueStatus,
} = require("../controllers/issue.controllers");

const issueRoutes = Router();

issueRoutes.post("/create-issue", authenticate, createIssue);
issueRoutes.get("/my-issues", authenticate, getMyIssues);
issueRoutes.patch("/update-status/:issueId", authenticate, updateIssueStatus);

module.exports = issueRoutes;
