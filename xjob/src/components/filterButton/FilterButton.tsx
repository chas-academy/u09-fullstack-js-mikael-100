interface FilterButtonProps {
  onFilterChange: (filter: string) => void;
  buttonSize: "small" | "medium" | "large";
  divSize: "small" | "medium" | "large";
  activeFilters: { [key: string]: boolean };
}

const buttonStyles = {
  small: (isActive: boolean) =>
    `shadow-xl border-2 border-black w-[30%] flex-grow p-1 rounded-lg sm:h-20 hover:bg-black hover:text-white transition-colors duration-300 ${
      isActive ? "bg-black text-white" : "bg-white text-black"
    }`,
  medium: "px-4 py-2 text-sm",
  large: "px-6 py-3 text-md",
};

const divStyles = {
  small:
    "flex justify-center w-full space-x-1 p-3 sm:w-[80%] mx-auto flex flex-wrap gap-4",
  medium: "px-4 py-2 text-sm",
  large: "px-6 py-3 text-md",
};

const FilterButton: React.FC<FilterButtonProps> = ({
  onFilterChange,
  buttonSize = "small",
  divSize = "small",
  activeFilters,
}) => {
  const filters = [
    "Vegetarisk",
    "Vegan",
    "Fläskfri",
    "Glutenfri",
    "Laktosfri",
    "Mjölkproteinfri",
  ];

  const divSizeClass = divStyles[divSize];
  // Typvakt för att kontrollera om buttonStyles[buttonSize] är en funktion
  const buttonStyleClass = (filter: string) =>
    typeof buttonStyles[buttonSize] === "function"
      ? buttonStyles[buttonSize](activeFilters[filter])
      : buttonStyles[buttonSize];

  return (
    <div className={divSizeClass}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={buttonStyleClass(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;
