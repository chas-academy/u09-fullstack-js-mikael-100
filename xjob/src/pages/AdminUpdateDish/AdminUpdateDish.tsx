import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ImgComponent from "../../components/img/img";
import TextInput from "../../components/input/input";
import TextAreaInput from "../../components/textArea/textArea";
import { Dropdown } from "../../components/dropdown/Dropdown";
import CheckBoxComponent from "../../components/checkbox/checkboxComponent";
import { Button } from "../../components/button/button";
import { toast, ToastContainer } from "react-toastify";

const AdminUpdateDish = () => {
  const { id } = useParams();

  interface dishProp {
    [key: string]: string | number | string[];
    dish: string;
    hospital: string;
    image: string;
    information: string;
    options: string;
    price: number;
    quantity: number;
    _id: string;
    allergies: string[];
  }
  const [dish, setDish] = useState<dishProp>({
    dish: "",
    hospital: "",
    image: "",
    information: "",
    options: "",
    price: 0,
    quantity: 0,
    _id: "",
    allergies: [],
  });

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const hamtaData = async () => {
      try {
        const response = await fetch(`${apiURL}/api/cuisines/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Responsen var inte bra");
        }
        const data = await response.json();
        // Ändrar så att urs strängen blir rätt för att kunna visa bild
        const imageURL = data.image.replace(/\\/g, "/");
        const imageURLPlusBackendUrl = `${apiURL}/${imageURL}`;
        // console.log("rätt??", imageURLPlusBackendUrl);
        // console.log("dddd", data);

        setDish({
          dish: data.dish,
          hospital: data.hospital,
          image: imageURLPlusBackendUrl,
          information: data.information,
          options: data.options,
          price: data.price,
          quantity: data.quantity,
          _id: data._id,
          allergies: data.allergies,
        });
      } catch (error) {
        console.error("Något gick fel i hämtning", error);
      }
    };
    hamtaData();
    // console.log("dddduuu", dish);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChecked = (allergy: string, checked: boolean) => {
    setDish((prevDish) => {
      // Om allergin är ikryssad, lägg till den i listan, annars ta bort den
      const updatedAllergies = checked
        ? [...prevDish.allergies, allergy]
        : prevDish.allergies.filter((a) => a !== allergy);

      return { ...prevDish, allergies: updatedAllergies };
    });
  };

  // Lista över allergier som kommer att mappas ut i returnen
  const allergiesList = [
    "Glutenfri",
    "Laktosfri",
    "Fläskfri",
    "Vegetarisk",
    "Mjölkproteinfri",
    "Vegan",
  ];

  const [image, setImage] = useState<File | null>(null);

  const imgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const imageFile = files[0]; // Ta den första filen
      const imageURL = URL.createObjectURL(imageFile); // Skapa en URL för den valda filen

      setImage(imageFile);
      setDish((prev) => ({
        ...prev,
        image: imageURL, // Uppdatera bildens URL
      }));
    } else {
      console.error("Ingen fil vald");
    }
  };

  const gorEnPut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(dish).forEach((key) => {
      if (key === "image") {
        return;
      }
      const value = dish[key];
      formData.append(key, value as string);
    });

    if (image !== null) {
      formData.append("image", image as File);
    }
    for (const [key, value] of formData) {
      console.log(key, value);
    }

    try {
      const response = await fetch(`${apiURL}/api/cuisines/${id}`, {
        method: "PUT",

        credentials: "include",
        body: formData,
      });

      toast.success("Uppdateringen lyckades");

      if (!response.ok) {
        throw new Error("Uppdatering misslyckades");
      }
    } catch (error) {
      console.error("Något gick fel", error);
      toast.error("Något gick fel med uppdateringen");
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null); // Definiera filreferensen
  const triggerFileInput = () => {
    fileInputRef.current?.click(); // Triggar input-elementets click
  };
  return (
    <>
      <form onSubmit={gorEnPut}>
        <div className=" flex justify-center">
          {/* <img src="http://localhost:5000/uploads/1.png" alt="" /> */}
          <div className="w-[100%] sm:w-[50%] md:w-[40%]">
            <ImgComponent
              src={dish.image}
              alt={"Hej"}
              sizeDiv="small"
              sizeImg="small"
            ></ImgComponent>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={imgUpload}
                className="hidden"
              ></input>
              <svg
                onClick={triggerFileInput}
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                className="w-10 h-1/2 ml-auto p-1"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#000000"
                    d="M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H96zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112zM256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <div className="w-[90%] sm:w-[60%] md:w-[40%] flex-col">
            <TextAreaInput
              label="Rubrik"
              name="dish"
              value={dish.dish}
              rows={3}
              onChange={handleChange}
            ></TextAreaInput>
            <div className="mt-3">
              <TextAreaInput
                label="Information"
                name="information"
                value={dish.information}
                onChange={handleChange}
                rows={8}
              ></TextAreaInput>
            </div>
            <div>
              <div className="mt-3">
                <TextInput
                  label="Pris"
                  value={dish.price}
                  name="price"
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="mt-3">
                <TextInput
                  label="Antal"
                  value={dish.quantity}
                  name="quantity"
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="mt-10">
                <Dropdown
                  label={dish.options}
                  name="options"
                  onSelect={(item) => {
                    // Se till att item är det valda värdet
                    setDish((prev) => ({
                      ...prev,
                      options: item, // Uppdatera sjukhusfältet med det valda värdet
                    }));
                  }}
                  items={[
                    "Kylda Portionsrätter",
                    "Mejeri",
                    "Lunchbrickor",
                    "Shark",
                    "Kött",
                    "Fisk",
                    "Läsk",
                    "Övrigt",
                  ]}
                />

                <Dropdown
                  label={dish.hospital} // Korrekt label
                  name="hospital" // Namnet på fältet
                  onSelect={(item) => {
                    // Se till att item är det valda värdet
                    setDish((prev) => ({
                      ...prev,
                      hospital: item, // Uppdatera sjukhusfältet med det valda värdet
                    }));
                  }}
                  items={[
                    "Alingsås lasarett",
                    "Angereds Närsjukhus",
                    "Frölunda specialistsjukhus",
                    "Kungälvs sjukhus",
                    "Skaraborgs Sjukhus",
                    "Södra Älvsborgs Sjukhus",
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <div className="flex flex-row w-full flex-wrap justify-center">
                {allergiesList.map((allergy) => (
                  <div className="w-[30%] flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <label htmlFor={allergy}>{allergy}</label>
                      <CheckBoxComponent
                        key={allergy}
                        id={allergy.toLowerCase()}
                        checked={dish.allergies.includes(allergy)} // Kolla om allergin finns i listan
                        onChange={(checked) => handleChecked(allergy, checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 mb-10">
              <Button
                type="submit"
                appliedColorClass="blue"
                appliedSizeClass="medium"
              >
                Uppdatera
              </Button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AdminUpdateDish;
