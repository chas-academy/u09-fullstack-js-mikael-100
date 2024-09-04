import React from "react";
import FlexibleForm, {
  FormField,
  FormValues,
  ValidationSchema,
} from "../../components/form/form";

// Här defineras formuläret. här skrivs name, label, type, placeholder och options in
// Element kommer att renderas utifrån vilka val man gör i dessa object i arrayen.

const formFields: FormField[] = [
  {
    name: "Välj Fil",
    label: "",
    type: "file",
    inputClassName: "hidden",
  },
  { name: "Rubrik", label: "Rubrik", type: "text", placeholder: "..." },
  { name: "Info", label: "Information", type: "text", placeholder: "..." },
  { name: "Pris", label: "Pris", type: "text", placeholder: "..." },
  { name: "Antal", label: "Antal", type: "text", placeholder: "..." },
  {
    name: "Alternativ",
    label: "Alternativ",
    type: "select",
    options: [
      "Kylda Portionsrätter",
      "Mejeri",
      "Lunchbrickor",
      "Shark",
      "Kött",
      "Fisk",
      "Läsk",
      "Övrigt",
    ],
  },
  {
    name: "Finns I Lager",
    label: "Finns I Lager",
    type: "select",
    options: ["Ja", "Nej"],
  },
  {
    name: "Sjukhus",
    label: "Sjukhus",
    type: "select",
    options: ["Skaraborgs Sjukhus", "Allingsås"],
  },
  { name: "Glutenfri", label: "Glutenfri", type: "checkbox" },
  { name: "Laktosfri", label: "Laktosfri", type: "checkbox" },
  { name: "Fläskfri", label: "Fläskfri", type: "checkbox" },
  { name: "Vegetarisk", label: "Vegetarisk", type: "checkbox" },
  { name: "Mjölkproteinfri", label: "Mjölkproteinfri", type: "checkbox" },
  { name: "Vegan", label: "Vegan", type: "checkbox" },
];

// Här defineras värdenna när formen laddas så kommer denna att genom {initialValues} på komponenten
// så kommer usestate i komponenten att uppdateras med dessa värden.

const initialValues: FormValues = {
  "Välj Fil": undefined,
  Rubrik: "",
  Info: "",
  Pris: "",
  Antal: "",
  Alternativ: "",
  "Finns I Lager": "",
  Sjukhus: "",
  Glutenfri: false,
  Laktosfri: false,
  Fläskfri: false,
  Vegetarisk: false,
  Mjölkproteinfri: false,
  Vegan: false,
};

// Här bestämms olika typer av valideringar för alla olika inputs i formen
const validationSchema: ValidationSchema = {
  Rubrik: (value) => (!value ? "rubrik is required" : null),
  Info: (value) => (!value ? "Info is required" : null),
  Pris: (value) => (!value ? "Pris is required" : null),
  Antal: (value) =>
    !value
      ? "Antal is required"
      : isNaN(Number(value))
      ? "Antal must be a number"
      : null,
  Alternativ: (value) => (!value ? "Alternativ is required" : null),
  "Finns I Lager": (value) => (!value ? "Finns I Lager is required" : null),
  Sjukhus: (value) => (!value ? "Sjukhus is required" : null),
};

const AdminUploadDish: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log("Form Sumbittet", values);
  };

  return (
    <>
      <div className="mx-auto border border-black sm:w-[70vw] md:w-[50vw] xl:w-[40vw]">
        <FlexibleForm
          fields={formFields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        />
      </div>
    </>
  );
};

export default AdminUploadDish;
