import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

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

  console.log(data);

  return (
    <>
      <ResponsiveContainer width="100%" height={100}>
        {/* Skapa en array med ett objekt för att representera rätten och dess mängd */}
        <BarChart data={[{ name: order.dish, uv: order.amount }]}>
          {/* Lägg till en XAxis för att visa namnet under varje bar */}
          <XAxis dataKey="name" />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AdminStatestics;
