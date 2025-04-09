import React from "react";

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = () => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return 4;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 3;
    return 2;
  };

  const strength = getStrength();
  const strengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][
    strength
  ];
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-700",
  ][strength];

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${strengthColor}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Password strength: <span className="font-medium">{strengthText}</span>
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
