import mongoose from "mongoose";

const communitySolutionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      default: "General Parenting",
    },
    ageGroup: {
      type: String,
      default: "All Ages",
    },
    rating: { type: Number, default: 5 },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const CommunitySolution = mongoose.model(
  "CommunitySolution",
  communitySolutionSchema,
);

export default CommunitySolution;
