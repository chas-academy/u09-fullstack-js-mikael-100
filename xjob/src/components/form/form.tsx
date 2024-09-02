// import React, { useState } from "react";

// export type FieldType =
//   | "text"
//   | "email"
//   | "number"
//   | "select"
//   | "checkbox"
//   | "file";

// export interface FormField {
//   name: string;
//   label: string;
//   type?: FieldType;
//   placeholder?: string;
//   options?: string[];
// }

// export interface FormValues {
//   [key: string]: string | number | File | boolean | undefined;
// }

// export interface ValidationSchema {
//   [key: string]: (
//     value: string | number | File | boolean | undefined
//   ) => string | null;
// }

// interface FlexibleFormProps {
//   fields: FormField[];
//   initialValues: FormValues;
//   onSubmit: (values: FormValues) => void;
//   validationSchema?: ValidationSchema;
// }

// function isFileInput(target: EventTarget | null): target is HTMLInputElement {
//   return target instanceof HTMLInputElement && target.type === "file";
// }

// function isCheckboxInput(
//   target: EventTarget | null
// ): target is HTMLInputElement {
//   return target instanceof HTMLInputElement && target.type === "checkbox";
// }

// function isSelectOrTextarea(
//   target: EventTarget | null
// ): target is HTMLSelectElement | HTMLTextAreaElement {
//   return (
//     target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement
//   );
// }

// const FlexibleForm: React.FC<FlexibleFormProps> = ({
//   fields,
//   initialValues,
//   onSubmit,
//   validationSchema,
// }) => {
//   const [values, setValues] = useState<FormValues>(initialValues);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleChange: React.ChangeEventHandler<
//     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//   > = (event) => {
//     const target = event.target;

//     if (isFileInput(target)) {
//       const { name, files } = target;
//       if (files && files.length > 0) {
//         setValues((prevValues) => ({
//           ...prevValues,
//           [name]: files[0],
//         }));
//       }
//     } else if (isSelectOrTextarea(target)) {
//       const { name, value } = target;
//       setValues((prevValues) => ({
//         ...prevValues,
//         [name]: value,
//       }));
//     } else if (isCheckboxInput(target)) {
//       const { name, checked } = target;
//       setValues((prevValues) => ({
//         ...prevValues,
//         [name]: checked,
//       }));
//     }
//   };

//   const validate = (): boolean => {
//     if (!validationSchema) return true;

//     const validationErrors = Object.keys(validationSchema).reduce(
//       (acc, key) => {
//         const error = validationSchema[key](values[key]);
//         if (error) acc[key] = error;
//         return acc;
//       },
//       {} as { [key: string]: string }
//     );

//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
//     event.preventDefault();
//     if (validate()) {
//       onSubmit(values);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {fields.map((field) => (
//         <div key={field.name}>
//           <label htmlFor={field.name}>{field.label}</label>
//           {field.type === "select" && field.options ? (
//             <select
//               id={field.name}
//               name={field.name}
//               value={(values[field.name] as string) || ""}
//               onChange={handleChange}
//             >
//               <option value="">Select {field.label}</option>
//               {field.options.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           ) : field.type === "file" ? (
//             <input
//               id={field.name}
//               name={field.name}
//               type="file"
//               onChange={handleChange}
//             />
//           ) : (
//             <input
//               id={field.name}
//               name={field.name}
//               type={field.type || "text"}
//               placeholder={field.placeholder}
//               value={(values[field.name] as string) || ""}
//               onChange={handleChange}
//             />
//           )}
//           {errors[field.name] && <p className="error">{errors[field.name]}</p>}
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FlexibleForm;
