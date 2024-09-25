import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import TextInput from "../../components/input/input";
import { useState } from "react";

const Payment = () => {
  const navigera = useNavigate();

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

  const handlePayment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    alert("Dit Beställning är Skickad");
    // Här kan du hantera betalningen

    navigera("/");
  };

  return (
    <>
      betala
      <div className="flex justify-center">
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
            <Button
              appliedColorClass="blue"
              appliedSizeClass="medium"
              className="mt-4 mb-4"
            >
              Betala
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
