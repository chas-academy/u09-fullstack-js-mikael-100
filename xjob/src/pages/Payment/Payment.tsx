import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import TextInput from "../../components/input/input";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVarukorgStore } from "../../stores/varukorgStore";

const Payment = () => {
  const navigera = useNavigate();

  const { clear } = useVarukorgStore();

  // Dessa två rader tillåter att jag skickar med data från varukorg och hämtar den hit och binder till itemsvarukorg.
  const location = useLocation();
  interface Item {
    dish: string;
    amount: string;
  }

  // const itemVarukorg: Item[] = location.state || {}; // Hämta den skickade datan

  // Update the destructuring to provide a default value
  const { itemVarukorg, totalPris = 0 } = location.state || {}; // Set default to 0

  console.log("Location state:", location.state);
  console.log("Totalpris på betalningssidan:", totalPris);

  // Mappa ut rättens namn och antal
  const nyttObjekt = itemVarukorg.map((item: Item) => ({
    dish: item.dish,
    amount: item.amount,
  }));

  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    department: "",
  });

  // Handle change sköter uppdateringen av de som skrivs i inputsen till useState formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Formadatannnn", formData);
  };

  // Denna funktion visar ett tostify meddelande och efter 5.5 sek så cleras allt i useVarukorgStoren och användaren skickas till första sidan
  const handlePayment: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Mappa formulärdata till backend-förväntade nycklar
    const orderData = {
      Orders: nyttObjekt,
      Hospital: useVarukorgStore.getState().sjukhus,
      FirstName: formData.firstName, // Använd rätt namn för nycklarna
      LastName: formData.lastName,
      PhoneNumber: formData.phoneNumber,
      Department: formData.department,
    };

    // Logga orderData
    console.log("Order data som skickas:", orderData);

    try {
      const response = await fetch(`${apiUrl}/api/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Något gick fel");
      }

      const responseData = await response.json();
      console.log("Beställning mottagen:", responseData);

      // Visa toast-meddelande för framgång
      toast.success("Din beställning är skickad!");

      // Navigera efter 5 sekunder
      setTimeout(() => {
        clear(); // Rensa varukorgen
        navigera("/"); // Navigera till hemsidan
      }, 5500);
    } catch (error) {
      console.error("Fel vid beställning:", error);
      // Visa toast-meddelande för fel
      toast.error("Kunde inte skicka beställningen, försök igen!");
    }
  };

  // const notify = () => toast("Wow so easy!");

  return (
    <>
      <div className="flex justify-center mt-10 mb-20">
        <div className="w-[70%] sm:w-[50%] md:w-[50%] lg:w-[30%]">
          <form action="" onSubmit={handlePayment}>
            <TextInput
              label="Förnamn *"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              divStyle={"small"}
              inputStyle={"small"}
              labelStyle={"small"}
              required={true}
            ></TextInput>
            <TextInput
              label="Efternamn *"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              divStyle={"small"}
              inputStyle={"small"}
              labelStyle={"small"}
              required={true}
            ></TextInput>
            <TextInput
              name="phoneNumber"
              label="Telefonummer *"
              value={formData.phoneNumber}
              onChange={handleChange}
              divStyle={"small"}
              inputStyle={"small"}
              labelStyle={"small"}
              required={true}
            ></TextInput>
            <TextInput
              name="department"
              label="Avdelning *"
              value={formData.department}
              onChange={handleChange}
              divStyle={"small"}
              inputStyle={"small"}
              labelStyle={"small"}
              required={true}
            ></TextInput>
            <div className="flex justify-center">
              <hr className="border-t border-black mt-20 w-[80%]" />
            </div>
            <p className="font-roboto text-center mt-3">{`Att betala: ${totalPris}:-`}</p>
            <Button
              appliedColorClass="blue"
              appliedSizeClass="medium"
              className="mt-4 mb-4"
            >
              Betala
            </Button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
