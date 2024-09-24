import { useParams } from "react-router-dom";
import { Cover } from "../../components/cover/Cover";
import { useEffect, useState } from "react";
import { DialogBox } from "../../components/dialogBox/DialogBox";
import { Button } from "../../components/button/button";
import AntalSelector from "../../components/antalselector/antalSelector";
import { useVarukorgStore } from "../../stores/varukorgStore";

interface dishProps {
  image: string;
  dish: string;
  information: string;
  _id: string;
  price: string;
}

const Dish = () => {
  // Hämtar id från Urlen på sidan. Detta id behövs för att kunna göra en fetch med detta id för att hämta all annan information om just denna rätt.
  const { id } = useParams<{ id: string }>();

  // Denna useeffekt gör en fetch när
  useEffect(() => {
    const fetchDish = async () => {
      const apiURL = import.meta.env.VITE_API_URL;

      try {
        if (id) {
          const response = await fetch(`${apiURL}/api/cuisines/${id}`);
          if (!response.ok) {
            throw new Error("Hämtningen gick fel");
          }
          const dishInfo: dishProps = await response.json();
          // Bygg fullständig URL för bilden
          dishInfo.image = `${apiURL}/${dishInfo.image.replace(/\\/g, "/")}`;
          setDish(dishInfo);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDish();
  }, [id]);

  const [dish, setDish] = useState<dishProps>();

  // Zustand store för att uppdatera storen med vad användaren lägger till för rätt
  const { addOrUpdateItem } = useVarukorgStore();

  // Denna useState får en callback från antalSelector komponenten denna fångas upp av handlechange och sätts i detta usestate
  const [selectedValue, setSelectedValue] = useState<number>(0);

  // Denna funktion triggas när användaren åkar eller skriver in antal på dish och håller kolla på antalet via usestate selectedValue
  const handleChange = (value: number) => {
    setSelectedValue(value);
  };

  // Denna funktion triggas när användaren trycker på beställ knappen. Den tar dish._id från usestate dish som håller kolla på vilken rätt användaren kollar på och den tar in selectedValue som är usestatet som håller koll på antalet som användaren vill beställa. Dessa två parametrar
  // sätts in i addOrUpdateItem som är en funktion som byggts i storen för att kunna ta emot två argument en för id på rätten och en för antal.
  const skickaVardenTillStorePaSubmit = () => {
    if (dish?._id) {
      addOrUpdateItem(dish._id, selectedValue);
    }
  };

  return (
    <>
      {dish ? (
        <>
          <div className="md:flex items-center justify-center">
            <div className="w-full sm:w-[40%] mx-auto">
              <Cover
                src={dish.image}
                alt={dish.dish}
                size="large"
                divSize="large"
              />
            </div>
            <DialogBox
              h1Text={dish.dish}
              pText={dish.information}
              divStyle={"smalBox"}
              h1Style={"smalBox"}
              pStyle={"smalBox"}
            ></DialogBox>
          </div>
          <div className="flex justify-center">
            <p className="font-bold mb-5">{`Styck pris ${dish.price}:-`}</p>
          </div>
          <div>
            <AntalSelector onValueChange={handleChange}></AntalSelector>
          </div>
          <div className="mb-8 mt-3">
            <Button
              appliedColorClass="blue"
              appliedSizeClass="large"
              onClick={() => skickaVardenTillStorePaSubmit()} // Använd en anonym funktion för att anropa handleChange
            >
              Beställ
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div> // Visa en laddningsindikator om dish är undefined
      )}
    </>
  );
};

export default Dish;
