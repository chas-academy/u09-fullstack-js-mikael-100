import { Key, useEffect, useState } from "react";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { Card } from "../../components/card/card";

interface fetch {
  title: string;
  id: Key | null | undefined;
  image: string;
  dish: string;
  amount?: number;
  price?: number;
  _id: number;
}
const ShoppingCart = () => {
  const { items, removeItem } = useVarukorgStore();

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

        // Koppla amount från items till de fetched data
        const updatedResults = results.map((item) => {
          // itemId är id:et från den fetchade datan, _id används som nyckel för att matcha med items
          const itemId = item._id;
          // Här stoppas itemID in i items och om keys matchar så binder den det värdet till amount.
          // I JavaScript kan du komma åt värden i ett objekt genom att använda deras nycklar.
          const amount = items[itemId];

          return {
            ...item,
            amount: amount !== undefined ? amount : 0, // Sätt amount, eller 0 om det inte finns
          };
        });

        // Här uppdateras usestate varukorg med fetch-anropen som sedan kan genereras ut i return.
        setItemVarukorg(updatedResults);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
    handleUpdate();
  }, [items]); // Lägg till 'items' som dependency

  // Exempel på att använda funktionen, här adderas varje items-värde
  const handleUpdate = () => {
    // Skapa en array av uppdaterade objekt
    const updatedItems = Object.entries(items).map(([key, value]) => {
      const numericKey = Number(key); // eller parseInt(key)
      return {
        id: numericKey,
        amount: value,
      } as fetch; // Tvinga till fetch-typ
    });

    // Uppdatera itemVarukorg med de nya objekten
    setItemVarukorg((prevData) => [...prevData, ...updatedItems]);
  };

  // TOTALSUMMA

  const totalSumma = () => {
    // Använd reduce för att summera totalpriset av alla objekt
    return itemVarukorg.reduce((sum, item) => {
      const antal = item.amount ?? 0; // Om amount är undefined, sätt det till 0
      const pris = item.price ?? 0; // Om price är undefined, sätt det till 0

      // Summera det aktuella totalpriset till den ackumulerade summan
      return sum + antal * pris;
    }, 0); // Börja med en summa på 0
  };

  // Exempel på att använda funktionen och logga resultatet
  const totalPris = totalSumma();

  // Funktion för att ta bort en rätt
  const removeDish = (
    event: React.MouseEvent<HTMLButtonElement>,
    _id: number
  ) => {
    console.log("Titta kolla", _id);
    const numberID = Number(_id);
    event.preventDefault(); // Förhindra standardbeteende
    removeItem(numberID); // Ta bort rättens ID från stor
    console.log("Storren deletad?", items); // Logga nuvarande state
    console.log("ID att ta bort:", numberID);
    console.log("Nuvarande items:", items);
    console.log(typeof numberID); // Ska vara 'string'
    console.log(typeof items[_id]); // Ska vara 'number'
  };

  // ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ

  // Fixa så du kan deleta rätt men removedish och att den uppdateras i usestate och raderas från zustand

  return (
    <>
      {/* Kontrollera att itemVarukorg är en array och inte är tom */}
      {Array.isArray(itemVarukorg) && itemVarukorg.length > 0 ? (
        itemVarukorg.map((item, index) => (
          // Använd item.id som key, och fall tillbaka på index endast om item.id är undefined
          <div key={item.id || index}>
            <Card
              img={item.image}
              titel={item.dish}
              divSize="small"
              imgSize="small"
              h2Size="small"
              amount={`Antal: ${item.amount}`}
            />
            {/* Säkerställ att item._id finns innan anrop till removeDish */}
            <button
              onClick={(event) => item._id && removeDish(event, item._id)}
            >
              Minus
            </button>
          </div>
        ))
      ) : (
        <p>Varukorgen är tom.</p>
      )}
    </>
  );
};

export default ShoppingCart;
