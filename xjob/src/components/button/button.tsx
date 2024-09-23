import React from "react";

interface ButtonProps {
  appliedSizeClass?: "small" | "medium" | "large";
  appliedColorClass?: "red" | "blue" | "black" | "default";
  onClick?: (event: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const colorClasses = {
  red: "bg-red-500 text-white border-red-500 hover:bg-red-700 hover:border-red-700",
  blue: "bg-knapp-bla text-white hover:bg-black",
  black:
    "bg-white text-black border-black hover:bg-black hover:text-white duration-500",
  default:
    "bg-white text-black border-black hover:bg-black hover:text-white hover:border-white",
};

const sizeClasses = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "w-[50%] sm:w-[20%] text-3xl h-20 px-6 py-3 text-lg sm:text-4xl block",
};

// Namngiven export
export const Button: React.FC<ButtonProps> = ({
  appliedSizeClass = "medium", // Standardstorlek
  appliedColorClass = "default",
  onClick,
  children,
  className = "",
}) => {
  const colorClass = colorClasses[appliedColorClass] || colorClasses.default;
  const sizeClass = sizeClasses[appliedSizeClass] || sizeClasses.medium;
  const buttonSize = className;

  return (
    <div className="flex items-center justify-center">
      <button
        className={`rounded ${colorClass} ${sizeClass} ${buttonSize}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
