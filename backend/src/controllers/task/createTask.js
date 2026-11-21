import Project from "../../models/Project.js";
import Task from "../../models/Task.js";
import OrganizationMember from "../../models/OrganizationMember.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const createTask = asyncHandler(async (req, res) => {
  const {
    project,
    title,
    description = "",
    priority = "medium",
    dueDate = null,
    assignee = null,
  } = req.body;

  if (!project || !title?.trim()) {
    throw ApiError(400, "Project and task title are required");
  }

  const projectExists = await Project.exists({
    _id: project,
    organization: req.params.organizationId,
  });

  if (!projectExists) {
    throw ApiError(400, "Project does not belong to this organization");
  }

  // A task can only be assigned to someone from the same organization
  if (assignee) {
    const memberExists = await OrganizationMember.exists({
      organization: req.params.organizationId,
      user: assignee,
    });

    if (!memberExists) {
      throw ApiError(400, "Assignee must be a member of this organization");
    }
  }

  const task = await Task.create({
    organization: req.params.organizationId,
    project,
    title: title.trim(),
    description,
    priority,
    dueDate,
    assignee,
    createdBy: req.user._id,
  });

  return sendSuccess(res, { task }, "Task created", 201);
});
