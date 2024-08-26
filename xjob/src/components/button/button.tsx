import React from "react";

interface ButtonProps {
  appliedSizeClass?: "small" | "medium" | "large";
  appliedColorClass?: "red" | "blue" | "black" | "default";
  onClick?: () => void;
  children?: React.ReactNode;
}

const colorClasses = {
  red: "bg-red-500 text-white border-red-500 hover:bg-red-700 hover:border-red-700",
  blue: "bg-blue-500 text-white border-blue-500 hover:bg-blue-700 hover:border-blue-700",
  black:
    "bg-white text-black border-black hover:bg-black hover:text-white duration-500",
  default:
    "bg-white text-black border-black hover:bg-black hover:text-white hover:border-white",
};

const sizeClasses = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

// Namngiven export
export const Button: React.FC<ButtonProps> = ({
  appliedSizeClass = "medium", // Standardstorlek
  appliedColorClass = "default",
  onClick,
  children,
}) => {
  const colorClass = colorClasses[appliedColorClass] || colorClasses.default;
  const sizeClass = sizeClasses[appliedSizeClass] || sizeClasses.medium;

  return (
    <button
      className={`rounded ${colorClass} ${sizeClass} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
