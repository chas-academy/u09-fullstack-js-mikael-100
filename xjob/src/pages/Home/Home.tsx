import { useState } from "react";
import { Cover } from "../../components/cover/Cover";
import { DialogBox } from "../../components/dialogBox/DialogBox";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Button } from "../../components/button/button";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const valAvSjukhus = useVarukorgStore((state) => state.setSjukhus);

  // För att kunna använda navigate binds den funktionen till navigate
  const navigate = useNavigate();

  // Denna har en usestate som håller kolla på vilket sjukhus som valts handleSelect sätter det valda stringen till usestatet sedan loggas även resultatet.
  const [hospital, setHospital] = useState("Välj Sjukhus");
  const handleSelect = (item: string) => {
    setHospital(item);
    console.log("Valtsjukhus", item);
    valAvSjukhus(item);
    console.log("Storen är uppdaterad med", item);
  };

  // Denna funktion är kopplad till knappen och låter endast kunde gå vidare till menu så länge inte "Välj Sjukhus" är valt.
  const handleSubmit = () => {
    if (hospital !== "Välj Sjukhus") {
      navigate("menu");
    }
  };

  return (
    <>
      <Cover
        src="/images/home/coverHomepage.jpg"
        alt={""}
        size={"large"}
        className=""
        divSize={"large"}
      ></Cover>
      <Dropdown
        label={hospital}
        items={[
          "Alingsås lasarett",
          "Angereds Närsjukhus",
          "Frölunda specialistsjukhus",
          "Kungälvs sjukhus",
          "Skaraborgs Sjukhus",
          "Södra Älvsborgs Sjukhus",
        ]}
        size="large"
        color="default"
        onSelect={handleSelect}
        dropdownWidth="large"
      ></Dropdown>
      <Button
        type="button"
        appliedColorClass="blue"
        appliedSizeClass="large"
        className="mt-4"
        onClick={handleSubmit}
      >
        Beställ
      </Button>
      <DialogBox
        h1Text="Vällkommen till Gastronomen"
        pText={
          <>
            Genom denna app får du möjlighet att enkelt välja det sjukhus du
            vill beställa från. När du har gjort ditt val, trycker du bara på
            Beställ för att se dina måltidsalternativ på det sjukhus du besöker.
            <br />
            <br />
            Oavsett om du är patient, anhörig eller besökare, vill vi göra det
            enklare för dig att få tillgång till goda och hälsosamma måltider
            under din vistelse.
            <br />
            <br />
            Utforska dina alternativ och njut av måltider som är anpassade efter
            dina behov och önskemål!
            <br />
            <br />
            Tack för att du väljer oss!
          </>
        }
        divStyle={"bigBox"}
        h1Style={"bigBox"}
        pStyle={"bigBox"}
      ></DialogBox>
    </>
  );
};

export default Home;
