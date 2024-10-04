import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminLevereradeOrdrarList = () => {
  const hamtaHospital = useContext(AuthContext);

  const { hospital } = hamtaHospital;

  const [data, setData] = useState([]);
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const hamtaData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/orders?Status=Approved&Hospital=${encodeURIComponent(
            hospital
          )}`,
          {
            method: "GET",
            // credentials: "include",
            //
          }
        );
        if (!response.ok) {
          const errorResponse = await response.text(); // Logga hela felresponsen om det finns en
          throw new Error(`Hämtningen fungerade inte: ${errorResponse}`);
        }

        const data = await response.json();
        console.log("Data mottagen från API:", data); // Kolla om du får rätt data här

        setData(data);
      } catch (error) {
        console.error("Fel vid hämtning av data:", error); // Se om du får ett fel här
      }
    };
    hamtaData();
  }, [hospital]);

  useEffect(() => {
    console.log(data, "setsakerna"); // Logga data här när det ändras
  }, [data]); // Endast kör när data ändras

  return <>HEj</>;
};

export default AdminLevereradeOrdrarList;
