import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVarukorgStore } from "../../stores/varukorgStore";
import { AuthContext } from "../../context/AuthContext";
import { Card } from "../../components/card/card";
import { Button } from "../../components/button/button";

const SvinnsmartDeals = () => {
  // För att navigera
  const navigera = useNavigate();

  const [fetchTick, setFetchTick] = useState(0);

  // Hämta värdet från sjukhus
  const { sjukhus } = useVarukorgStore();

  // Hämtar inloggadvärde frän AuthContext
  const { arInloggad } = useContext(AuthContext);

  interface SvinnsmartDealsItems {
    image: string;
    titel: string;
    _id: string;
    price: string;
    dish: string;
  }

  const apiURL = import.meta.env.VITE_API_URL;

  const [cardItem, setCardItem] = useState<SvinnsmartDealsItems[]>([]);

  useEffect(() => {
    const valtSjukhus = sjukhus;
    const Page = "Svinnsmart Deals";
    const apiURL = import.meta.env.VITE_API_URL;

    const hamtadata = async () => {
      try {
        const response = await fetch(
          `${apiURL}/api/cuisines/?Page=${Page}&hospital=${valtSjukhus}`
        );

        if (!response.ok) {
          throw new Error("Något gick fel i hämtning");
        }
        const data = await response.json();

        // Omvandla varje item och fixa img-fältet
        const updatedData = data.map((item: { image: string }) => ({
          ...item,
          image: item.image ? item.image.replace(/\\/g, "/") : "", // Konvertera backslashes till snedstreck
        }));
        setCardItem(updatedData);
      } catch (error) {
        console.log("Dett är felet: ", error);
      }
    };
    hamtadata();
  }, [fetchTick]);

  const deleteDish = async (dishId: string) => {
    console.log("triggas", dishId);
    const apiURL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiURL}/api/cuisines/${dishId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Deleten misslyckades");
      }
      const result = await response.json();
      setFetchTick((prev) => prev + 1);

      console.log("Rätten raderades", result);
    } catch (error) {
      console.error("gick ej deleta", error);
    }
  };

  useEffect(() => {
    console.log("qqqqqqqqqqqqqqqq", cardItem);
    console.log();
  }, [cardItem]);

  return (
    <>
      <div>
        <div className="mt-10 mb-20">
          <p className="font-roboto text-center w-full text-xl md:text-3xl sm:text-2xl mb-5 font-bold">
            {sjukhus === null
              ? "Gå till startsidan och välj Sjukhus för att kunna se dina måltidsalternativ"
              : `${sjukhus} Måltider`}{" "}
            {/* Visa sjukhusets måltider om ett sjukhus har valts */}
          </p>
          <div className="flex justify-center">
            <hr className="border-black w-[80vw] md:w-[50vw]" />
          </div>
        </div>
        <div className="mx-auto flex items-center flex-wrap w-[95%] sm:w-[90%]">
          {cardItem.map((item) => (
            <div
              key={item._id}
              className="flex-wrap w-[100%] sm:w-[50%] md:w-[50%] xl:w-[30%] mx-auto"
            >
              <Link to={`/dish/${item._id}`}>
                <Card
                  img={`${apiURL}/${item.image}`}
                  titel={item.dish}
                  price={`${item.price}:-`}
                  divSize={"small"}
                  imgSize={"small"}
                  h2Size={"small"}
                ></Card>
              </Link>
              {arInloggad === true && (
                <div>
                  <div className="flex flex-row justify-center mb-10">
                    <div className="mr-6">
                      <Button
                        type="submit"
                        appliedColorClass="blue"
                        appliedSizeClass="small"
                        onClick={() => navigera(`/adminUpdateDish/${item._id}`)}
                      >
                        Uppdatera
                      </Button>
                    </div>
                    <div className="block-inline ml-6">
                      <Button
                        type="button"
                        appliedColorClass="red"
                        appliedSizeClass="small"
                        onClick={() => {
                          deleteDish(item._id);
                        }}
                      >
                        Ta bort
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {cardItem.length === 0 ? (
          <div>
            <p
              className="cursor-pointer  hover:underline text-center mb-10 mt-10"
              onClick={() => navigera("/")}
            >
              Tyvär finns det inga Svinnsmart Deals för tillfället.<br></br>
              Klicka här för att återvända till startsidan
            </p>
            <div className="h-[50vh]"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SvinnsmartDeals;
