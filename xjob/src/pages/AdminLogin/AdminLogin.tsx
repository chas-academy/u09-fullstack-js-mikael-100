import { useState } from "react";
import TextInput from "../../components/input/input";
import { Button } from "../../components/button/button";
import { Dropdown } from "../../components/dropdown/Dropdown";

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

  // Ändra namnet på denna funktion till handleSubmit och ta med eventparameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Detta ärttttt ", formData);

    const dataToSend = {
      name: formData.name,
      password: formData.password,
      hospital: formData.hospital,
      role: formData.role,
    };

    console.log("Sending data:", dataToSend);

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/api/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Logga svaret för att se vad servern returnerar
      const textResponse = await response.text(); // Hämta svaret som text
      console.log("Svaret:", textResponse); // Logga svaret för felsökning

      // Kontrollera om svaret är OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Om svaret är JSON, försök att parsa det
      const data = JSON.parse(textResponse);
      console.log(data);
    } catch (error) {
      console.error("Det gick inte hämta data", error);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-center font-roboto text-2xl">Admin Loggin</h1>
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
            <div className="w-[70%] md:w-[40%]">
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
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
