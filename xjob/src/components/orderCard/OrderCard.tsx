import React from "react";

interface CardProps {
  data: { [key: string]: unknown }; // Generiskt objekt som kan innehålla vad som helst
  titleFields: string[]; // De fält du vill visa som titel, t.ex. ["firstName", "lastName"]
}

const GeneralCard: React.FC<CardProps> = ({ data, titleFields }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-xl font-bold">
        {titleFields.map((field) => String(data[field])).join(" ")}
      </h3>
      <ul className="list-disc ml-5">
        {Object.keys(data).map((key) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {Array.isArray(data[key])
              ? (data[key] as unknown[]).map((item, idx: number) => (
                  <span key={idx}>{JSON.stringify(item)}</span>
                ))
              : String(data[key])}{" "}
            {/* Konvertera till string */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralCard;
