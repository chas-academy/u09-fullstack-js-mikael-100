import { useEffect, useState } from "react";
import GeneralCard from "../../components/orderCard/OrderCard";

interface OrderArray {
  dish: string;
  amount: number;
  _id: string;
}

// ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ

// Gör om och gör klart en generell komonent som får fram alla ordrar

interface Orders {
  Department: string;
  FirstName: string;
  LastName: string;
  Hospital: string;
  PhoneNumber: string;
  createdAt: string;
  orders: OrderArray[];
}

const AdminInkomnaOrdrar = () => {
  const [hamtadData, setHamtadData] = useState<Orders[]>([]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    const hamtaData = async () => {
      try {
        const response = await fetch(`${apiURL}/api/orders`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Något gick fel med hämtningen");
        }
        const data = await response.json();
        setHamtadData(data);
      } catch (error) {
        console.log(error);
      }
    };
    hamtaData();
  }, []);

  console.log("detta är datan", hamtadData);

  return (
    <>
      {hamtadData.length > 0 &&
        hamtadData.map((order) => (
          <div key={order.PhoneNumber}>
            <p>{order.FirstName}</p>
            <p>{order.createdAt}</p>
          </div>
          //   <GeneralCard
          //     key={order} // Använd ett unikt ID som key
          //     data={order} // Skicka ordern som data
          //     titleFields={Object.keys(order)} // Dynamiskt hämta nycklar som titleFields
          //   />
        ))}
    </>
  );
};

export default AdminInkomnaOrdrar;
