
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { clearAuthCookie } from "../../utils/authToken.js";

// Logout user
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);

  return sendSuccess(res, null, "Logout successful");
});

// Get logged-in user
export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    { user: req.user },
    "User details fetched successfully"
  );
});
