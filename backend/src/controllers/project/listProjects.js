import Project from "../../models/Project.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const listProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    organization: req.params.organizationId,
  })
    .populate("team", "name")
    .sort({ createdAt: -1 });

  return sendSuccess(res, { projects });
});
