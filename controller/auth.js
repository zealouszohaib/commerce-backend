const { User } = require("../models");
const { generateHash, compare } = require("../helper/hash");
const { generateToken } = require("../helper/jwt");
const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await generateHash(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user.toJSON());
    const refreshToken = generateToken(user.toJSON(), "1yr");

    console.log(token);
    res.status(200).json({ message: "Login successful", token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const me = (req, res, next) => {
  res.status(200).json({ msg: "this is me" });
};
module.exports = { signUp, loginController, me };
