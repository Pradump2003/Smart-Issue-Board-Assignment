const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [5, "Email must be at least 5 characters"],
      maxlength: [40, "Email must be at most 40 characters"],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please Enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [5, "Password must be at least 5 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcryptjs.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcryptjs.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
