interface TextInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divStyle?: "small" | "medium" | "large";
  inputStyle?: "small" | "medium" | "large";
  labelStyle?: "small" | "medium" | "large";
  name: string;
  required?: boolean;
}

const divStyleTailwind = {
  small: "flex flex-col font-roboto",
  medium: "",
  large: "",
};

const labelStyleTailwind = {
  small: "",
  medium: "",
  large: "",
};

const inputStyleTailwind = {
  small: "border border-black",
  medium: "border border-black",
  large: "",
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  divStyle = "small",
  inputStyle = "small",
  labelStyle = "small",
  name,
  required,
}) => {
  // så denna gör att när jag tar in divStyle i min komponent och skriver tex small så kommer detta värde sättas inom [] som letar upp de värdet i divStyleTailwind och sätter den i className.
  const divClassName = divStyleTailwind[divStyle];
  const labelClassName = labelStyleTailwind[labelStyle];
  const inputClassName = inputStyleTailwind[inputStyle];
  return (
    <>
      <div className={divClassName}>
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
        <input
          id={name}
          className={inputClassName}
          type="text"
          value={value}
          name={name}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  );
};

export default TextInput;
