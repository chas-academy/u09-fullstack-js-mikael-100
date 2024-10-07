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
import { Card } from "../../components/card/card";
import DatePicker from "react-datepicker";

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
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

    // Använd reduce för att summera amount för varje rätt (dish)
    const dishPlusTotalAmount = nylistaOrderData.reduce((acc, order) => {
      order.Orders.forEach((currentOrder) => {
        const dishName = currentOrder.dish;

        // Om rätten redan finns i ackumulatorn, addera mängden, annars sätt första värdet
        if (acc[dishName]) {
          acc[dishName] += currentOrder.amount;
        } else {
          acc[dishName] = currentOrder.amount;
        }
      });
      return acc;
    }, {} as { [key: string]: number }); // Ackumulator är ett objekt med rättens namn som nyckel och mängd som värde

    // Formatera datan till rätt värde för recharts

    const formateradData = Object.keys(dishPlusTotalAmount).map((key) => ({
      name: key,
      uv: dishPlusTotalAmount[key],
    }));

    // Här kan du använda nylistaOrderData, till exempel sätta det i state
    setFilterData(formateradData); // Sätt de filtrerade ordrarna i filterData
  }, [data]);

  useEffect(() => {
    console.log("ee6666666666", filterData);
  }, [filterData]);

  return (
    <>
      <div className="flex flex-row justify-center font-roboto mt-10">
        <div className="flex flex-row  space-x-20  rounded p-10">
          <div className="flex flex-col">
            <label className="text-center font-bold" htmlFor="start">
              Från
            </label>
            <input type="date" id="start" />
          </div>
          <div className="flex flex-col">
            <label className="text-center font-bold" htmlFor="end">
              Till
            </label>
            <input type="date" id="end" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="border-black w-[60%]" />
      </div>

      <div className="mb-40 mx-auto font-roboto w-[90%]">
        <div className="mt-10">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={filterData}>
              <Tooltip
                content={(props) => {
                  // Kolla om props.payload finns och har data
                  if (!props.payload || props.payload.length === 0) return null; // Returnera null om inget att visa

                  return (
                    <div className="text-center">
                      {props.payload.map((item) => (
                        <div
                          className="bg-primary text-black py-2 px-4 rounded shadow-lg"
                          key={item.payload.name} // Använd item.payload.name som key
                        >
                          <p className="font-bold">{item.value} st</p>
                          <p>{item.payload.name}</p>{" "}
                          {/* Kolla att name är rätt */}
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
                  return value.length > 10 ? value.slice(0, 10) + "..." : value; // Förkorta vid behov
                }}
              />{" "}
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AdminStatestics;

{
  /* <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={filterData}
              margin={{ top: 20, right: 30, left: 20, bottom: 200 }}
            >
              <XAxis
                dataKey="name"
                textAnchor="end"
                tickFormatter={(value) => {
                  return value.length > 10 ? value.slice(0, 10) + "..." : value; // Förkorta vid behov
                }}
              />
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer> */
}
