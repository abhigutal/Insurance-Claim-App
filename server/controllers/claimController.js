import Claim from "../models/Claim.js";

/* CREATE CLAIM */
export const createClaim = async (req, res) => {
  try {
    const user_id = req.user.id;

    const {
      title,
      description,
      claim_type,
      amount
    } = req.body;

    await Claim.create({
      user_id,
      title,
      description,
      claim_type,
      amount
    });

    res.status(201).json({
      success: true,
      message: "Claim Created Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* GET USER CLAIMS */
export const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.getByUser(req.user.id);

    res.json({
      success: true,
      claims
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* GET ALL CLAIMS (ADMIN/OFFICER) */
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.getAll();

    res.json({
      success: true,
      claims
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* UPDATE STATUS */
export const updateClaimStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await Claim.updateStatus(id, status);

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ASSIGN SURVEYOR */
export const assignSurveyor = async (req, res) => {
  try {
    const { id, surveyor_id } = req.body;

    await Claim.assignSurveyor(id, surveyor_id);

    res.json({
      success: true,
      message: "Surveyor Assigned"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};