import { useEffect, useState } from "react";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { Card } from "../../components/card/card";

interface fetch {
  title: string;
  id: Key | null | undefined;
  image: string;
  dish: string;
}
const ShoppingCart = () => {
  const { items } = useVarukorgStore();
  // Använd Object.keys för att hämta nyckeln
  // const id = Object.keys(items);

  const [itemVarukorg, setItemVarukorg] = useState<fetch[]>([]);
  useEffect(() => {
    console.log("storen i shopping", items);
    const apiUrl: string = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        // Extrahera unika ID:n
        const uniqueIds = Array.from(new Set(Object.keys(items)));

        // Skapa fetch-anrop för varje unikt ID
        const fetchPromises = uniqueIds.map(async (id) => {
          const response = await fetch(`${apiUrl}/api/cuisines/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for id ${id}`);
          }
          return response.json(); // Returnera data här
        });

        // Vänta på att alla fetch-anrop ska avslutas och uppdatera itemVarukorg
        const results = await Promise.all(fetchPromises);
        setItemVarukorg(results);
        console.log("haaa", itemVarukorg);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [items]); // Lägg till 'items' som dependency

  return (
    <div>
      {Array.isArray(itemVarukorg) && itemVarukorg.length > 0 ? (
        itemVarukorg.map((item) => (
          <div>
            <Card
              key={item.id}
              img={item.image}
              titel={item.dish}
              divSize={"small"}
              imgSize={"small"}
              h2Size={"small"}
            />
          </div>
        ))
      ) : (
        <p>No items to display</p>
      )}
    </div>
  );
};

export default ShoppingCart;
