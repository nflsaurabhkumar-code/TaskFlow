import OrganizationMember from "../models/OrganizationMember.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const requireOrganizationMember = asyncHandler(
  async (req, _res, next) => {
    const organizationId = req.params.organizationId;

    const membership = await OrganizationMember.findOne({
      organization: organizationId,
      user: req.user._id,
    });

    if (!membership) {
      throw ApiError(403, "You are not a member of this organization");
    }

    // Controllers can use this to check the user's organization role.
    req.membership = membership;
    next();
  },
);

export function requireOrganizationAdmin(req, _res, next) {
  if (req.membership?.role !== "admin") {
    return next(ApiError(403, "Organization admin permission required"));
  }

  next();
}
