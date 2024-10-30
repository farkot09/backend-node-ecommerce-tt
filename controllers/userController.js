const { User } = require("../models");
const jwt = require("jsonwebtoken");
const brcrypt = require("bcrypt");
require("dotenv").config();

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;
// eslint-disable-next-line no-undef
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || "1h";

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const userExists = await User.findOne({
        where: {
          email,
        },
      });
      if (userExists) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const userSaved = await User.create({
        username,
        email,
        password,
      });
      const token = jwt.sign({ id: userSaved.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_IN,
      });
      return res.status(201).json({
        message: "User Crated",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const isPasswordValid = await brcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_IN,
      });
      return res.status(200).json({
        message: "User logged in",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  logOutUSer: async (req, res) => {
    try {
      res.status(200).json({
        message: "User logged out",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const userExists = await User.findByPk(id);
      if (!userExists) {
        return res.status(404).json({
          message: "El usuario no existe",
        });
      }
      userExists.username = username || userExists.username;
      userExists.email = email || userExists.email;
      await userExists.save();
      return res.status(200).json({
        message: "User Updated",
        userExists,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      const userExists = await User.findByPk(id);

      if (!userExists) {
        return res.status(404).json({
          message: "El usuario no existe",
        });
      }

      const isPasswordValid = await brcrypt.compare(
        oldPassword,
        userExists.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "La contraseña es incorrecta",
        });
      }

      const hashedPassword = await brcrypt.hash(newPassword, 10);
      userExists.password = hashedPassword;
      await userExists.save();
      return res.status(200).json({
        message: "Password Updated",
        userExists,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
  deleteUSer: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "El usuario no existe",
        });
      }
      await user.destroy();
      return res.status(200).json({
        message: "User Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error,
      });
    }
  },
};

module.exports = UserController;
