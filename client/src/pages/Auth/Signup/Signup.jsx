import React, {
  useState
} from "react";

import {
  useForm
} from "react-hook-form";

import {
  motion
} from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import PasswordStrength
  from "../../../components/common/PasswordStrength/PasswordStrength";

import authService
  from "../../../services/authService";

import "./Signup.css";

const Signup = () => {

  const navigate =
    useNavigate();

  const [password,
    setPassword] =
    useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm();

  const onSubmit =
    async (data) => {

      try {

        await authService.register(
          data
        );

        toast.success(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          error?.response?.data
            ?.message ||
          "Registration Failed"
        );

      }

    };

  return (

    <div className="signup-container">

      <motion.div
        className="signup-card"
        initial={{
          opacity: 0,
          y: 50
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
      >

        <h1>
          Create Account
        </h1>

        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }
        >

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

          <span className="error">
            {
              errors.fullName
                ?.message
            }
          </span>

          <input
            placeholder="Email"
            {...register(
              "email",
              {
                required:
                  "Email Required"
              }
            )}
          />

          <span className="error">
            {
              errors.email
                ?.message
            }
          </span>

          <input
            placeholder="Mobile"
            {...register(
              "mobile",
              {
                required:
                  "Mobile Required",

                pattern: {
                  value:
                    /^[6-9]\d{9}$/,

                  message:
                    "Invalid Mobile Number"
                }
              }
            )}
          />

          <span className="error">
            {
              errors.mobile
                ?.message
            }
          </span>

          <input
            placeholder="Aadhaar Number"
            {...register(
              "adhaar",
              {
                required:
                  "Aadhaar Required",

                pattern: {
                  value:
                    /^\d{12}$/,

                  message:
                    "Aadhaar must be 12 digits"
                }
              }
            )}
          />

          <span className="error">
            {
              errors.adhaar
                ?.message
            }
          </span>

          <input
            type="date"
            {...register(
              "dob"
            )}
          />

          <select
            {...register(
              "gender"
            )}
          >
            <option value="">
              Select Gender
            </option>

            <option>
              Male
            </option>

            <option>
              Female
            </option>

            <option>
              Other
            </option>
          </select>

          <textarea
            placeholder="Address"
            {...register(
              "address"
            )}
          />

          <input
            placeholder="Username"
            {...register(
              "username",
              {
                required:
                  "Username Required"
              }
            )}
          />

          <span className="error">
            {
              errors.username
                ?.message
            }
          </span>

          <input
            type="password"
            placeholder="Password"

            {...register(
              "password",
              {
                required:
                  "Password Required"
              }
            )}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <PasswordStrength
            password={
              password
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"

            {...register(
              "confirmPassword",
              {
                validate:
                  (value) =>
                    value ===
                    watch(
                      "password"
                    ) ||
                    "Passwords do not match"
              }
            )}
          />

          <span className="error">
            {
              errors
                .confirmPassword
                ?.message
            }
          </span>

          <div
            className="role-box"
          >
            <label>

              <input
                type="radio"
                value="customer"

                {...register(
                  "role"
                )}
              />

              Customer

            </label>

            <label>

              <input
                type="radio"
                value="claimOfficer"

                {...register(
                  "role"
                )}
              />

              Claim Officer

            </label>

            <label>

              <input
                type="radio"
                value="surveyor"

                {...register(
                  "role"
                )}
              />

              Surveyor

            </label>

          </div>

          <label
            className="terms"
          >
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

            I Accept Terms &
            Conditions

          </label>

          <span className="error">
            {
              errors.terms &&
              "Please Accept Terms"
            }
          </span>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05
            }}
          >
            Register
          </motion.button>

        </form>

      </motion.div>

    </div>

  );
};

export default Signup;