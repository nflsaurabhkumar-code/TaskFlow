import { Router } from "express";
import { requireOrganizationMember } from "../middleware/organizationMiddleware.js";
import { createTask } from "../controllers/task/createTask.js";
import { listTasks } from "../controllers/task/listTasks.js";
import { updateTask } from "../controllers/task/updateTask.js";
import { deleteTask } from "../controllers/task/deleteTask.js";

const router = Router({ mergeParams: true });

// Any member of the organization can work with tasks
router.use(requireOrganizationMember);

router.post("/", createTask);
router.get("/", listTasks);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
