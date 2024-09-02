// import React from "react";
// import FlexibleForm, {
//   FormField,
//   FormValues,
//   ValidationSchema,
// } from "../../components/form/form";

// // Typdefinition för formulärfält
// const formFields: FormField[] = [
//   { name: "Välj Fil", label: "Välj Fil", type: "file" },
//   { name: "Rubrik", label: "Rubrik", type: "text", placeholder: "..." },
//   { name: "Info", label: "Information", type: "text", placeholder: "..." },
//   { name: "Pris", label: "Pris", type: "text", placeholder: "..." },
//   { name: "Antal", label: "Antal", type: "text", placeholder: "..." },
//   {
//     name: "Alternativ",
//     label: "Alternativ",
//     type: "select",
//     options: [
//       "Kylda Portionsrätter",
//       "Mejeri",
//       "Lunchbrickor",
//       "Shark",
//       "Kött",
//       "Fisk",
//       "Läsk",
//     ],
//   },
//   {
//     name: "Finns I Lager",
//     label: "Finns I Lager",
//     type: "select",
//     options: ["Ja", "Nej"],
//   },
//   {
//     name: "Sjukhus",
//     label: "Sjukhus",
//     type: "select",
//     options: ["Skaraborgs Sjukhus", "Allingsås"],
//   },
//   { name: "Glutenfri", label: "Glutenfri", type: "checkbox" },
//   { name: "Laktosfri", label: "Laktosfri", type: "checkbox" },
//   { name: "Fläskfri", label: "Fläskfri", type: "checkbox" },
//   { name: "Vegetarisk", label: "Vegetarisk", type: "checkbox" },
//   { name: "Mjölkproteinfri", label: "Mjölkproteinfri", type: "checkbox" },
//   { name: "Vegan", label: "Vegan", type: "checkbox" },
// ];

// // Typdefinition för initialValues
// const initialValues: FormValues = {
//   "Välj Fil": undefined, // Behöver kanske hanteras annorlunda om det är ett obligatoriskt fält
//   Rubrik: "",
//   Info: "",
//   Pris: "",
//   Antal: "",
//   Alternativ: "",
//   "Finns I Lager": "",
//   Sjukhus: "",
//   Glutenfri: false,
//   Laktosfri: false,
//   Fläskfri: false,
//   Vegetarisk: false,
//   Mjölkproteinfri: false,
//   Vegan: false,
// };

// // Typdefinition för validationSchema
// const validationSchema: ValidationSchema = {
//   Rubrik: (value) => (!value ? "Rubrik is required" : null),
//   Info: (value) => (!value ? "Info is required" : null),
//   Pris: (value) => (!value ? "Pris is required" : null),
//   Antal: (value) =>
//     !value
//       ? "Antal is required"
//       : isNaN(Number(value))
//       ? "Antal must be a number"
//       : null,
//   Alternativ: (value) => (!value ? "Alternativ is required" : null),
//   "Finns I Lager": (value) => (!value ? "Finns I Lager is required" : null),
//   Sjukhus: (value) => (!value ? "Sjukhus is required" : null),
//   Glutenfri: (value) =>
//     typeof value !== "boolean" ? "Glutenfri must be a boolean" : null,
//   Laktosfri: (value) =>
//     typeof value !== "boolean" ? "Laktosfri must be a boolean" : null,
//   Fläskfri: (value) =>
//     typeof value !== "boolean" ? "Fläskfri must be a boolean" : null,
//   Vegetarisk: (value) =>
//     typeof value !== "boolean" ? "Vegetarisk must be a boolean" : null,
//   Mjölkproteinfri: (value) =>
//     typeof value !== "boolean" ? "Mjölkproteinfri must be a boolean" : null,
//   Vegan: (value) =>
//     typeof value !== "boolean" ? "Vegan must be a boolean" : null,
// };

// const AdminUploadDish: React.FC = () => {
//   const handleSubmit = (values: FormValues) => {
//     console.log("Form Submitted", values);
//   };

//   return (
//     <div className="mx-auto border border-black sm:w-[70vw] md:w-[50vw] xl:w-[40vw]">
//       <h1>Form Page</h1>
//       <FlexibleForm
//         fields={formFields}
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={validationSchema}
//       />
//     </div>
//   );
// };

// export default AdminUploadDish;
