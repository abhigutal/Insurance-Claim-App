import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import authService from "../../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response =
        await authService.forgotPassword(
          data.email
        );

      localStorage.setItem(
        "resetToken",
        response.resetToken
      );

      toast.success(
        "Reset Token Generated"
      );

      navigate("/reset-password");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Request Failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Forgot Password</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            placeholder="Enter Email Address"
            {...register("email", {
              required:
                "Email is required"
            })}
          />

          <span className="error">
            {errors.email?.message}
          </span>

          <button type="submit">
            Send Reset Link
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;