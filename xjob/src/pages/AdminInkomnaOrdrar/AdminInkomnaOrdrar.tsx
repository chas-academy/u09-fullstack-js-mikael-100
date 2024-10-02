import { useContext, useEffect, useState } from "react";
import GeneralCard from "../../components/orderCard/OrderCard";
import { AuthContext } from "../../context/AuthContext";

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

  // Använder useContext för att hämta värden och funktioner från AuthContext
  const inloggadeVarde = useContext(AuthContext);
  // Destruktuerar variabeln hospital från inloggadeVarde
  const { hospital } = inloggadeVarde;

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    console.log("qqqqqqqq", hospital);
    const hamtaData = async () => {
      try {
        const response = await fetch(
          // Använder encodeURIComponent() för att se till att backenden kan läsa variabeln
          // Om det tex finns mellanslag eller Ö,Ä
          `${apiURL}/api/orders?Hospital=${encodeURIComponent(hospital)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
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

  const approveOrder = () => {
    console.log("Godkänn order");
  };

  const printOrder = () => {
    console.log("Printa order");
  };
  return (
    <>
      {hamtadData.length > 0 &&
        hamtadData.map((data) => (
          <GeneralCard
            key={data.Orders[0]._id}
            order={data}
            onApprove={approveOrder}
            onPrint={printOrder}
          />
        ))}
    </>
  );
};

export default AdminInkomnaOrdrar;
