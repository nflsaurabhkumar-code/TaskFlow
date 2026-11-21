import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw ApiError(401, "Authentication required");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw ApiError(401, "Invalid or expired session");
  }

  const user = await User.findById(decodedToken.userId);

  if (!user || !user.isActive) {
    throw ApiError(401, "Account not available");
  }

  req.user = user;
  next();
});
