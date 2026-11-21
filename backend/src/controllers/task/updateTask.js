import Task from "../../models/Task.js";
import OrganizationMember from "../../models/OrganizationMember.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

// Only these fields can be changed by the user
const ALLOWED_FIELDS = ["title", "description", "status", "priority", "assignee", "dueDate"];

export const updateTask = asyncHandler(async (req, res) => {
  const updates = {};

  for (const field of ALLOWED_FIELDS) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw ApiError(400, "Please provide at least one field to update");
  }

  if (updates.title !== undefined && !updates.title.trim()) {
    throw ApiError(400, "Task title cannot be empty");
  }

  if (updates.status && !["todo", "in_progress", "done"].includes(updates.status)) {
    throw ApiError(400, "Invalid task status");
  }

  if (updates.priority && !["low", "medium", "high", "urgent"].includes(updates.priority)) {
    throw ApiError(400, "Invalid task priority");
  }

  if (updates.assignee) {
    const memberExists = await OrganizationMember.exists({
      organization: req.params.organizationId,
      user: updates.assignee,
    });

    if (!memberExists) {
      throw ApiError(400, "Assignee must be a member of this organization");
    }
  }

  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, organization: req.params.organizationId },
    { $set: updates },
    { new: true, runValidators: true }
  )
    .populate("project", "name")
    .populate("assignee", "name email");

  if (!task) {
    throw ApiError(404, "Task not found");
  }

  return sendSuccess(res, { task }, "Task updated");
});
