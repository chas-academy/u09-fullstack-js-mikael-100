import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="p-4">
        <div className="hidden sm:block">
          <div className="container mx-auto flex justify-between items-center my-2">
            <button>Dropdown ska in</button>
            {/* Dropdown med språk ska vara en gegen komponent som skall in här */}
            <img
              src="/src/assets/images/vastraGotalandsregionen.png"
              alt="Västra Götalandsregionen Logo"
              className="h-12 mx-auto"
            />
            {/* Komponent på knapp ska in här */}
            {/* <button className="bg-white-600 text-black border border-black  rounded-md px-4 py-2 hover:bg-black hover:text-white hover:border-white transition-colors duration-500">
              Logga ut
            </button> */}
            <Button appliedColorClass="black">Logga Ut</Button>
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
                  to={"/shoppingCart"}
                  className="block w-full h-full text-center"
                >
                  Varukorg
                </Link>
              </li>
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
            </ul>
          </div>
        </div>
        <div className="block sm:hidden flex justify-center items-center w-full">
          {/* Detta ska vara dropdownen med språk */}
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
          <img
            src="/src/assets/images/vastraGotalandsregionen.png"
            alt="Västra Götalandsregionen Logo"
            className="h-12 mx-auto"
          />
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
            className={`absolute block top-16 left-0 w-full ${
              isOpen ? "block" : "hidden"
            } md:hidden`}
          >
            <li className="w-full text-center mt-4">
              <Link
                to={"/"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Startsida
              </Link>
            </li>
            <hr className="border-black" />
            <li className="w-full text-center hover:text-blue-600">
              <Link
                to={"/menu"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Menu
              </Link>
            </li>
            <hr className="border-black" />
            <li className="w-full text-center">
              <Link
                to={"/shoppingCart"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Varukorg
              </Link>
            </li>
            <hr className="border-black" />
            <li className="w-full text-center">
              <Link
                to={"/adminStatistics"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Statestik
              </Link>
            </li>
            <hr className="border-black" />
            <li className="w-full text-center">
              <Link
                to={"/adminLogin"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Admin
              </Link>
            </li>
            <hr className="border-black" />
            <li className="w-full text-center">
              <Link
                to={"/adminLoadDish"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Lägg Till Maträtt
              </Link>
            </li>
            <hr className="border-black" />
            <li className="w-full text-center">
              <Link
                to={"/logout"}
                className="block w-full p-5 hover:text-blue-600 hover:bg-black hover:text-white transition-colors duration-500"
              >
                Logga Ut
              </Link>
            </li>
            <hr className="border-black" />
          </ul>
        </div>
      </nav>
    </>
  );
};
