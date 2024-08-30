import React from "react";

interface dialogBoxProps {
  h1Text: string;
  pText: string;
  divStyle: string;
  h1Style: string;
  pStyle: string;
}

export const DialogBox: React.FC<dialogBoxProps> = ({
  h1Text,
  pText,
  divStyle,
  h1Style,
  pStyle,
}) => {
  const styleDiv =
    {
      bigBox: "w-[80vw] mx-auto font-roboto bg-dialogBox rounded-xl mb-8 mt-8",
    }[divStyle] || "";
  const styleH1 = {
    bigBox:
      "text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl p-5 mt-4",
  }[h1Style];
  const styleP = {
    bigBox: "p-5 text-center text-sm md:text-base lg:text-lg",
  }[pStyle];
  return (
    <>
      <div className={styleDiv}>
        <h1 className={styleH1}>{h1Text}</h1>
        <p className={styleP}>{pText}</p>
      </div>
    </>
  );
};
