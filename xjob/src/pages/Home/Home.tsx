import { useState } from "react";
import { Cover } from "../../components/cover/Cover";
import { DialogBox } from "../../components/dialogBox/DialogBox";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Button } from "../../components/button/button";

const Home = () => {
  // Denna har en usestate som håller kolla på vilket sjukhus som valts handleSelect sätter det valda stringen till usestatet sedan loggas även resultatet.
  const [hospital, setHospital] = useState("Välj Sjukhus");
  const handleSelect = (item: string) => {
    setHospital(item);
    console.log(`Selected Hospital ${hospital}`);
  };
  return (
    <>
      <Cover
        src="src/assets/images/home/coverHomepage.jpg"
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
        appliedColorClass="blue"
        appliedSizeClass="large"
        className="mt-4"
      >
        Beställ
      </Button>
      <DialogBox
        h1Text="Rubrik"
        pText="Himmelska Smaker erbjuder en unik kulinarisk upplevelse med en meny som blandar lokala råvaror med internationella influenser. Atmosfären är elegant och avslappnad, med mjuka belysningar och stilren inredning. Gästerna välkomnas med vänlig service och en meny som inkluderar både klassiska rätter och kreativa nytillskott. Specialiteterna varierar från saftiga biffar och fräscha skaldjur till utsökta vegetariska alternativ. Restaurangen är perfekt för både romantiska middagar och familjesammankomster, med en vinkällare som erbjuder ett noggrant utvalt sortiment av viner. Här är varje måltid en fest för smaklökarna."
        divStyle={"bigBox"}
        h1Style={"bigBox"}
        pStyle={"bigBox"}
      ></DialogBox>
    </>
  );
};

export default Home;
