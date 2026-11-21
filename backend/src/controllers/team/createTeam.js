import Team from "../../models/Team.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

// Admin check is done in the route (requireOrganizationAdmin)
export const createTeam = asyncHandler(async (req, res) => {
  const { name, description = "" } = req.body;

  if (!name?.trim()) {
    throw ApiError(400, "Team name is required");
  }

  const team = await Team.create({
    organization: req.params.organizationId,
    name: name.trim(),
    description,
    createdBy: req.user._id,
    members: [req.user._id],
  });

  return sendSuccess(res, { team }, "Team created", 201);
});
