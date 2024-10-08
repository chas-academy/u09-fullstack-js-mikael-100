import React from "react";

interface CardProps {
  img: string;
  titel: string;
  price?: string;
  amount?: number | string;
  divSize: "small" | "medium" | "large";
  imgSize: "small" | "medium" | "large";
  h2Size: "small" | "medium" | "large";
}

const styleDiv = {
  small:
    "shadow-2xl p-4 mt-4 mb-4 block border-2 border-black flex items-center mx-auto rounded-lg sm:flex-col space-between cursor-pointer transform hover:scale-105 transition-transform duration-300 sm:w-[80%] md:w-[70%] lg:w-[80%]",
  medium: "p-6 border border-gray-300 bg-white",
  large: "p-8 border border-gray-500 bg-gray-200",
};

const styleImg = {
  small: "w-[29%] h-[200px] object-cover sm:w-[100%] w-[40%]",
  medium: "w-48 h-48 object-cover",
  large: "w-72 h-72 object-cover",
};

const styleH2 = {
  small: "text-lg p-3 sm:h-60 md:h-25 sm:w-[100%]",
  medium: "text-xl",
  large: "text-2xl",
};
export const Card: React.FC<CardProps> = ({
  img = "",
  titel = "",
  price = "",
  amount,
  divSize,
  imgSize,
  h2Size,
}) => {
  const divSizeClass = styleDiv[divSize];
  const imgSizeClass = styleImg[imgSize];
  const h2SizeClass = styleH2[h2Size];
  return (
    <>
      <div className={divSizeClass}>
        <div>
          <div className="flex sm:flex-col">
            <img src={img} alt="" className={imgSizeClass} />
            <h2 className={h2SizeClass}>{titel}</h2>
          </div>
          <p className="font-bold mt-auto flex justify-end">{price}</p>
          <div>
            <div className="flex justify-end font-roboto font-bold">
              <p>{amount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
