import express from "express";

import {
  submitReport,
  getMyInspections
} from "../controllers/surveyorController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* SURVEYOR ONLY */

router.post(
  "/submit",
  authMiddleware,
  roleMiddleware("surveyor"),
  submitReport
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("surveyor"),
  getMyInspections
);

export default router;