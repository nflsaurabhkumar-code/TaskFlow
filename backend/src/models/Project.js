import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
    status: { type: String, enum: ["planned", "active", "completed"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);

projectSchema.index({ organization: 1, createdAt: -1 });
export default mongoose.model("Project", projectSchema);
