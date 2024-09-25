import { useEffect, useState } from "react";
import { Card } from "../../components/card/card";
import { Link, useNavigate } from "react-router-dom";
import FilterButton from "../../components/filterButton/FilterButton";
import { useVarukorgStore } from "../../stores/varukorgStore";

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
  // För att navigera på sidan
  const navigera = useNavigate();

  // Här hämtas värdet från variabeln sjukhus från storen
  const { sjukhus } = useVarukorgStore();

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
      // För att kunna beta från localhoast till netlify senare så gjorde jag en miljövariabel av http//localhoast:5000 och importerade den istället
      const apiURL = import.meta.env.VITE_API_URL;
      const filterQuery = buttonVal.join(","); // Om ditt API accepterar filter som en kommaseparerad sträng
      const response = await fetch(
        `${apiURL}/api/cuisines/?filter=${filterQuery}&hospital=${valtSjukhus}`
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
  }, [buttonVal]);

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

  return (
    <>
      <FilterButton
        onFilterChange={onFilterChange2}
        buttonSize={"small"}
        divSize={"small"}
        activeFilters={activeFilters}
      ></FilterButton>
      <p className="font-roboto font-bold p-6 text-center w-full text-xl md:text-3xl sm:text-2xl">
        {sjukhus === null
          ? "Gå till startsidan och välj Sjukhus för att kunna se dina måltidsalternativ"
          : `${sjukhus} Måltider`}{" "}
        {/* Visa sjukhusets måltider om ett sjukhus har valts */}
      </p>
      <div className="mx-auto flex items-center flex-wrap w-[95%] sm:w-[90%]">
        {cardItem.map((item, index) => (
          <Link
            key={index}
            to={`/dish/${item.id}`} // Anpassa sökvägen här om nödvändigt
            className="sm:flex-wrap w-full sm:w-[30%] mx-auto"
          >
            <Card
              key={index}
              img={item.img}
              titel={item.titel}
              price={`${item.price}:-`}
              divSize={"small"}
              imgSize={"small"}
              h2Size={"small"}
            ></Card>
          </Link>
        ))}
      </div>
      <p
        className="cursor-pointer  hover:underline text-center mb-4"
        onClick={() => navigera("/")}
      >
        {cardItem.length === 0
          ? "Klicka här för att återvända till startsidan och göra ett nytt val av sjukhus"
          : ""}
      </p>
    </>
  );
};

export default Menu;
