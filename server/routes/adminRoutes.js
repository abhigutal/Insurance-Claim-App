import express from "express";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllClaims,
  updateClaimStatus
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ONLY ADMIN ACCESS */

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.put(
  "/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);

router.delete(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

/* CLAIM CONTROL */

router.get(
  "/claims",
  authMiddleware,
  roleMiddleware("admin"),
  getAllClaims
);

router.put(
  "/claim/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateClaimStatus
);

export default router;