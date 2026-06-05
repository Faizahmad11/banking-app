const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    ac_type: {
      type: String,
      required: true,
      enum: ["current", "savings"],
      default: "savings",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("user", userSchema);

exports.UserModel = model;