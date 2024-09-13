import { useEffect, useState } from "react";
import { Card } from "../../components/card/card";

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

  useEffect(() => {
    const fetchData = async () => {
      // För att kunna beta från localhoast till netlify senare så gjorde jag en miljövariabel av http//localhoast:5000 och importerade den istället
      const apiURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiURL}/api/cuisines/`);
      const data: ApiData[] = await response.json();

      // // Extrahera bara de nödvändiga fälten
      // const simplifiedData: MenuItems[] = data.map(({ image, dish }) => ({
      //   img: image,
      //   titel: dish,
      // }));

      // Extrahera bara de nödvändiga fälten
      const simplifiedData: MenuItems[] = data.map(({ image, dish }) => ({
        img: `${apiURL}/${image.replace(/\\/g, "/")}`, // Konvertera sökvägen och bygg fullständig URL
        titel: dish,
      }));

      setCardItem(simplifiedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Logga när cardItem uppdateras
    console.log("datan yaaw", cardItem);
  }, [cardItem]); // Lägg till cardItem som beroende

  return (
    <>
      {cardItem.map((item, index) => (
        <Card
          key={index}
          img={item.img}
          titel={item.titel}
          divSize={"small"}
          imgSize={"small"}
          h2Size={"small"}
        ></Card>
      ))}
    </>
  );
};

export default Menu;
