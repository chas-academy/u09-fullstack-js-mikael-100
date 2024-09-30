import React, { createContext, useState } from "react";

interface AuthContextType {
  arInloggad: boolean;
  setArInloggad: React.Dispatch<React.SetStateAction<boolean>>;
  admin: string; // Lägg till admin som en string
  setAdmin: React.Dispatch<React.SetStateAction<string>>; // Setter för admin
}

// Skapa kontexten
export const AuthContext = createContext<AuthContextType>({
  arInloggad: false,
  setArInloggad: () => {},
  admin: "",
  setAdmin: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [arInloggad, setArInloggad] = useState(false);
  const [admin, setAdmin] = useState<string>(""); // Initiera admin som en tom string
  return (
    <AuthContext.Provider
      value={{ arInloggad, setArInloggad, admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
