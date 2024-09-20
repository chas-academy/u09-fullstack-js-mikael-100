import { Key, useEffect, useState } from "react";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { Card } from "../../components/card/card";

interface fetch {
  title: string;
  id: Key | null | undefined;
  image: string;
  dish: string;
  amount?: number;
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
    handleUpdate();
  }, [items]); // Lägg till 'items' som dependency

  // Funktion för att uppdatera antal för en specifik dish
  const adderaAntalTillDish = (key: number, amount: number) => {
    setItemVarukorg((prevData) => ({
      ...prevData,
      [key]: prevData[key] || 0,
      amount,
    }));
  };

  // Exempel på att använda funktionen, här adderas varje items-värde
  const handleUpdate = () => {
    // Loopa genom items och konvertera key till number
    Object.entries(items).forEach(([key, value]) => {
      // Konvertera key till ett nummer
      const numericKey = Number(key); // eller parseInt(key)
      // Anropa adderaAntalTillDish med nyckeln som ett nummer
      adderaAntalTillDish(numericKey, value);
      console.log("heheheh", itemVarukorg);
    });
  };
  console.log("heheheh", itemVarukorg);

  return (
    <>
      {/* Kommentaren är förklarande och kan tas bort om det inte behövs */}
      {Array.isArray(itemVarukorg) && itemVarukorg.length > 0 ? (
        itemVarukorg.map((item, index) => (
          // Använd item.id som key, men fall tillbaka på index om item.id inte är tillgängligt
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
        <div>No items to display</div> // Fallback när inga objekt finns
      )}
    </>
  );
};

export default ShoppingCart;
