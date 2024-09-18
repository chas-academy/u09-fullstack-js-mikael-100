import React, { useState } from "react";

interface AntalProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

const AntalSelector: React.FC<AntalProps> = ({
  initialValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const minska = () => {
    const newValue = Math.max(value - step, min); // Beräkna det nya värdet
    setValue(newValue); // Uppdatera det lokala tillståndet
    if (onValueChange) onValueChange(newValue); // Skicka det nya värdet till föräldrakomponenten
  };

  const oka = () => {
    const newValue = Math.min(value + step, max); // Beräkna det nya värdet
    setValue(newValue); // Uppdatera det lokala tillståndet
    if (onValueChange) onValueChange(newValue); // Skicka det nya värdet till föräldrakomponenten
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue)) {
      const clampedValue = Math.max(Math.min(newValue, max), min); // Begränsa värdet mellan min och max
      setValue(clampedValue); // Uppdatera det lokala tillståndet
      if (onValueChange) onValueChange(clampedValue); // Skicka det nya värdet till föräldrakomponenten
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col p-3">
          <button onClick={oka}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
          <button onClick={minska}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center items-center border-2 rounded border-black">
          <div>
            <span className="font font-bold ml-4">Antal:</span>
          </div>
          <div className="p-2">
            <input
              type="text"
              value={value}
              className="w-7"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AntalSelector;
