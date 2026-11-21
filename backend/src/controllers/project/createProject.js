import Team from "../../models/Team.js";
import Project from "../../models/Project.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

// Admin check is done in the route (requireOrganizationAdmin)
export const createProject = asyncHandler(async (req, res) => {
  const { name, description = "", team = null, dueDate = null } = req.body;

  if (!name?.trim()) {
    throw ApiError(400, "Project name is required");
  }

  // If a team is given, it must belong to the same organization
  if (team) {
    const teamExists = await Team.exists({
      _id: team,
      organization: req.params.organizationId,
    });

    if (!teamExists) {
      throw ApiError(400, "Team does not belong to this organization");
    }
  }

  const project = await Project.create({
    organization: req.params.organizationId,
    name: name.trim(),
    description,
    team,
    dueDate,
    createdBy: req.user._id,
  });

  return sendSuccess(res, { project }, "Project created", 201);
});
