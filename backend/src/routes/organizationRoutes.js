import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireOrganizationMember } from "../middleware/organizationMiddleware.js";
import { createOrganization } from "../controllers/organization/createOrganization.js";
import { listOrganizations } from "../controllers/organization/listOrganizations.js";
import { getOrganization } from "../controllers/organization/getOrganization.js";
import { listMembers } from "../controllers/organization/listMembers.js";
import teamRoutes from "./teamRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

// Every organization route needs a logged in user
router.use(requireAuth);

router.post("/", createOrganization);
router.get("/", listOrganizations);

router.get("/:organizationId", requireOrganizationMember, getOrganization);
router.get("/:organizationId/members", requireOrganizationMember, listMembers);

// Teams, projects and tasks live inside an organization
router.use("/:organizationId/teams", teamRoutes);
router.use("/:organizationId/projects", projectRoutes);
router.use("/:organizationId/tasks", taskRoutes);

export default router;
