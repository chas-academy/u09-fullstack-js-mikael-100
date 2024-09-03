import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-router-dom";

export interface FormValues {
  [key: string]: string | number | File | boolean | undefined;
}

export interface ValidationSchema {
  [key: string]: (
    value: string | number | File | boolean | undefined
  ) => string | null;
}

type FieldType = "text" | "email" | "number" | "select" | "checkbox" | "file";

export interface FormField {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  options?: string[];
  containerClassName?: string; // Klass för att styla fältets container
  labelClassName?: string; // Klass för att styla etiketten
  inputClassName?: string; // Klass för att styla själva input-elementet
}

interface FlexibleFormProps {
  fields: FormField[];
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  validationSchema?: ValidationSchema;
}

interface Errors {
  [key: string]: string;
}

// Här nedan finn några type Guards som hjälper till att kolla typerna
const isFileInput = (target: EventTarget | null): target is HTMLInputElement =>
  target instanceof HTMLInputElement && target.type === "file";

const isCheckboxInput = (
  target: EventTarget | null
): target is HTMLInputElement =>
  target instanceof HTMLInputElement && target.type === "checkbox";

const isSelectOrTextarea = (
  target: EventTarget | null
): target is HTMLSelectElement | HTMLTextAreaElement =>
  target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;

//   Huvud komponenten
const FlexibleForm: React.FC<FlexibleFormProps> = ({
  fields,
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  //   Har värdena från formen
  const [values, setValues] = useState<FormValues>(initialValues);
  //   Alla error värden
  const [errors, setErrors] = useState<Errors>({});
  //   Har previewvärdet för bilden
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    "/images/defaultBild.png"
  );

  //   Denna useeffekt sätter imagePrewiev till en defaultbild.
  //  Den triggas när en ny bild läggs in i values
  useEffect(() => {
    // Uppdatera imagePreview när filen i values ändras
    const file = values["Välj Fil"] as File | undefined;
    if (file) {
      // Här skapas en temporät URL som kan förhandsgranska bilden
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      // Rensa objekt-URL:n när komponenten unmountas eller när en ny fil väljs
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview("/images/defaultBild.png");
    }
  }, [values]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (event) => {
    const target = event.target;

    if (isFileInput(target)) {
      const { name, files } = target;
      if (files && files.length > 0) {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: files[0],
        }));
      }
    } else if (isSelectOrTextarea(target)) {
      const { name, value } = target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (isCheckboxInput(target)) {
      const { name, checked } = target;
      setValues((prevValue) => ({
        ...prevValue,
        [name]: checked,
      }));
    }
  };

  const validate = (): boolean => {
    if (!validationSchema) return true;

    const validationErrors: Errors = Object.keys(validationSchema).reduce(
      (acc, key) => {
        const error = validationSchema[key](values[key]);
        if (error) acc[key] = error;
        return acc;
      },
      {} as Errors
    );

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  //   cont fileInputref typbestämmer variabel att det är ett inputelement.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Denna hanterar klicken för SVG. Genom att använda attributet ref på inputelementet och sedan gå genom variabelnamnet
  //    fileInputRef.current.click() så triggar man klickfunktionen i det elementet.

  const handleSvgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className={field.containerClassName}>
          <label htmlFor={field.name} className={field.labelClassName}>
            {field.label}
          </label>
          {field.type === "select" && field.options ? (
            <select
              id={field.name}
              name={field.name}
              value={(values[field.name] as string) || ""}
              onChange={handleChange}
              className={field.inputClassName}
            >
              <option value="">{field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "file" ? (
            // I denna Div används hidden för att dölja input elementet och istället har jag använt en SVG knapp.
            // I diven inannför denna har jag lagt en onClick  som appliseras på hela diven och länkat till funktionen handleSvgClick
            // handleClick kör  fileInputRef.current.click(); som triggar en klickhändelse på den inputen och filen kan väljas.
            // i inputen kan du se att attributet  ref={fileInputRef} finns för att trigga just den inputen.
            <div className="flex flex-col items-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-[30vh] object-cover border border-gray-300"
                />
              )}
              <input
                id={field.name}
                name={field.name}
                type="file"
                onChange={handleChange}
                className="hidden"
                ref={fileInputRef}
              />
              <div
                onClick={handleSvgClick}
                className="flex ml-auto items-center justify-center w-[10vh] cursor-pointer flex justify-left"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  className="w-1/2 h-1/2 ml-auto p-1"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#000000"
                      d="M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H96zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112zM256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          ) : field.type === "checkbox" ? (
            <input
              id={field.name}
              name={field.name}
              type="checkbox"
              checked={!!values[field.name]}
              onChange={handleChange}
              className={field.inputClassName}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={(values[field.name] as string) || ""}
              onChange={handleChange}
              className={field.inputClassName}
            />
          )}
          {errors[field.name] && <p className="error">{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FlexibleForm;
