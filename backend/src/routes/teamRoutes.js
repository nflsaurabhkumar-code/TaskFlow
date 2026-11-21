import { Router } from "express";
import {
  requireOrganizationMember,
  requireOrganizationAdmin,
} from "../middleware/organizationMiddleware.js";
import { createTeam } from "../controllers/team/createTeam.js";
import { listTeams } from "../controllers/team/listTeams.js";

// mergeParams lets us read :organizationId from the parent route
const router = Router({ mergeParams: true });

router.post(
  "/",
  requireOrganizationMember,
  requireOrganizationAdmin,
  createTeam,
);
router.get("/", requireOrganizationMember, listTeams);

export default router;
