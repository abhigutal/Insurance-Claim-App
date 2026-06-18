import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";
import authService from "../../../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUserShield,
  FaClipboardCheck,
  FaSearch,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaCalendarAlt,
  FaVenusMars
} from "react-icons/fa";


const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [selectedRole, setSelectedRole] =
    useState("customer");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role: "customer"
    }
  });

  const getStrength = () => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password))
      strength++;

    return strength;
  };

  const strength = getStrength();

  const strengthText = [
    "Weak",
    "Weak",
    "Medium",
    "Good",
    "Strong"
  ][strength];

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger([
        "fullName",
        "username"
      ]);
    }

    if (step === 2) {
  valid = await trigger([
    "email",
    "mobile",
    "adhaar",
    "dob",
    "gender",
    "address"
  ]);
}

    if (valid) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data) => {

  try {

    setLoading(true);

    const payload = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      mobile: data.mobile,
      adhaar: data.adhaar,
      dob: data.dob,
      gender: data.gender,
      address: data.address,
      password: data.password,
      role: data.role
};

console.log("Sending Data:", payload);

    const response =
      await authService.register(payload);

    toast.success(
      response?.message ||
      `Welcome ${data.fullName}! Account created successfully.`
    );

    setTimeout(() => {

      navigate("/login");

    }, 1500);

  } catch (error) {

  toast.error(
    error?.response?.data?.message ||
    error?.message ||
    "Unable to create account. Please try again."
  );
  } finally {

    setLoading(false);

  }

};
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{
              opacity: 0,
              x: 100
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -100
            }}
          >
            <div className="input-box">
              <FaUser />

              <input
                placeholder="Full Name"
                {...register(
                  "fullName",
                  {
                    required:
                      "Full Name Required"
                  }
                )}
              />
            </div>

            {errors.fullName && (
              <p className="error">
                {
                  errors.fullName
                    .message
                }
              </p>
            )}

            <div className="input-box">
              <FaUser />

              <input
                placeholder="Username"
                {...register("username", {
                  required:
                    "Username is required",

                  minLength: {
                    value: 4,
                    message:
                      "Username must be at least 4 characters"
                }
              })}
              />
            </div>

            {errors.username && (
              <p className="error">
                {
                  errors.username
                    .message
                }
              </p>
            )}

            <button
              type="button"
              className="next-btn"
              onClick={nextStep}
            >
              Continue
              <FaArrowRight />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{
              opacity: 0,
              x: 100
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -100
            }}
          >
            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })}
              />
            </div>

            {errors.email && (
              <p className="error">
                {errors.email.message}
              </p>
            )}

            <div className="input-box">
              <FaPhone />

              <input
                placeholder="Mobile Number"
                {...register("mobile", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message:
                      "Enter a valid 10-digit mobile number"
                  }
                })}
              />
            </div>

            {errors.mobile && (
              <p className="error">
                {
                  errors.mobile
                    .message
                }
              </p>
            )}

            <div className="input-box">
              <FaIdCard />

              <input
                placeholder="Aadhaar Number"
                {...register("adhaar", {
                  required:
                    "Aadhaar Number is required",
                  pattern: {
                    value: /^\d{12}$/,
                    message:
                      "Aadhaar Number must be exactly 12 digits"
                  }
                })}
              />
            </div>

            {errors.adhaar && (
              <p className="error">
                {errors.adhaar.message}
              </p>
            )}

            <div className="input-box">
              <FaCalendarAlt />

              <input
                type="date"
                {...register("dob", {
                required:
                  "Date of Birth is required",

                validate: value => {

                  const birthDate =
                    new Date(value);

                  const today =
                    new Date();

                  let age =
                    today.getFullYear() -
                    birthDate.getFullYear();

                  if (age < 18) {
                    return "You must be at least 18 years old";
                  }

                  return true;
                }
              })}
              />
            </div>

            {errors.dob && (
              <p className="error">
                {errors.dob.message}
              </p>
            )}

            <div className="input-box">
              <FaVenusMars />
              <select
                className="custom-select"
                {...register("gender", {
                  required:
                    "Please select gender"
                })}
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>
            </div>

            {errors.gender && (
              <p className="error">
                {errors.gender.message}
              </p>
            )}

            <div className="input-box">
              <FaMapMarkerAlt />

              <textarea
                placeholder="Residential Address"
                {...register(
                  "address",
                  {
                    required:
                      "Address Required"
                  }
                )}
              />
            </div>

            <div className="btn-group">
              <button
                type="button"
                className="back-btn"
                onClick={
                  previousStep
                }
              >
                <FaArrowLeft />
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={nextStep}
              >
                Continue
                <FaArrowRight />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{
              opacity: 0,
              x: 100
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -100
            }}
          >
            {/* Password */}

            <div className="password-box">
              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                {...register("password", {
                  required:
                    "Password is required",

                  minLength: {
                    value: 8,
                    message:
                      "Password must contain at least 8 characters"
                  },

                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                    message:
                      "Password must contain uppercase, lowercase, number and special character"
                  }
                })}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
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
                  {errors.password.message}
                </p>
              )}

            <div className="strength-container">
              <div
                className={`strength-bar level-${strength}`}
              />

              <span>
                {strengthText}
              </span>
            </div>

            <div className="password-box">
              <FaLock />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                {...register(
                  "confirmPassword",
                  {
                                     
                      required:
                        "Please confirm password",

                      validate:
                        value =>
                          value === watch("password") ||
                          "Passwords do not match"
                    
                  }
                  )}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="error">
                {
                  errors
                    .confirmPassword
                    .message
                }
              </p>
            )}

            {/* Roles */}

            <h4 className="role-title">
              Select Role
            </h4>

            <div className="role-grid">
              <div
                className={`role-card ${
                  selectedRole ===
                  "customer"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  selectRole(
                    "customer"
                  )
                }
              >
                <FaUserShield />
                <span>
                  Customer
                </span>
              </div>

              <div
                className={`role-card ${
                  selectedRole ===
                  "claimOfficer"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  selectRole(
                    "claimOfficer"
                  )
                }
              >
                <FaClipboardCheck />
                <span>
                  Claim Officer
                </span>
              </div>

              <div
                className={`role-card ${
                  selectedRole ===
                  "surveyor"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  selectRole(
                    "surveyor"
                  )
                }
              >
                <FaSearch />
                <span>
                  Surveyor
                </span>
              </div>
            </div>

            <input
              type="hidden"
              {...register("role")}
            />

            <label className="terms">
              <input
                type="checkbox"
                {...register(
                  "terms",
                  {
                    required:
                      true
                  }
                )}
              />
              I accept Terms &
              Conditions
            </label>
              {
                errors.terms && (
                  <p className="error">
                    Please accept Terms & Conditions
                  </p>
              )}

            <div className="btn-group">
              <button
                type="button"
                className="back-btn"
                onClick={
                  previousStep
                }
              >
                <FaArrowLeft />
              </button>

              <button
                type="submit"
                className="register-btn"
                disabled={
                  loading
                }
              >
                {loading
                  ? "Creating..."
                  : "Create Account"}
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="signup-page">

      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>

      <motion.div
        className="glass-wrapper"
        initial={{
          opacity: 0,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
      >
        <motion.div
          className="brand-section"
          initial={{
            y: -30,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
        >
          <FaShieldAlt className="brand-logo" />

          <h1>
            SureCare Insurance
          </h1>

          <p>
            Your Protection.
            Perfectly Managed.
          </p>
        </motion.div>

        <div className="signup-card">
          <h2>
            Create Your Account
          </h2>

          <p className="subtitle">
            Join SureCare —
            It only takes a
            minute
          </p>

          <div className="stepper">
            <div
              className={
                step >= 1
                  ? "active"
                  : ""
              }
            >
              1
            </div>

            <div
              className={
                step >= 2
                  ? "active"
                  : ""
              }
            >
              2
            </div>

            <div
              className={
                step >= 3
                  ? "active"
                  : ""
              }
            >
              3
            </div>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
          >
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </form>

          <div className="signin-link">
            Already have an
            account?

            <span
              onClick={() =>
                navigate(
                  "/login"
                )
              }
            >
              Sign In
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;