import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { createToken, setAuthCookie } from "../../utils/authToken.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    throw ApiError(400, "Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Password is hidden by default in the User model, so we select it here
  const user = await User.findOne({ email: normalizedEmail }).select(
    "+password",
  );

  if (!user) {
    throw ApiError(401, "Invalid email or password");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    throw ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw ApiError(403, "Account is disabled");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = createToken(user._id);
  setAuthCookie(res, token);

  return sendSuccess(res, { user }, "Logged in");
});
