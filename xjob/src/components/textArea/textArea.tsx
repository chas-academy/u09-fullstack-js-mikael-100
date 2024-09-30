interface TextAreaInputsProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  divStyle?: "small" | "medium" | "large";
  inputStyle?: "small" | "medium" | "large";
  labelStyle?: "small" | "medium" | "large";
  rows?: number;
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

const TextAreaInput: React.FC<TextAreaInputsProps> = ({
  label,
  name,
  onChange,
  value,
  divStyle = "small",
  inputStyle = "small",
  labelStyle = "small",
  rows = 1,
}) => {
  const div = divStyleTailwind[divStyle];
  const input = inputStyleTailwind[inputStyle];
  const labels = labelStyleTailwind[labelStyle];
  return (
    <>
      <div className={div}>
        <label htmlFor="name" className={labels}>
          {label}
        </label>
        <textarea
          name={name}
          value={value}
          rows={rows}
          id={name}
          className={input}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  );
};

export default TextAreaInput;
