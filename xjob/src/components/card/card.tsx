interface CardProps {
  img: string;
  titel: string;
  divSize: "small" | "medium" | "large";
  imgSize: "small" | "medium" | "large";
  h2Size: "small" | "medium" | "large";
}

const styleDiv = {
  small: "p-4 border border-black bg-gray-100",
  medium: "p-6 border border-gray-300 bg-white",
  large: "p-8 border border-gray-500 bg-gray-200",
};

const styleImg = {
  small: "w-24 h-24 object-cover",
  medium: "w-48 h-48 object-cover",
  large: "w-72 h-72 object-cover",
};

const styleH2 = {
  small: "text-lg",
  medium: "text-xl",
  large: "text-2xl",
};
export const Card: React.FC<CardProps> = ({
  img = "",
  titel = "",
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
        <img src={img} alt="" className={imgSizeClass} />
        <h2 className={h2SizeClass}>{titel}</h2>
      </div>
    </>
  );
};
