import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";

import {
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaGoogle,
  FaApple,
  FaSignInAlt
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

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
          identifier:
            data.identifier,
          password:
            data.password
        });

        login(
          response.user,
          response.token
        )

      const token =
        response?.token;

      const user =
        response?.user;

      if (!user) {
        throw new Error(
          "Invalid server response"
        );
      }

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success(
        `Welcome ${user.fullName}`
      );

      switch (user.role) {
        case "customer":
          navigate(
            "/customer/dashboard"
          );
          break;

        case "surveyor":
          navigate(
            "/surveyor/dashboard"
          );
          break;

        case "claimOfficer":
          navigate(
            "/claim-officer/dashboard"
          );
          break;

        case "admin":
          navigate(
            "/admin/dashboard"
          );
          break;

        default:
          navigate("/");
      }

    } catch (error) {

      toast.error(
        error?.response?.data
          ?.message ||
          error?.message ||
          "Invalid credentials"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="login-circle circle-one"></div>
      <div className="login-circle circle-two"></div>

      <motion.div
        className="login-wrapper"
        initial={{
          opacity: 0,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
      >

        {/* Left Side */}

        <motion.div
          className="login-brand"
          initial={{
            x: -80,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
        >

          <div className="brand-icon">
            <FaShieldAlt />
          </div>

          <h1>
            SureCare Insurance
          </h1>

          <h2>
            Secure Claim
            Management System
          </h2>

          <p>
            Fast Claims • Smart
            Tracking • Secure
            Verification
          </p>

          <div className="feature-list">

            <div className="feature-item">
              ✓ Real-Time Claim Tracking
            </div>

            <div className="feature-item">
              ✓ Surveyor Management
            </div>

            <div className="feature-item">
              ✓ Secure Document Storage
            </div>

            <div className="feature-item">
              ✓ Instant Notifications
            </div>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          className="login-card"
          initial={{
            x: 80,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
        >

          <div className="login-header">

            <h2>
              Welcome Back 👋
            </h2>

            <p>
              Sign in to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
          >

            {/* Identifier */}

            <div className="input-group">

              <MdEmail />

              <input
                type="text"
                placeholder="Email / Username / Mobile"
                {...register(
                  "identifier",
                  {
                    required:
                      "Email, Username or Mobile is required"
                  }
                )}
              />

            </div>

            {errors.identifier && (
              <p className="error">
                {
                  errors.identifier
                    .message
                }
              </p>
            )}

            {/* Password */}

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
                      "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters"
                    }
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

            </div>

            {errors.password && (
              <p className="error">
                {
                  errors.password
                    .message
                }
              </p>
            )}

            <div className="login-options">

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
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              disabled={loading}
            >

              <FaSignInAlt />

              {loading
                ? "Logging In..."
                : "Login"}

            </motion.button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="google-btn"
            >
              <FaGoogle />
              Continue with Google
            </button>

            <button
              type="button"
              className="apple-btn"
            >
              <FaApple />
              Continue with Apple
            </button>

            <div className="signup-link">

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

            </div>

          </form>

        </motion.div>

      </motion.div>

    </div>
  );
};

export default Login;