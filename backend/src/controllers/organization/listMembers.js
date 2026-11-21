import OrganizationMember from "../../models/OrganizationMember.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const listMembers = asyncHandler(async (req, res) => {
  const members = await OrganizationMember.find({
    organization: req.params.organizationId,
  })
    .populate("user", "name email")
    .sort({ createdAt: 1 });

  return sendSuccess(res, { members });
});
