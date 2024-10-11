import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../../components/button/button";

const AdminStatestics = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const authVariabler = useContext(AuthContext);

  interface Order {
    amount: number;
    dish: string;
    _id: string;
  }

  interface dataInterface {
    Orders: Order[];
    createdAt: string;
    TotalSum: string;
  }

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [data, setData] = useState<dataInterface[]>([]);

  const { hospital } = authVariabler;
  useEffect(() => {
    const hamtaData = async () => {
      try {
        const respone = await fetch(
          `${apiURL}/api/orders?Hospital=${encodeURIComponent(hospital)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!respone.ok) {
          throw new Error("Hämtningen misslyckades");
        }
        const data = await respone.json();
        console.log("Detta är det dude", data);
        setData(data);
      } catch (error) {
        console.log("Något gick fel", error);
      }
    };
    hamtaData();
  }, []);

  const [filterData, setFilterData] = useState<
    {
      name: string;
      uv: number;
    }[]
  >();

  // Filtrera och summera TotalSum baserat på valt datumintervall
  const [totalSum, setTotalSum] = useState<number>(0);

  useEffect(() => {
    const today = new Date(); // Idag
    const lastWeek = new Date(today); // Skapa en ny date-instans för att manipulera
    lastWeek.setDate(today.getDate() - 7); // Sätt datumet till en vecka tillbaka

    // Filtrera ordrarna som skapades under den senaste veckan
    const nylistaOrderData = data.filter((order: dataInterface) => {
      const orderDate = new Date(order.createdAt); // Konvertera createdAt till ett Date-objekt
      return orderDate >= lastWeek && orderDate <= today; // Kontrollera om orderDate ligger inom intervallet
    });

    // REDUCE

    // Använd reduce för att summera amount och TotalSum för varje rätt (dish)
    const dishPlusTotalAmount = nylistaOrderData.reduce((acc, order) => {
      order.Orders.forEach((currentOrder) => {
        const dishName = currentOrder.dish;
        const orderTotalSum = Number(order.TotalSum) || 0; // Omvandla TotalSum till nummer

        // Om rätten redan finns i ackumulatorn, addera mängden och TotalSum, annars sätt första värdet
        if (acc[dishName]) {
          acc[dishName].amount += currentOrder.amount;
          acc[dishName].totalSum += orderTotalSum;
        } else {
          acc[dishName] = {
            amount: currentOrder.amount,
            totalSum: orderTotalSum,
          };
        }
      });
      return acc;
    }, {} as { [key: string]: { amount: number; totalSum: number } }); // Ackumulator är ett objekt med rättens namn som nyckel, och en objekt med amount och totalSum som värden

    // Formatera datan till rätt värde för recharts
    const formateradData = Object.keys(dishPlusTotalAmount).map((key) => ({
      name: key,
      uv: dishPlusTotalAmount[key].amount, // eller använd totalSum här om det behövs
      totalSum: dishPlusTotalAmount[key].totalSum, // Lägg till totalSum om du vill visa det
    }));

    // ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ
    // ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ

    // Här kan du använda nylistaOrderData, till exempel sätta det i state
    setFilterData(formateradData); // Sätt de filtrerade ordrarna i filterData
  }, [data]);

  const handleClick = async () => {
    const apiURL = import.meta.env.VITE_API_URL;
    console.log("denna loggas");
    try {
      const response = await fetch(
        `${apiURL}/api/orders?Hospital=${encodeURIComponent(
          hospital
        )}&StartDate=${startDate}&EndDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error("någor gick fl vid hämtning");
      }

      const data = await response.json();
      console.log("detta hittades med datum", data);

      // Sumera summan på alla ordrar som har fetchats

      const total = data.reduce((acc: number, order: { TotalSum: string }) => {
        // Omvandlar TotalSumman till nummer
        const orderTotalSum = Number(order.TotalSum) || 0;
        // Lägg till det omvandlade värdet till ackumulatorn
        return acc + orderTotalSum;
      }, 0); // Startvärde för ackumulatorn är 0

      setData(data);
      setTotalSum(total); // Spara det beräknade värdet i state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("ee6666666666", data);
  }, [data]);

  return (
    <>
      {filterData && filterData?.length === 0 ? (
        <div>
          <div>
            <div>
              <div className="flex flex-row justify-center font-roboto mt-10">
                <div className="flex flex-row  space-x-20  rounded p-10">
                  <div className="flex flex-col">
                    <label className="text-center font-bold" htmlFor="start">
                      Från
                    </label>
                    <input
                      type="date"
                      id="start"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-center font-bold" htmlFor="end">
                      Till
                    </label>
                    <input
                      type="date"
                      id="end"
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-7">
                <Button
                  type="button"
                  appliedColorClass="blue"
                  appliedSizeClass="medium"
                  onClick={handleClick}
                >
                  Se Försäljning
                </Button>
              </div>
            </div>
          </div>
          <div className="p-10 mt-10 mb-20">
            <p className="text-center font-roboto font-bold">
              Ingen statestik finns för denna period
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex flex-row justify-center font-roboto mt-10">
              <div className="flex flex-row  space-x-20  rounded p-10">
                <div className="flex flex-col">
                  <label className="text-center font-bold" htmlFor="start">
                    Från
                  </label>
                  <input
                    type="date"
                    id="start"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-center font-bold" htmlFor="end">
                    Till
                  </label>
                  <input
                    type="date"
                    id="end"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-7">
              <Button
                type="button"
                appliedColorClass="blue"
                appliedSizeClass="medium"
                onClick={handleClick}
              >
                Se Försäljning
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="border-black w-[60%]" />
          </div>
          {/* Total summa för perioden */}
          <div className="text-center font-roboto mt-3">
            Total Summa för perioden: <br />
            {totalSum}:-
          </div>
          <div className="mb-40 mx-auto font-roboto w-[90%]">
            <div className="mt-10">
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={filterData}>
                  <Tooltip
                    content={(props) => {
                      // Kolla om props.payload finns och har data
                      if (!props.payload || props.payload.length === 0)
                        return null; // Returnera null om inget att visa

                      return (
                        <div className="text-center">
                          {props.payload.map((item) => (
                            <div
                              className="bg-primary text-black py-2 px-4 rounded shadow-lg"
                              key={item.payload.name} // Använd item.payload.name som key
                            >
                              <p className="font-bold">{item.value} st</p>
                              <p>{item.payload.name}</p>{" "}
                              {item.payload.totalSum > 0 && (
                                <p>Total summa: {item.payload.totalSum}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <YAxis dataKey="" />
                  <XAxis
                    dataKey="name"
                    textAnchor="end"
                    tickFormatter={(value) => {
                      return value.length > 10
                        ? value.slice(0, 10) + "..."
                        : value; // Förkorta vid behov
                    }}
                  />{" "}
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminStatestics;
