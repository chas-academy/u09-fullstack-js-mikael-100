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
  {
    name: "Rubrik",
    label: "Rubrik:",
    type: "textarea",
    labelClassName: "block font-roboto",
    inputClassName: "w-full border border-black rounded",
    rows: 3,
  },
  {
    name: "Info",
    label: "Information",
    type: "textarea",
    placeholder: "",
    labelClassName: "block",
    inputClassName: "w-full border border-black rounded",
    rows: 7,
  },
  {
    name: "Pris",
    label: "Pris",
    type: "text",
    placeholder: "",
    inputClassName: " border border-black rounded w-[100%]",
    containerClassName: " w-[100%] h-[20vw] sticky",
  },
  {
    name: "Antal",
    label: "Antal",
    type: "text",
    placeholder: "...",
    inputClassName: " border border-black rounded w-[100%]",
    containerClassName: " w-[100%] h-[20vw] sticky",
  },
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
    inputClassName: " border border-black rounded w-[100%]",
    containerClassName: " w-[100%] h-[20vw] sticky",
  },
  {
    name: "Finns I Lager",
    label: "Finns I Lager",
    type: "select",
    options: ["Ja", "Nej"],
    inputClassName: " border border-black rounded w-[100%]",
    containerClassName: " w-[100%] h-[20vw] sticky",
  },
  {
    name: "Sjukhus",
    label: "Sjukhus",
    type: "select",
    options: [
      "Alingsås lasarett",
      "Angereds Närsjukhus",
      "Frölunda specialistsjukhus",
      "Kungälvs sjukhus",
      "Skaraborgs Sjukhus",
      "Södra Älvsborgs Sjukhus",
    ],
    inputClassName: " border border-black rounded w-[100%]",
    containerClassName: " w-[100%] h-[20vw] sticky",
  },
  {
    name: "Glutenfri",
    label: "Glutenfri",
    type: "checkbox",
    inputClassName: "flex mx-auto w-[30%]",
    containerClassName: " inline-block w-1/3 mt-4",
    labelClassName: "flex justify-center",
  },
  {
    name: "Laktosfri",
    label: "Laktosfri",
    type: "checkbox",
    inputClassName: "flex mx-auto w-[30%]",
    containerClassName: " inline-block w-1/3",
    labelClassName: "flex justify-center",
  },
  {
    name: "Fläskfri",
    label: "Fläskfri",
    type: "checkbox",
    inputClassName: "flex mx-auto w-[30%]",
    containerClassName: " inline-block w-1/3",
    labelClassName: "flex justify-center",
  },
  {
    name: "Vegetarisk",
    label: "Vegetarisk",
    type: "checkbox",
    inputClassName: "flex mx-auto w-[30%]",
    containerClassName: " inline-block w-1/3 mt-4",
    labelClassName: "flex justify-center",
  },
  {
    name: "Mjölkproteinfri",
    label: "Mjölkproteinfri",
    type: "checkbox",
    inputClassName: "flex mx-auto w-[30%]",
    containerClassName: " inline-block w-1/3",
    labelClassName: "flex justify-center",
  },
  {
    name: "Vegan",
    label: "Vegan",
    type: "checkbox",
    inputClassName: "flex mx-auto w-[30%]",
    containerClassName: " inline-block w-1/3",
    labelClassName: "flex justify-center",
  },
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
  Pris: (value) =>
    !value
      ? "Is required"
      : isNaN(Number(value))
      ? "Pris must be a number"
      : null,
  Antal: (value) =>
    !value
      ? "Is required"
      : isNaN(Number(value))
      ? "Antal must be a number"
      : null,
  Alternativ: (value) => (!value ? "Is required" : null),
  "Finns I Lager": (value) => (!value ? "Is required" : null),
  Sjukhus: (value) => (!value ? "Is required" : null),
};

const AdminUploadDish: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log("Form Sumbittet", values);
  };

  return (
    <>
      <div className="mx-auto sm:w-[70vw] md:w-[50vw] xl:w-[40vw] p-5">
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
