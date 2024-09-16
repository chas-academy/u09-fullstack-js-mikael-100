import { useEffect, useState } from "react";
import { Card } from "../../components/card/card";
import { Link } from "react-router-dom";
import FilterButton from "../../components/filterButton/FilterButton";

interface MenuItems {
  img: string;
  titel: string;
}

interface ApiData {
  image: string;
  dish: string;
}

const Menu = () => {
  const [cardItem, setCardItem] = useState<MenuItems[]>([]);
  // Button Usestate
  const [buttonVal, setButtonVal] = useState<string[]>([]);
  console.log("Ökar?", buttonVal);
  // Håller kolla på knapppar och dess Cssregler och skickar tillbaka de booleanskavärdet till FilterButton som ändrar css regler.
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
      // För att kunna beta från localhoast till netlify senare så gjorde jag en miljövariabel av http//localhoast:5000 och importerade den istället
      const apiURL = import.meta.env.VITE_API_URL;
      const filterQuery = buttonVal.join(","); // Om ditt API accepterar filter som en kommaseparerad sträng
      const response = await fetch(
        `${apiURL}/api/cuisines/?filter=${filterQuery}`
      );
      const data: ApiData[] = await response.json();

      // Extrahera bara de nödvändiga fälten
      const simplifiedData: MenuItems[] = data.map(({ image, dish }) => ({
        img: `${apiURL}/${image.replace(/\\/g, "/")}`, // Konvertera sökvägen och bygg fullständig URL
        titel: dish,
      }));

      setCardItem(simplifiedData);
    };
    fetchData();
  }, [buttonVal]);

  useEffect(() => {
    // Logga när cardItem uppdateras
    console.log("datan yaaw", cardItem);
  }, [cardItem]); // Lägg till cardItem som beroende

  // const onFilterChange2 = (filter: string) => {
  //   if (filter === buttonVal) {
  //     return setButtonVal("");
  //   } else {
  //     setButtonVal(filter);
  //     return console.log("Du har tryckt på", filter);
  //   }
  // };

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
      <div className="mx-auto flex items-center flex-wrap w-[95%] sm:w-[90%]">
        {cardItem.map((item, index) => (
          <Link
            key={index}
            to={`/details/${item.titel}`} // Anpassa sökvägen här om nödvändigt
            className="sm:flex-wrap w-full sm:w-[30%] mx-auto"
          >
            <Card
              key={index}
              img={item.img}
              titel={item.titel}
              divSize={"small"}
              imgSize={"small"}
              h2Size={"small"}
            ></Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;
