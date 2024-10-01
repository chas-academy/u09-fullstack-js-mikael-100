import { useContext, useState } from "react";
import TextInput from "../../components/input/input";
import { Button } from "../../components/button/button";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
  interface FormData {
    name: string;
    password: string;
    hospital: string;
    role: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
    hospital: "",
    role: "",
  });
  const handleOnchange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigera = useNavigate();

  // State som håller koll på om användaren är inloggad
  const authContext = useContext(AuthContext);

  // Kontrollera om authContext är undefined
  if (!authContext) {
    return null; // Hantera fallet när kontexten inte är tillgänglig
  }
  const { setArInloggad, arInloggad, setAdmin, admin, setHospital } =
    authContext;

  // Ändra namnet på denna funktion till handleSubmit och ta med eventparameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Förhindra standardbeteendet för formulär
    console.log("Formulärdata:", formData); // Logga den aktuella formulärdatat

    // Samla in data som ska skickas till servern
    const dataToSend = {
      name: formData.name,
      password: formData.password,
      hospital: formData.hospital,
      role: formData.role,
    };

    console.log("Skickar data:", dataToSend); // Logga data som ska skickas

    const apiUrl = import.meta.env.VITE_API_URL; // API-url

    try {
      // Skicka en POST-begäran till servern
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        credentials: "include", // Viktigt för att skicka cookies
      });

      // Kontrollera om svaret är OK
      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status}`;
        console.error(errorMessage); // Logga felmeddelande
        throw new Error(errorMessage); // Kasta fel om svaret inte är OK
      }

      // Sätt arInloggad till true
      setArInloggad(true);
      // Försök att parsa svaret som JSON
      const data = await response.json();
      // Hantera admin-information
      if (data.admin) {
        console.log("Inloggad admin:", data.admin.role);
        setAdmin(data.admin.role);
      }
      if (data.admin.hospital) {
        setHospital(data.admin.hospital);
      }
      console.log("Svaret från servern:", data); // Logga svaret för felsökning
      navigera("/"); // Navigera till hemsidan

      // Ingen token hanteras här eftersom backend redan sätter den i cookies
    } catch (error) {
      console.error("Det gick inte att hämta data:", error); // Logga eventuella fel
      toast.error("Tyvärr gick det inte att logga in, försök igen!");
      setArInloggad(false);
    }
  };
  console.log("Nu är staten satt till inloggad", arInloggad);
  console.log("Vad är admin nu?", admin);

  return (
    <>
      <div className="flex justify-center">
        <div className="border-2 w-[90%] sm:w-[50%] md:w-[50%]">
          <div>
            <h1 className="text-center font-roboto text-2xl mt-7">
              Admin Loggin
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mt-10">
                <div className="w-[70%] md:w-[30%]">
                  <TextInput
                    label="Användarnamn"
                    name="name"
                    value={formData.name}
                    onChange={handleOnchange}
                    divStyle="small"
                    inputStyle="small"
                    labelStyle="small"
                    required={true}
                  ></TextInput>
                  <TextInput
                    label="Lösenord"
                    name="password"
                    value={formData.password}
                    onChange={handleOnchange}
                    divStyle="small"
                    inputStyle="small"
                    labelStyle="small"
                    required={true}
                  ></TextInput>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-[70%] md:w-[80%]">
                  <Dropdown
                    label={formData.hospital || "Välj Sjukhus"}
                    name="hospital"
                    items={[
                      "Alingsås lasarett",
                      "Angereds Närsjukhus",
                      "Frölunda specialistsjukhus",
                      "Kungälvs sjukhus",
                      "Skaraborgs Sjukhus",
                      "Södra Älvsborgs Sjukhus",
                    ]}
                    onSelect={(value) => handleSelect("hospital", value)}
                  ></Dropdown>
                  <Dropdown
                    label={formData.role || "Välj Behörighet"}
                    name="role"
                    items={["Admin", "Super Admin"]}
                    onSelect={(value) => handleSelect("role", value)}
                  ></Dropdown>
                </div>
              </div>
              <div className="mt-7 mb-20">
                <Button
                  appliedColorClass="blue"
                  appliedSizeClass="medium"
                  type="submit"
                >
                  Logga in
                </Button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
