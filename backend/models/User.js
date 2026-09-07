import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    countryCode: { type: String, default: "+1" },
    resetPasswordOtp: { type: String },
    resetPasswordExpires: { type: Date },
    // Onboarding Data Fields
    fullName: { type: String, default: "" },
    phone: { type: String, default: "" },
    country: { type: String, default: "" },
    childrenCount: { type: Number, default: 0 },
    childrenAges: [{ type: Number }],
    parentType: { type: String, default: "" },
    improveGoals: [{ type: String }],
    childValues: [{ type: String }],
    struggles: [{ type: String }],
    confidenceScale: { type: Number, default: 3 },
    emailOptIn: { type: Boolean, default: false },
    currentNeeds: [{ type: String }],

    // Gamification & Points (for Profile & Dashboard)
    points: { type: Number, default: 0 },
    tier: { type: String, default: "Tier 1" },
    streakDays: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
