




import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already registered" });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  });
};

