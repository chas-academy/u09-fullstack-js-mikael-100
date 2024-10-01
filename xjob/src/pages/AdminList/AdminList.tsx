import { useContext, useEffect, useState } from "react";
import TextInput from "../../components/input/input";
import { Button } from "../../components/button/button";
import { AuthContext } from "../../context/AuthContext";

interface Admin {
  id: string;
  hospital: string;
  name: string;
  role: string;
}

const AdminList = () => {
  const [hamtadData, setHamtadData] = useState<Admin[]>([]);

  // State som håller koll på vilket sjukhus användaren jobbar på
  //   UseContext låter mig få tag i värden och funktioner som finns i AuthContext som i sin tur är wrappad runt
  // allting som renderas i appen detta betyder att den kan passa ner propps till alla underliggande sidor.
  const authContext = useContext(AuthContext);
  //   hospital värdet som sätts när användaren loggar in destrukteras här från AuthContext filen.
  const { hospital } = authContext;

  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    console.log("sjuuukhus", hospital);
    const hamtaData = async () => {
      try {
        const response = await fetch(
          `${apiURL}/api/admins?hospital=${encodeURIComponent(hospital)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Hämtning misslyckades");
        }
        const data = await response.json();
        console.log(data);
        setHamtadData(data);
      } catch (error) {
        console.log(error);
      }
    };
    hamtaData();
  }, []);
  return (
    <>
      <div className="flex justify-center mb-10">
        <div className="sm:w-[50%] md:w-[50%] lg:w-[50%] bg-gray-200 rounded">
          {hamtadData.length > 0 ? (
            hamtadData.map((item) => (
              <>
                <div key={item.id}>
                  <div className="flex justify-center items-center grid grid-cols-4 gap-4 p-5">
                    <div className="flex justify-center">
                      <p>{item.name}</p>
                    </div>
                    <div className="flex justify-center">
                      <p>{item.hospital}</p>
                    </div>
                    <div className="flex justify-center text-center">
                      <p>{item.role}</p>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        appliedColorClass="red"
                        appliedSizeClass="medium"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <hr className="border-black" />
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminList;
