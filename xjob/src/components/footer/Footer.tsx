import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="bg-navbar-bg py-10 text-white w-full">
        <div className="flex flex-col sm:flex-row px-4 justify-between items-center">
          <ul className="ml-8 flex-1 py-8 sm:py-0 sm:ml-0">
            <li>
              <h1>Kontaktuppgifter</h1>
            </li>
            <li>
              <p>Tel nr: +46 10-441 00 00</p>
            </li>
            <li>
              <p>Org nr: 232100-0131</p>
            </li>
            <li>
              <Link to={"https://www.vgregion.se/"}>www.vgregion.se</Link>
            </li>
          </ul>
          <Link to={"/"} className="flex-1 flex justify-center">
            <img
              src="/images/Footer.png"
              alt="Vastra Gotaland Logga"
              className="h-10 "
            />
          </Link>
          <ul className="md:mr-8 flex-1 flex justify-end py-8 sm:py-0 sm:mr-0">
            <li>
              <Link to={"/adminLogin"}>Admin</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
