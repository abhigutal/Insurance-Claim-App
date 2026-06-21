import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { googleLoginUser } from "../controllers/authController.js"; 

const router = express.Router();

/*
=========================================
PUBLIC ROUTES
=========================================
*/

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/google-login", googleLoginUser);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

/*
=========================================
PROTECTED ROUTES
=========================================
*/

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

/*
=========================================
ADMIN ROUTES
=========================================
*/

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

export default router;