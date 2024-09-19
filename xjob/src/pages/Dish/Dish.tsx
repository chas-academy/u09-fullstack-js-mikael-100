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
  _id: number;
}

const Dish = () => {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<dishProps>();
  // console.log("DIIIIIIIIIIIISH", dish);

  // Zustand store för att uppdatera storen med vad användaren lägger till för rätt
  const { addOrUpdateItem, items } = useVarukorgStore();

  // Denna useState får en callback från antalSelector komponenten denna fångas upp av handlechange och sätts i detta usestate
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const handleChange = (value: number) => {
    if (dish?._id !== undefined) {
      setSelectedValue(value); // Uppdatera tillståndet med det nya värdet

      // Direkt anropa addOrUpdateItem med det nya värdet
      addOrUpdateItem(dish._id, value);
      console.log("RÄTT?????", value);
      console.log("storen NU", items);
    }
  };

  // useEffect(() => {
  //   if (dish?._id !== undefined && selectedValue !== undefined) {
  //   }
  // }, [selectedValue, dish?._id]);

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

  useEffect(() => {
    fetchDish();
  }, [id]);

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
          <div>
            <AntalSelector onValueChange={handleChange}></AntalSelector>
          </div>
          <div className="mb-8 mt-3">
            <Button
              appliedColorClass="blue"
              appliedSizeClass="large"
              onClick={() => handleChange(selectedValue)} // Använd en anonym funktion för att anropa handleChange
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
