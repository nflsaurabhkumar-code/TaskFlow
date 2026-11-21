import Organization from "../../models/Organization.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const getOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.organizationId);

  if (!organization) {
    throw ApiError(404, "Organization not found");
  }

  return sendSuccess(res, {
    organization,
    myRole: req.membership.role,
  });
});
