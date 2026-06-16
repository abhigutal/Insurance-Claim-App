import React from "react";

import { useForm } from "react-hook-form";

import { motion } from "framer-motion";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import authService from "../../../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token =
        localStorage.getItem(
          "resetToken"
        );

      await authService.resetPassword(
        token,
        data.password
      );

      toast.success(
        "Password Updated Successfully"
      );

      localStorage.removeItem(
        "resetToken"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Reset Failed"
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
        <h2>Reset Password</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="password"
            placeholder="New Password"
            {...register("password", {
              required:
                "Password Required",
              minLength: {
                value: 8,
                message:
                  "Minimum 8 Characters"
              }
            })}
          />

          <span className="error">
            {errors.password?.message}
          </span>

          <input
            type="password"
            placeholder="Confirm Password"
            {...register(
              "confirmPassword",
              {
                validate: (value) =>
                  value ===
                    watch("password") ||
                  "Passwords Do Not Match"
              }
            )}
          />

          <span className="error">
            {
              errors.confirmPassword
                ?.message
            }
          </span>

          <button type="submit">
            Update Password
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;