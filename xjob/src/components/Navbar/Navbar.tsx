import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button/button";
import { Dropdown } from "../dropdown/Dropdown";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [language, setLanguage] = useState("swe");
  const handleSelect = (item: string) => {
    setLanguage(item);
    console.log(`Selected Language ${language}`);
  };

  const inloggad = useContext(AuthContext);

  // Kontrollera om kontexten är definierad
  if (!inloggad) {
    throw new Error("SomeComponent must be used within an AuthProvider");
  }

  const { setArInloggad, arInloggad, setAdmin, admin } = inloggad;

  const navigera = useNavigate();

  const loggout = async () => {
    const apiUrl = import.meta.env.VITE_API_URL; // API-url

    try {
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Inkludera  http cookies i begäran om dom finns
      });

      if (response.ok) {
        const result = await response.json(); // Läs in JSON-svaret
        console.log(result.message); // Loggar meddelandet "Utloggad vart syns detta"
        setArInloggad(false);
        setAdmin("");
        navigera("/");
      } else {
        console.error("Utloggning misslyckades.");
      }
    } catch (error) {
      console.error("Något gick fel");
    }
  };

  console.log("Ar inloggad:", arInloggad);

  return (
    <>
      <nav className="p-4 font-roboto">
        <div className="hidden sm:block">
          <div className="container mx-auto flex justify-between items-center my-2">
            <Dropdown
              label={language}
              items={["Swe", "Eng", "Arabic"]}
              onSelect={handleSelect}
              size="medium" // valfritt, kan vara small, medium, eller large
              color="black" // valfritt, kan vara red, blue, black, eller default
              className=""
            />
            <Link to={"/"}>
              <img
                src="/images/vastraGotalandsregionen.png"
                alt="Västra Götalandsregionen Logo"
                className="h-12 mx-auto"
              />
            </Link>
            {arInloggad ? (
              <Button
                type="sumbmit"
                appliedColorClass="black"
                onClick={() => loggout()}
              >
                Logga Ut
              </Button>
            ) : (
              <button></button>
            )}
          </div>
          <hr className="border-black my-4 w-[90%] mx-auto" />
          <div>
            <ul className="container mx-auto flex justify-center">
              <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                <Link to={"/menu"} className="block w-full h-full text-center">
                  Meny
                </Link>
              </li>
              <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                <Link
                  to={"/svinnsmartDeals"}
                  className="block w-full h-full text-center"
                >
                  Svinnsmart Deals
                </Link>
              </li>
              <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                <Link
                  to={"/shoppingCart"}
                  className="block w-full h-full text-center"
                >
                  Varukorg
                </Link>
              </li>
              {arInloggad ? (
                <>
                  <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                    <Link
                      to={"/adminStatistics"}
                      className="block w-full h-full text-center"
                    >
                      Statestik
                    </Link>
                  </li>

                  <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                    <Link
                      to={"/adminUploadDish"}
                      className="block w-full h-full text-center"
                    >
                      Lägg Till Maträtt
                    </Link>
                  </li>
                  <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                    <Link
                      to={"/adminInkomnaOrdrar"}
                      className="block w-full h-full text-center"
                    >
                      Inkomna Ordrar
                    </Link>
                  </li>
                  <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                    <Link
                      to={"/adminLevereradeOrdrarList"}
                      className="block w-full h-full text-center"
                    >
                      Levererade Ordrar
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
              {admin === "Super Admin" && (
                <>
                  <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                    <Link
                      to={"/adminAdd"}
                      className="block w-full h-full text-center"
                    >
                      Skapa Admin
                    </Link>
                  </li>
                  <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                    <Link
                      to={"/adminList"}
                      className="block w-full h-full text-center"
                    >
                      Admin Lista
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="block sm:hidden flex justify-center items-center w-full justify-between ">
          {/* Detta ska vara dropdownen med språk */}
          <Dropdown
            label={language}
            items={["Swe", "Eng", "Arabic"]}
            onSelect={handleSelect}
            size="medium"
            color="black"
            className="w-20 z-20"
          ></Dropdown>

          <Link to={""}>
            <img
              src="/images/vastraGotalandsregionen.png"
              alt="Västra Götalandsregionen Logo"
              className="h-12 mr-6"
            />
          </Link>
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
          </button>
          {/* Menu för mobil */}

          <ul
            className={`absolute block top-16 left-0 w-full bg-white z-10 ${
              isOpen ? "block" : "hidden"
            } md:hidden`}
          >
            <li
              className="w-full text-center mt-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link
                to={"/"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Startsida
              </Link>
            </li>
            <hr className="border-black" />
            <li
              className="w-full text-center hover:text-blue-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link
                to={"/menu"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Menu
              </Link>
            </li>
            <hr className="border-black" />
            <li
              className="w-full text-center hover:text-blue-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link
                to={"/svinnsmartDeals"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Svinnsmart Deals
              </Link>
            </li>
            <hr className="border-black" />
            <li
              className="w-full text-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link
                to={"/shoppingCart"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Varukorg
              </Link>
            </li>

            {arInloggad ? (
              <>
                <hr className="border-black" />
                <li
                  className="w-full text-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link
                    to={"/adminStatistics"}
                    className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
                  >
                    Statestik
                  </Link>
                </li>
                <hr className="border-black" />
                <li
                  className="w-full text-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link
                    to={"/adminUploadDish"}
                    className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
                  >
                    Lägg Till Maträtt
                  </Link>
                </li>
                <hr className="border-black" />
                <li
                  className="w-full text-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link
                    to={"/adminInkomnaOrdrar"}
                    className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
                  >
                    Inkomna Ordrar
                  </Link>
                </li>
                <hr className="border-black" />
                <li
                  className="w-full text-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link
                    to={"/adminLevereradeOrdrarList"}
                    className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
                  >
                    Levererade Ordrar
                  </Link>
                </li>
                <hr className="border-black" />
                <li
                  className="w-full text-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link
                    onClick={() => loggout()}
                    to={"/"}
                    className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
                  >
                    Logga Ut
                  </Link>
                </li>
                <hr className="border-black" />
              </>
            ) : (
              <></>
            )}
            {admin === "Super Admin" && (
              <>
                <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                  <Link
                    to={"/adminAdd"}
                    className="block w-full h-full text-center"
                  >
                    Skapa Admin
                  </Link>
                </li>
                <hr className="border-black" />

                <li className="flex-1 p-4 hover:bg-black hover:text-white transition-colors duration-500">
                  <Link
                    to={"/adminList"}
                    className="block w-full h-full text-center"
                  >
                    Admin Lista
                  </Link>
                </li>
                <hr className="border-black" />
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
