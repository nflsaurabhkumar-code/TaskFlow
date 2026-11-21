import jwt from "jsonwebtoken";

// Both login and register use these helpers.

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: isProduction() ? "none" : "lax",
  };
}

// Creates a JWT token for the user
export function createToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

// Saves the token in an HTTP-only cookie
export function setAuthCookie(res, token) {
  res.cookie("accessToken", token, {
    ...cookieOptions(),
    maxAge: 24 * 60 * 60 * 1000,
  });
}

// Removes the cookie on logout
export function clearAuthCookie(res) {
  res.clearCookie("accessToken", cookieOptions());
}
