import React from "react";

interface coverProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
  divSize?: "small" | "medium" | "large";
}

export const Cover: React.FC<coverProps> = ({
  src,
  alt,
  size = "medium",
  className = "",
  divSize = "medium",
}) => {
  const sizeClass =
    {
      small: "w-full",
      medium: "w-full",
      large: "w-full",
    }[size] || "w-full";

  const divSizeClasses =
    {
      small: "sm:h-[20vh] h-[10vh]",
      medium: "sm:h-[30vh] h-[20vh]",
      large: "sm:h-[40vh] h-[30vh]",
    }[divSize] || "sm:h-[20vh] h-[10vh]";
  return (
    <>
      <div className={`w-full overflow-hidden ${divSizeClasses}`}>
        <img
          src={src}
          alt={alt}
          className={`${sizeClass} ${className} object-cover object-center`}
        />
      </div>
    </>
  );
};
