import Task from "../../models/Task.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const listTasks = asyncHandler(async (req, res) => {
  // Always show only the tasks of this organization
  const filter = {
    organization: req.params.organizationId,
  };

  // Optional filters: /tasks?status=done&priority=high
  if (req.query.project) filter.project = req.query.project;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;

  // Pagination: /tasks?page=2&limit=10
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
    100
  );

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .populate("project", "name")
      .populate("assignee", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Task.countDocuments(filter),
  ]);

  return sendSuccess(res, {
    tasks,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});
