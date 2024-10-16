import { Key, useEffect, useState } from "react";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { Card } from "../../components/card/card";
import { Button } from "../../components/button/button";
import { useNavigate } from "react-router-dom";

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

  const navigera = useNavigate();

  // I denna usestate sparas varje rätt och dess värden efter fetchData.
  const [totalPris, setTotalPris] = useState<number>(0);

  // I denna usestate sparas varje rätt och dess värden efter fetchData.
  const [itemVarukorg, setItemVarukorg] = useState<fetch[]>([]);
  useEffect(() => {
    console.log("storen i shopping", items);
    console.log("storen i shopping jajajaj", itemVarukorg);

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

        // Results är den fetchade datan, denna data mappas igenom. varje id i den datan som ska gås igenom från fetchen binds till itemId.
        // dessa id sätts in i items för att matcha fetchade id med id från storen om id matchar binds värdet från items id från storen till amount
        // Det som sparas i storen är _id och antalet som användaren väljer så på detta sätt kommer amount med de användaren väljer till itemsVarukorg.

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

  useEffect(() => {
    const totalSumma = () => {
      return itemVarukorg.reduce((sum, item) => {
        const antal = item.amount ?? 0;
        const pris = item.price ?? 0;
        return sum + antal * pris;
      }, 0);
    };

    // Beräkna totalpris
    const beraknatTotalPris = totalSumma();
    setTotalPris(beraknatTotalPris); // Uppdatera totalPris state

    console.log("TotalPris innan navigering:", beraknatTotalPris);
  }, [itemVarukorg]);

  // Funktion för att ta bort en rätt
  const removeDish = (_id: string) => {
    console.log("Titta kolla", _id);
    removeItem(_id); // Ta bort rättens ID från stor
  };
  console.log("varukorg", itemVarukorg);
  return (
    <>
      <div className="font-roboto">
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
                type="button"
                appliedColorClass="red"
                appliedSizeClass="small"
                onClick={() => item._id && removeDish(item._id)}
              >
                Ta bort vara
              </Button>
            </div>
          ))
        ) : (
          <div>
            <p className="flex justify-center p-4 mt-10">
              Varukorgen är tom......
            </p>
            <div className="h-[50vh]"></div>
          </div>
        )}
        {totalPris > 0 && (
          <div className="justify-center">
            <p className="text-center font-bold font-roboto p-4 mt-10 mb-5">
              Summa: {totalPris}
            </p>
          </div>
        )}{" "}
        {Array.isArray(itemVarukorg) && itemVarukorg.length > 0 && (
          <>
            <div className="mb-4">
              <Button
                type="button"
                appliedColorClass="blue"
                appliedSizeClass="large"
                onClick={() =>
                  navigera("/payment", {
                    state: {
                      itemVarukorg,
                      totalPris,
                    },
                  })
                }
              >
                Betala
              </Button>
            </div>
            <div className="mb-7 mt-7">
              <p
                onClick={() => navigera("/menu")}
                className="cursor-pointer text-black-500 flex justify-center md:text-2xl hover:underline mt-10"
              >
                Klicka här för att handla fler saker från Menyn
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
