import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const resetTokens = new Map();

/*
=========================================
REGISTER USER
=========================================
*/

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      adhaar,
      dob,
      gender,
      address,
      username,
      password,
      role
    } = req.body;

    const emailExists =
      await User.findByEmail(email);

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const usernameExists =
      await User.findByUsername(username);

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    const mobileExists =
      await User.findByMobile(mobile);

    if (mobileExists) {
      return res.status(400).json({
        success: false,
        message: "Mobile already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const result = await User.create({
      fullName,
      email,
      mobile,
      adhaar,
      dob,
      gender,
      address,
      username,
      password: hashedPassword,
      role
    });

    const token = generateToken({
      id: result.insertId,
      email,
      role
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
=========================================
LOGIN USER
=========================================
*/

export const loginUser = async (req, res) => {
  try {
    const {
      identifier,
      password
    } = req.body;

    let user = null;

    user =
      (await User.findByEmail(identifier)) ||
      (await User.findByUsername(identifier)) ||
      (await User.findByMobile(identifier));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token =
      generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
=========================================
GET PROFILE
=========================================
*/

export const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/*
=========================================
FORGOT PASSWORD
=========================================
*/

export const forgotPassword =
  async (req, res) => {
    try {
      const { email } = req.body;

      const user =
        await User.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Email not found"
        });
      }

      const resetToken =
        crypto.randomBytes(32)
          .toString("hex");

      resetTokens.set(
        resetToken,
        user.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Reset token generated",
        resetToken
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

/*
=========================================
RESET PASSWORD
=========================================
*/

export const resetPassword =
  async (req, res) => {
    try {
      const {
        token,
        password
      } = req.body;

      const userId =
        resetTokens.get(token);

      if (!userId) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid reset token"
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await User.updatePassword(
        userId,
        hashedPassword
      );

      resetTokens.delete(token);

      return res.status(200).json({
        success: true,
        message:
          "Password Updated Successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

/*
=========================================
ADMIN GET USERS
=========================================
*/

export const getUsers =
  async (req, res) => {
    try {
      const users =
        await User.getAllUsers();

      return res.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

/*
=========================================
ADMIN DELETE USER
=========================================
*/

export const deleteUser =
  async (req, res) => {
    try {
      const { id } = req.params;

      await User.deleteUser(id);

      return res.status(200).json({
        success: true,
        message:
          "User Deleted Successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };