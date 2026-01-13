const expressAsyncHandler = require("express-async-handler");
const userCollection = require("../models/user.model");
const ApiResponse = require("../utils/ApiResponse.utils");
const ErrorHandler = require("../utils/ErrorHandler");
const generateJWTToken = require("../utils/jwt.utils");

const registerUser = expressAsyncHandler(async (req, res) => {
  let { userName, email, password } = req.body;
  let user = await userCollection.create({ userName, email, password });
  new ApiResponse(201, true, "User Created Successfully", user).send(res);
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let existingUser = await userCollection
    .findOne({ email })
    .select("+password");
  console.log(existingUser);
  if (!existingUser)
    return next(new ErrorHandler("No account find this email", 404));
  let isMatch = await existingUser.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid Credential", 401));
  let token = await generateJWTToken(existingUser._id);

  res.setHeader("Cache-Control", "no-store");

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  new ApiResponse(200, true, "User Login Successfully", {
    id: existingUser._id,
    email: existingUser.email,
    userName: existingUser.userName,
  }).send(res);
});

const logoutUser = expressAsyncHandler(async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.status(204).end();
});

const getMe = expressAsyncHandler((req, res) => {
  new ApiResponse(200, true, "User fetched successfully", {
    id: req.user._id,
    email: req.user.email,
    userName: req.user.userName,
  }).send(res);
});

const allUsers = expressAsyncHandler(async (req, res) => {
  const users = await userCollection.find({});
  new ApiResponse(200, true, "Users fetched successfully", users).send(res);
});

module.exports = { registerUser, loginUser, logoutUser, getMe, allUsers };
