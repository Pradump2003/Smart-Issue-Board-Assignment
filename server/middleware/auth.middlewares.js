const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const userCollection = require("../models/user.model");

const authenticate = expressAsyncHandler(async (req, res, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("You are not logged in", 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const userId = decodedToken.payload;

  const user = await userCollection.findById(userId);
  if (!user) {
    return next(new ErrorHandler("Invalid token, login again", 401));
  }

  req.user = user;
  next();
});

module.exports = authenticate;
