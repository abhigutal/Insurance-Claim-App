import express from "express";

import {
  createClaim,
  getUserClaims,
  getAllClaims,
  updateClaimStatus,
  assignSurveyor
} from "../controllers/claimController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* CUSTOMER */
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("customer"),
  createClaim
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("customer"),
  getUserClaims
);

/* ADMIN + OFFICER */
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin", "claimOfficer"),
  getAllClaims
);

router.put(
  "/status",
  authMiddleware,
  roleMiddleware("admin", "claimOfficer"),
  updateClaimStatus
);

router.put(
  "/assign-surveyor",
  authMiddleware,
  roleMiddleware("admin"),
  assignSurveyor
);

export default router;