// import React, { useState } from "react";

// interface NumberSelectorProps {
//   initialValue?: number;
//   min?: number;
//   max?: number;
//   step?: number;
// }

// const NumberSelector: React.FC<NumberSelectorProps> = ({
//   initialValue = 0,
//   min = 0,
//   max = 100,
//   step = 1,
// }) => {
//   const [value, setValue] = useState<number>(initialValue);

//   const increment = () => {
//     setValue((prev) => Math.min(prev + step, max));
//   };

//   const decrement = () => {
//     setValue((prev) => Math.max(prev - step, min));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = Number(e.target.value);
//     if (!isNaN(newValue)) {
//       setValue(Math.max(min, Math.min(newValue, max)));
//     }
//   };

//   return (
//     <div className="flex items-center">
//       <button
//         onClick={decrement}
//         aria-label="Decrease value"
//         className="px-4 py-2 bg-gray-200 rounded-l focus:outline-none"
//       >
//         &minus;
//       </button>
//       <input
//         type="number"
//         value={value}
//         onChange={handleChange}
//         className="w-20 text-center border-t border-b border-gray-300"
//         aria-label="Number input"
//       />
//       <button
//         onClick={increment}
//         aria-label="Increase value"
//         className="px-4 py-2 bg-gray-200 rounded-r focus:outline-none"
//       >
//         &plus;
//       </button>
//     </div>
//   );
// };

// export default NumberSelector;

// Kolla igenom och gör denna kod
