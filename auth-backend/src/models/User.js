import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: function (value) {
          // allows letters + numbers + special characters
          return /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/.test(value);
        },
        message:
          "Password must be at least 6 characters and contain both letters and numbers",
      },
    },
  },
  {
    timestamps: true,
  },
);

// PRE-SAVE HOOK (HASH PASSWORD)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
