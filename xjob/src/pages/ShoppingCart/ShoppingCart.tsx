import { Key, useEffect, useState } from "react";
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
  // I denna usestate sparas varje rätt och dess värden efter fetchData.
  const [itemVarukorg, setItemVarukorg] = useState<fetch[]>([]);
  useEffect(() => {
    console.log("storen i shopping", items);
    const apiUrl: string = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        // Här tas items som lagras all infomation om maträtter från storen. Object.keys tar objectet och skapar en ny array med alla nycklar från objectet.
        const uniqueIds = Array.from(new Set(Object.keys(items)));

        // Skapa fetch-anrop för varje unikt ID. Här mappas varje nyckel från uniqueIds och gör en fetch för varje id som finns i arrayen.
        const fetchPromises = uniqueIds.map(async (id) => {
          const response = await fetch(`${apiUrl}/api/cuisines/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for id ${id}`);
          }
          return response.json(); // Returnera data här
        });

        // Vänta på att alla fetch-anrop ska avslutas och uppdatera itemVarukorg
        const results = await Promise.all(fetchPromises);
        // Här uppdateras usestate varukorg med fetch-anropen som sedan kan genereras ut i return.
        setItemVarukorg(results);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, [items]); // Lägg till 'items' som dependency

  return (
    <>
      {/* // Jag fick ett fel meddelande om att inte key för elementen var unikt för att kunna lösa detta problem var jag tvungen att använda både item och index i map
    item tar nyckeln i arrayen och gör den till identifierare för elementet. Som fallback om nyckeln inte är unik används index som är det andra argumentet i map och är ett heltal som representerar positionen för det aktuella elementet i listan */}
      {Array.isArray(itemVarukorg) && itemVarukorg.length > 0 ? (
        itemVarukorg.map((item, index) => (
          // Om inte ett unik nyckel för key finns så mappas ett index värde istället för varje element.
          <div key={item.id || index}>
            <Card
              img={item.image}
              titel={item.dish}
              divSize={"small"}
              imgSize={"small"}
              h2Size={"small"}
            />
          </div>
        ))
      ) : (
        <p key="no-item">No items to display</p>
      )}
    </>
  );
};

export default ShoppingCart;
