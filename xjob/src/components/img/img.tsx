interface imgProps {
  src: string;
  alt: string;
  sizeDiv: "small" | "medium" | "large";
  sizeImg: "small" | "medium" | "large";
}

const divStyle = {
  small: "h-[30vh] overflow-hidden relative",
  medium: "",
  large: "",
};

const imgsStyle = {
  small: "object-cover h-full w-full",
  medium: "",
  large: "",
};

const ImgComponent: React.FC<imgProps> = ({
  src,
  alt,
  sizeDiv = "small",
  sizeImg = "small",
}) => {
  const div = divStyle[sizeDiv];
  const img = imgsStyle[sizeImg];

  return (
    <>
      <div className={`${div}`}>
        <img className={`${img}`} src={src} alt={alt} />
      </div>
    </>
  );
};

export default ImgComponent;
