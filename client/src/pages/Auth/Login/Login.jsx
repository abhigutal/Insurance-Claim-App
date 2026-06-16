import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
  FaEye,
  FaEyeSlash,
  FaUserShield
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { RiLockPasswordFill } from "react-icons/ri";

import authService from "../../../services/authService";

import { useAuth } from "../../../context/AuthContext";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response =
        await authService.login({
          identifier: data.identifier,
          password: data.password
        });

      login(
        response.user,
        response.token
      );

      toast.success(
        "Login Successful"
      );

      switch (
        response.user.role
      ) {
        case "customer":
          navigate(
            "/customer/dashboard"
          );
          break;

        case "claimOfficer":
          navigate(
            "/claim-officer/dashboard"
          );
          break;

        case "surveyor":
          navigate(
            "/surveyor/dashboard"
          );
          break;

        case "admin":
          navigate(
            "/admin/dashboard"
          );
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <motion.div
        className="login-card"
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
      >
        <div className="login-header">
          <FaUserShield
            size={55}
          />

          <h1>
            Insurance Portal
          </h1>

          <p>
            Secure Login
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <div className="input-group">
            <MdEmail />

            <input
              type="text"
              placeholder="Email / Username / Mobile"
              {...register(
                "identifier",
                {
                  required:
                    "Identifier Required"
                }
              )}
            />

            {errors.identifier && (
              <span className="error">
                {
                  errors.identifier
                    .message
                }
              </span>
            )}
          </div>

          <div className="input-group">
            <RiLockPasswordFill />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              {...register(
                "password",
                {
                  required:
                    "Password Required"
                }
              )}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

            {errors.password && (
              <span className="error">
                {
                  errors.password
                    .message
                }
              </span>
            )}
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
              />
              Remember Me
            </label>

            <span
              className="forgot-link"
              onClick={() =>
                navigate(
                  "/forgot-password"
                )
              }
            >
              Forgot Password?
            </span>
          </div>

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </motion.button>

          <div className="divider">
            OR
          </div>

          <button
            type="button"
            className="google-btn"
          >
            Login with Google
          </button>

          <button
            type="button"
            className="apple-btn"
          >
            Login with Apple
          </button>

          <p className="signup-link">
            Don't have an account?

            <span
              onClick={() =>
                navigate(
                  "/signup"
                )
              }
            >
              Sign Up
            </span>
          </p>
        </form>
      </motion.div>

    </div>
  );
};

export default Login;