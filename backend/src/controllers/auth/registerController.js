import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { createToken, setAuthCookie } from "../../utils/authToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw ApiError(400, "All fields are required");
  }

  if (password.length < 8) {
    throw ApiError(400, "Password must be at least 8 characters");
  }

  const userExists = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (userExists) {
    throw ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  const token = createToken(user._id);

  setAuthCookie(res, token);

  return sendSuccess(
    res,
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    "Account created successfully",
    201,
  );
});
