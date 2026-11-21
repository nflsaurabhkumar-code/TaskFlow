import OrganizationMember from "../../models/OrganizationMember.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

// Returns all organizations the logged in user belongs to
export const listOrganizations = asyncHandler(async (req, res) => {
  const memberships = await OrganizationMember.find({ user: req.user._id })
    .populate("organization")
    .sort({ createdAt: -1 });

  const organizations = memberships.map((membership) => ({
    ...membership.organization.toJSON(),
    myRole: membership.role,
  }));

  return sendSuccess(res, { organizations });
});
