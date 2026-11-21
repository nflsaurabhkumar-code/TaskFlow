import Team from "../../models/Team.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const listTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({
    organization: req.params.organizationId,
  })
    .populate("members", "name email")
    .sort({ createdAt: -1 });

  return sendSuccess(res, { teams });
});
