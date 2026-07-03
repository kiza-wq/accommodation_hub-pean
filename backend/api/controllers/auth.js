import { prisma } from "../index.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registrated!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    const token = generateToken(newUser.id);

    const { hashedPassword: _, ...userwithoutPassword } = newUser;

    res.status(201).json({
      user: userwithoutPassword,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = generateToken(user.id);

    const { hashedPassword, ...userDetails } = user;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      id: user.id,
      name: user.name,
      image: user.image,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};
