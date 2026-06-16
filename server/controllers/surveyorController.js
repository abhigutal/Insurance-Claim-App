import Inspection from "../models/Inspection.js";

/* SUBMIT INSPECTION REPORT */
export const submitReport = async (req, res) => {
  try {
    const surveyor_id = req.user.id;

    const {
      claim_id,
      report,
      damage_level,
      recommendation
    } = req.body;

    const images =
      req.body.images || null;

    await Inspection.create({
      claim_id,
      surveyor_id,
      report,
      images,
      damage_level,
      recommendation
    });

    res.status(201).json({
      success: true,
      message: "Inspection Report Submitted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* GET ASSIGNED INSPECTIONS */
export const getMyInspections = async (req, res) => {
  try {
    const data = await Inspection.getBySurveyor(req.user.id);

    res.json({
      success: true,
      inspections: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};