const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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

userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
});

const model = mongoose.model("user", userSchema);

exports.UserModel = model;