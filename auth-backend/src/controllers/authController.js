import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isValidPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(
      password,
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters and contain letters and numbers",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
