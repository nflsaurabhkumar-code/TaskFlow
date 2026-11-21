import Organization from "../../models/Organization.js";
import OrganizationMember from "../../models/OrganizationMember.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

// Turns "My Company!" into "my-company"
function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const createOrganization = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    throw ApiError(400, "Organization name is required");
  }

  const cleanName = name.trim();
  const baseSlug = makeSlug(cleanName);

  if (!baseSlug) {
    throw ApiError(
      400,
      "Please use letters or numbers in the organization name",
    );
  }

  // If the slug is already used, add a number at the end (my-company-2)
  let slug = baseSlug;
  let number = 1;

  while (await Organization.exists({ slug })) {
    number += 1;
    slug = `${baseSlug}-${number}`;
  }

  const organization = await Organization.create({
    name: cleanName,
    slug,
    createdBy: req.user._id,
  });

  // The person who creates the organization becomes its admin
  await OrganizationMember.create({
    organization: organization._id,
    user: req.user._id,
    role: "admin",
  });

  return sendSuccess(res, { organization }, "Organization created", 201);
});
