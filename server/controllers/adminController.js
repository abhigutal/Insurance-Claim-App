import User from "../models/User.js";
import Claim from "../models/Claim.js";

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    res.json({
      success: true,
      users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   UPDATE USER ROLE
========================= */
export const updateUserRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    await User.updateRole(id, role);

    res.json({
      success: true,
      message: "Role Updated"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.deleteUser(id);

    res.json({
      success: true,
      message: "User Deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   GET ALL CLAIMS
========================= */
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.getAll();

    res.json({
      success: true,
      claims
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   FINAL CLAIM DECISION
========================= */
export const updateClaimStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await Claim.updateStatus(id, status);

    res.json({
      success: true,
      message: "Claim Updated"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};