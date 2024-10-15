import { useContext, useEffect, useState } from "react";
import GeneralCard from "../../components/orderCard/OrderCard";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/button/button";

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
  _id: string;
  OrderApprovedBy: string;
}

const AdminInkomnaOrdrar = () => {
  const [count, setCount] = useState(0);

  const [hamtadData, setHamtadData] = useState<Orders[]>([]);

  // Använder useContext för att hämta värden och funktioner från AuthContext
  const inloggadeVarde = useContext(AuthContext);
  // Destruktuerar variabeln hospital från inloggadeVarde
  const { hospital } = inloggadeVarde;

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    const hamtaData = async () => {
      try {
        const response = await fetch(
          // Använder encodeURIComponent() för att se till att backenden kan läsa variabeln
          // Om det tex finns mellanslag eller Ö,Ä
          `${apiURL}/api/orders?Status=pending&Hospital=${encodeURIComponent(
            hospital
          )}`,
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
  }, [count]);

  // PRINT

  // Denna behövs för att deffinera typ för Orders i utskriften
  interface Order {
    Department: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Orders: Array<{ dish: string; amount: number }>;
    _id: string;
  }

  const printOrder = (order: Order) => {
    console.log("Printa order");

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      // Här måste jag skapa kortet igen med html för hur utskriften ska se ut
      printWindow.document.write(`
      <html>
        <head>
          <title>Utskrift av beställning</title>
          <style>
            body { font-family: 'Roboto', sans-serif; margin: 0; padding: 0; }
            @media print { body { -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div style="display: flex; justify-content: center; margin-bottom: 20px;">
            <div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); width: 100%; max-width: 600px;">
              <div style="font-weight: bold; text-align: center; font-size: 24px;">
                <h1>${order.Department}</h1>
              </div>
              <div style="text-align: center; margin-top: 12px;">
                <p style="font-size: 16px; font-weight: bold;">Beställare:</p>
                <div style="font-size: 14px;">
                  <div style="display: flex; justify-content: center; gap: 8px;">
                    <p style="margin-top: 4px;">${order.FirstName}</p>
                    <p style="margin-top: 4px;">${order.LastName}</p>
                  </div>
                  <p>${order.PhoneNumber}</p>
                </div>
              </div>
              <div style="margin-top: 12px;">
                <h1 style="text-align: center; font-weight: bold;">Beställning:</h1>
                ${order.Orders.map(
                  (o) => `
                  <div style="text-align: center; font-size: 12px; margin-top: 12px; margin-bottom: 24px;">
                    <hr style="background-color: black;" />
                    <p style="margin-top: 10px;">${o.dish}</p>
                    <div style="display: flex; justify-content: center; gap: 4px; margin-top: 4px;">
                      <p style="font-weight: bold;">Antal:</p>
                      <p>${o.amount}</p>
                    </div>
                  </div>
                `
                ).join("")}
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
      // Denna gör så att när du tryckt på skriv ut så stängs den öppnade sidan direk och du återvänder till ordrar
      printWindow.close();
    }
  };

  // Godkänn Order

  const approveOrder = async (id: string) => {
    console.log("Godkänn order");

    const apiURL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiURL}/api/orders/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: "Approved" }),
      });

      if (!response.ok) {
        throw new Error("Något gick fel i fetchen");
      }

      const data = await response.json();
      console.log("Ordern är godkänd", data);
      if (data) {
        setCount((prev) => prev + 1);
        console.log("Ordern är godkänd", count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function onApprove(_id: any): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <>
      <div>
        {hamtadData.length > 0 &&
          hamtadData
            .slice()
            .reverse()
            .map((data) => (
              <>
                <div className="flex-col bg-white">
                  <GeneralCard
                    key={data.Orders[0]._id}
                    order={data}
                    // onApprove={() => approveOrder(data._id)}
                    // onPrint={(order) => printOrder(order)}
                  />
                  <div className="flex justify-center space-x-10 mb-5">
                    <Button
                      onClick={() => printOrder(data)}
                      type=""
                      appliedColorClass="blue"
                      appliedSizeClass="medium"
                    >
                      Skriv Ut
                    </Button>
                    <Button
                      onClick={() => approveOrder(data._id)}
                      type="button"
                      appliedColorClass="green"
                      appliedSizeClass="medium"
                    >
                      Skickad
                    </Button>
                  </div>
                  <div className="flex justify-center mb-20">
                    {/* <hr className="border-black w-[50%]" /> */}
                  </div>
                </div>
              </>
            ))}
      </div>
    </>
  );
};

export default AdminInkomnaOrdrar;
