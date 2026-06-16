import React from "react";

const PasswordStrength = ({ password }) => {
  const calculateStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2)
      return {
        text: "Weak",
        width: "25%",
        color: "#DC3545"
      };

    if (score <= 4)
      return {
        text: "Medium",
        width: "65%",
        color: "#FFC107"
      };

    return {
      text: "Strong",
      width: "100%",
      color: "#28A745"
    };
  };

  const strength =
    calculateStrength();

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#ddd",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: strength.width,
            height: "100%",
            background:
              strength.color
          }}
        />
      </div>

      <small
        style={{
          color: strength.color
        }}
      >
        {strength.text}
      </small>
    </div>
  );
};

export default PasswordStrength;