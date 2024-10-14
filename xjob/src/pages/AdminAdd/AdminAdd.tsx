import { ChangeEvent, FormEvent, useState } from "react";
import TextInput from "../../components/input/input";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Button } from "../../components/button/button";
import { toast, ToastContainer } from "react-toastify";

const AdminAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    hospital: "Välj Sjukhus",
    role: "Välj Behörighet",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const apiURL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiURL}/api/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Fel vid begäran");
      }
      setFormData({
        name: "",
        password: "",
        hospital: "Välj Sjukhus",
        role: "Välj Behörighet",
      });

      toast.success("Användare skapad!");
    } catch (error) {
      console.log("något gick fel vid skapadet av användare", error);
    }
  };
  return (
    <>
      {/* <h1 className="text-center font-bold">Skapa Användare</h1> */}
      <div className="flex justify-center mt-10">
        <div className="w-[80%] sm:w-[70%] border bg-gray-300 rounded mb-20">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mt-10">
              <div className="w-[80%] sm:w-[40%] md:w-[50%] lg:w-[30%]">
                <div>
                  <TextInput
                    label="Användarnamn"
                    value={formData.name}
                    onChange={(e) => handleChange(e)}
                    name="name"
                  ></TextInput>
                </div>
                <div className="mt-4">
                  <TextInput
                    label="Lösenord"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    name="password"
                  ></TextInput>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="relative z-10">
                <Dropdown
                  label={formData.hospital}
                  items={[
                    "Alingsås lasarett",
                    "Angereds Närsjukhus",
                    "Frölunda specialistsjukhus",
                    "Kungälvs sjukhus",
                    "Skaraborgs Sjukhus",
                    "Södra Älvsborgs Sjukhus",
                  ]}
                  onSelect={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      hospital: e,
                    }))
                  }
                ></Dropdown>
              </div>
            </div>
            <Dropdown
              label={formData.role}
              items={["Admin", "Super Admin"]}
              onSelect={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role: e,
                }))
              }
            ></Dropdown>
            <div className="mt-7 mb-10">
              <Button
                type="submit"
                appliedColorClass="blue"
                appliedSizeClass="medium"
              >
                {" "}
                Skapa Användare
              </Button>
            </div>
          </form>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </>
  );
};

export default AdminAdd;
