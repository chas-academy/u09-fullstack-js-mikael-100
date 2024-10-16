import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/card/card";
import { Link, useNavigate } from "react-router-dom";
import FilterButton from "../../components/filterButton/FilterButton";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { Button } from "../../components/button/button";
import { AuthContext } from "../../context/AuthContext";

// const inloggad =
interface MenuItems {
  img: string;
  titel: string;
  id: string;
  price: string;
}

interface ApiData {
  image: string;
  dish: string;
  _id: string;
  price: string;
}

const Menu = () => {
  // Denna useState används bara för att kunna trigga en ny fetch när man deletar en rätt
  // Jag behövde på något sätt trigga fetchen för att kunna uppdatera de rätter som finns kvar
  // Så fetchTick läggs till useEffektens dependenci array
  const [fetchTick, setFetchTick] = useState(0);
  // För att navigera på sidan
  const navigera = useNavigate();

  // Här hämtas värdet från variabeln sjukhus från storen
  const { sjukhus } = useVarukorgStore();

  // Använd useContext för att hämta arInloggad från AuthContext
  const { arInloggad } = useContext(AuthContext); // Hämta arInloggad här

  const [cardItem, setCardItem] = useState<MenuItems[]>([]);
  // Button Usestate
  const [buttonVal, setButtonVal] = useState<string[]>([]);
  console.log("Ökar?", buttonVal);

  // Håller kolla på knapppar och dess Cssregler och skickar tillbaka de booleanskavärdet till FilterButton som ändrar css.
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: boolean;
  }>({
    Vegetarisk: false,
    Vegan: false,
    Fläskfri: false,
    Glutenfri: false,
    Laktosfri: false,
    Mjölkproteinfri: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      const valtSjukhus = sjukhus;
      const Page = "Menu";
      // För att kunna beta från localhoast till netlify senare så gjorde jag en miljövariabel av http//localhoast:5000 och importerade den istället
      const apiURL = import.meta.env.VITE_API_URL;
      const filterQuery = buttonVal.join(","); // Om ditt API accepterar filter som en kommaseparerad sträng
      const response = await fetch(
        `${apiURL}/api/cuisines/?filter=${filterQuery}&hospital=${valtSjukhus}&Page=${Page}`
      );
      const data: ApiData[] = await response.json();

      // Extrahera bara de nödvändiga fälten
      const simplifiedData: MenuItems[] = data.map(
        ({ _id, image, dish, price }) => ({
          img: `${apiURL}/${image.replace(/\\/g, "/")}`, // Konvertera sökvägen och bygg fullständig URL
          titel: dish,
          id: _id,
          price: price,
        })
      );

      setCardItem(simplifiedData);
    };
    fetchData();
  }, [buttonVal, fetchTick]);

  useEffect(() => {
    // Logga när cardItem uppdateras
    console.log("datan yaaw", cardItem);
  }, [cardItem]); // Lägg till cardItem som beroende

  const onFilterChange2 = (filter: string) => {
    setButtonVal((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter], // Växla aktiv/inaktiv status
    }));
  };

  const deleteDish = async (dishId: string) => {
    console.log("triggas", dishId);
    const apiURL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiURL}/api/cuisines/${dishId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Deleten misslyckades");
      }
      const result = await response.json();
      setFetchTick((prev) => prev + 1);

      console.log("Rätten raderades", result);
    } catch (error) {
      console.error("gick ej deleta", error);
    }
  };
  return (
    <>
      {sjukhus === null ? (
        <div>
          <p className="font-roboto p-6 text-center w-full text-xl md:text-3xl sm:text-2xl mt-10">
            Gå till startsidan och välj Sjukhus för att kunna se dina
            måltidsalternativ"
          </p>
          <p
            className="cursor-pointer  hover:underline text-center mb-4"
            onClick={() => navigera("/")}
          >
            Klicka här för att återvända till startsidan och göra ett nytt val
            av sjukhus
          </p>
          <div className="h-[50vh]"></div>
        </div>
      ) : (
        <>
          <div className="mt-10 mb-10">
            <p className="font-roboto font-bold  text-center w-full text-xl md:text-3xl sm:text-2xl">
              {sjukhus} Måltider
            </p>
            <div className="flex justify-center">
              <hr className="border-black w-[80vw] md:w-[50vw] mt-5 sm:mb-10" />
            </div>
          </div>
          <div className="mb-10 sm:mb-20">
            <FilterButton
              onFilterChange={onFilterChange2}
              buttonSize={"small"}
              divSize={"small"}
              activeFilters={activeFilters}
            ></FilterButton>
          </div>
        </>
      )}{" "}
      <div className="mx-auto flex items-center flex-wrap w-[95%] sm:w-[90%] font-roboto">
        {cardItem.map((item) => (
          <div
            key={item.id}
            className="flex-wrap w-[100%] sm:w-[50%] md:w-[50%] xl:w-[30%] mx-auto"
          >
            <Link
              to={`/dish/${item.id}`} // Anpassa sökvägen här om nödvändigt
            >
              <Card
                img={item.img}
                titel={item.titel}
                price={`${item.price}:-`}
                divSize={"small"}
                imgSize={"small"}
                h2Size={"small"}
              ></Card>
            </Link>
            {arInloggad === true && (
              <div>
                <div className="flex flex-row justify-center mb-10">
                  <div className="mr-6">
                    <Button
                      type="submit"
                      appliedColorClass="blue"
                      appliedSizeClass="small"
                      onClick={() => navigera(`/adminUpdateDish/${item.id}`)}
                    >
                      Uppdatera
                    </Button>
                  </div>
                  <div className="block-inline ml-6">
                    <Button
                      type="button"
                      appliedColorClass="red"
                      appliedSizeClass="small"
                      onClick={() => {
                        deleteDish(item.id);
                      }}
                    >
                      Ta bort
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
