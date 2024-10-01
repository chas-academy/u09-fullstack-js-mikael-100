import React, { createContext, useState } from "react";

interface AuthContextType {
  arInloggad: boolean;
  setArInloggad: React.Dispatch<React.SetStateAction<boolean>>;
  admin: string; // Lägg till admin som en string
  setAdmin: React.Dispatch<React.SetStateAction<string>>; // Setter för admin
  hospital: string;
  setHospital: React.Dispatch<React.SetStateAction<string>>;
}

// Skapa kontexten
export const AuthContext = createContext<AuthContextType>({
  arInloggad: false,
  setArInloggad: () => {},
  admin: "",
  setAdmin: () => {},
  hospital: "",
  setHospital: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [arInloggad, setArInloggad] = useState(false);
  const [admin, setAdmin] = useState<string>(""); // Initiera admin som en tom string
  const [hospital, setHospital] = useState("");
  return (
    <AuthContext.Provider
      value={{
        arInloggad,
        setArInloggad,
        admin,
        setAdmin,
        hospital,
        setHospital,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
