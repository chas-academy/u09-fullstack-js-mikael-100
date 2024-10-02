import { useEffect, useState } from "react";
import GeneralCard from "../../components/orderCard/OrderCard";

interface OrderArray {
  dish: string;
  amount: number;
  _id: string;
}

// Gör om och gör klart en generell komonent som får fram alla ordrar

interface Orders {
  Department: string;
  FirstName: string;
  LastName: string;
  Hospital: string;
  PhoneNumber: string;
  createdAt: string;
  Orders: OrderArray[];
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

  //   console.log("detta är datan", hamtadData[0].Orders[0].dish);

  return (
    <>
      {hamtadData.length > 0 &&
        hamtadData.map((data) => (
          <GeneralCard
            key={data.Orders[0]._id} // Använd ett unikt ID som key
            order={data}
          />
        ))}
    </>
  );
};

export default AdminInkomnaOrdrar;
