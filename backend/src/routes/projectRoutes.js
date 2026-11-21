import { Router } from "express";
import {
  requireOrganizationMember,
  requireOrganizationAdmin,
} from "../middleware/organizationMiddleware.js";
import { createProject } from "../controllers/project/createProject.js";
import { listProjects } from "../controllers/project/listProjects.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  requireOrganizationMember,
  requireOrganizationAdmin,
  createProject,
);
router.get("/", requireOrganizationMember, listProjects);

export default router;
