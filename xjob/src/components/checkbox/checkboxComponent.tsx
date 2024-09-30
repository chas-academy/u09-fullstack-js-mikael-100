interface CheckBoxProp {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

const CheckBoxComponent: React.FC<CheckBoxProp> = ({
  label,
  checked,
  onChange,
  id,
}) => {
  return (
    <>
      <div className="flex items-center">
        {/* Kopplar label till input med htmlFor och visar texten */}
        {/* <span className="ml-2">{label}</span> */}

        <label htmlFor={id} className="flex items-center">
          {label}
          <input
            id={id}
            type="checkbox" // Rätt input-typ för checkboxen
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          {/* Här visas label-texten bredvid checkboxen */}
        </label>
      </div>
    </>
  );
};

export default CheckBoxComponent;
