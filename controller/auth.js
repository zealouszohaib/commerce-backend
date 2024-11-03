const { User } = require("../models");
const { generateHash, compare } = require("../helper/hash");
const { generateToken } = require("../helper/jwt");

const signUp = async (req, res, next) => {
  try {
    const { name, email,isAdmin, password  } = req.body;

 

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await generateHash(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const logout=async (req,res) => {

  console.log("inside logout");
  return res.status(200).json({ message: "logout" });
  
}

const login = async (req, res) => {
  try {
    console.log('COME TO LOGIN')
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


const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName, lastName, username, phone, email, password, profileImage = null,
  } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: req.__('user_not_found') });
    }
    if (email) {
      const emailExists = await User.findOne({
        where: { email, userId: { [Op.ne]: userId } },
      });

      if (emailExists) {
        return res.status(400).json({ message: req.__('email_already_in_use') });
      }
    }

    if (username) {
      const usernameExists = await User.findOne({
        where: { username, userId: { [Op.ne]: userId } },
      });

      if (usernameExists) {
        return res.status(400).json({ message: req.__('username_already_taken') });
      }
    }

    if (firstName !== null && firstName !== undefined && firstName !== '') {
      user.firstName = firstName;
    }
    if (lastName !== null && lastName !== undefined && lastName !== '') {
      user.lastName = lastName;
    }
    if (username !== null && username !== undefined && username !== '') {
      user.username = username;
    }
    if (phone !== null && phone !== undefined && phone !== '') {
      user.phone = phone;
    }
    if (email !== null && email !== undefined && email !== '') {
      user.email = email;
    }
    if (password !== null && password !== undefined && password !== '') {
      user.password = await generateHash(password);
    }
    if (profileImage !== null && profileImage !== undefined && profileImage !== '') {
      user.profileImage = profileImage;
    }

    // Save updated user details to the database
    await user.save();

    return res.status(200).json({
      message: req.__('user_updated_successfully'),
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phone: user.phone,
        email: user.email,
        profileImage: profileImage ? getSASURL(profileImage) : getSASURL(user.profileImage),
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: req.__('server_error'), error });
  }
};


module.exports = { signUp, logout,login, me,updateUser, };
