const mongoose = require("mongoose");
const { trim } = require("validator");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
      default: "OPEN",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

issueSchema.index(
  { title: "text", description: "text" },
  { weights: { title: 5, description: 1 } }
);

module.exports = mongoose.model("Issue", issueSchema);
