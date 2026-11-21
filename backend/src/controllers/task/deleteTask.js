import Task from "../../models/Task.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.taskId,
    organization: req.params.organizationId,
  });

  if (!task) {
    throw ApiError(404, "Task not found");
  }

  return sendSuccess(res, null, "Task deleted");
});
