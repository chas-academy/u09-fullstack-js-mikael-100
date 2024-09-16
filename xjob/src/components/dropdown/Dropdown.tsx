import { useState } from "react";

// Definiera typerna för dropdownens props
interface DropdownProps {
  label: string; // Text som visas på dropdown-knappen
  items: string[]; // En array av strängar som representerar dropdown-alternativen
  onSelect: (item: string) => void; // Callback-funktion som triggas när ett alternativ väljs
  size?: "small" | "medium" | "large"; // Storleken på dropdown-knappen
  color?: "red" | "blue" | "black" | "default"; // Färg för dropdown-knappen
  className?: string; // Extra CSS-klasser som ska läggas till
  dropdownWidth?: "large" | "default";
}

// Dropdown-komponenten
export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  onSelect,
  size = "medium",
  color = "default",
  className = "",
  dropdownWidth = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Definiera storlekar
  const sizeClasses: { [key in "small" | "medium" | "large"]: string } = {
    small: "py-1 px-2 text-sm",
    medium: "p-2 px-2 text-base",
    large: "py-3 px-6 text-lg",
  };

  // Definiera färger
  const colorClasses: {
    [key in "red" | "blue" | "black" | "default"]: string;
  } = {
    red: "bg-red-500 text-white hover:bg-red-700",
    blue: "bg-blue-500 text-white hover:bg-blue-700",
    black: "bg-white text-black hover:bg-black hover:text-white duration-500",
    default:
      "border border-black bg-white text-black hover:bg-black hover:text-white duration-500 mx-auto  w-[70%] md:w-[30%] text-center",
  };

  const ulSize = {
    large: "w-[70%] md:w-[30%] duration-500",
    default: "",
  };

  const sizeUl = ulSize[dropdownWidth];
  // Hämta applicerad färg och storlek
  const appliedColorClass = colorClasses[color] || colorClasses.default;
  const appliedSizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`relative ${className} font-roboto`}>
      <button
        onClick={toggleDropdown}
        className={`rounded ${appliedSizeClass} ${appliedColorClass} focus:outline-none flex items-center justify-center mt-6`}
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className={`absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-md border border-black bg-white text-center ${sizeUl}`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="cursor-pointer hover:bg-black hover:text-white px-4 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
