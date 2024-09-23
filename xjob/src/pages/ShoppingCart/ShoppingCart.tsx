import { Key, useEffect, useState } from "react";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { Card } from "../../components/card/card";
import { Button } from "../../components/button/button";

interface fetch {
  title: string;
  id: Key | null | undefined;
  image: string;
  dish: string;
  amount?: number;
  price?: number;
  _id: string;
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
          const data = await response.json();

          // Denna if kollar om image finns med i datan om den gör det så ändras bakåt slash till frammåt. Steg två är att apiURL ett slash och data.image görs till en
          // giltig url så bilden kan hämtas från backend.
          if (data.image) {
            data.image = data.image.replace(/\\/g, "/"); // Byt ut \ mot /
            data.image = `${apiUrl}/${data.image}`; // Lägg till bas-URL
          }

          return data; // Returnera den uppdaterade datan
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
        console.log("IAMMAGE", updatedResults);
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
      console.log("Antal", antal);
      console.log("Pris", pris);

      // Summera det aktuella totalpriset till den ackumulerade summan
      return sum + antal * pris;
    }, 0); // Börja med en summa på 0
  };

  // Exempel på att använda funktionen och logga resultatet
  const totalPris = totalSumma();

  // Funktion för att ta bort en rätt
  const removeDish = (_id: string) => {
    console.log("Titta kolla", _id);
    removeItem(_id); // Ta bort rättens ID från stor
  };
  console.log("varukorg", itemVarukorg);
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
            <Button
              appliedColorClass="red"
              appliedSizeClass="small"
              onClick={() => item._id && removeDish(item._id)}
            >
              Ta bort vara
            </Button>
          </div>
        ))
      ) : (
        <p className="flex justify-center p-4">Varukorgen är tom......</p>
      )}
      {totalPris > 0 && (
        <p className="flex justify-end font-bold font-roboto p-4">
          Summa: {totalPris}
        </p>
      )}
    </>
  );
};

export default ShoppingCart;
