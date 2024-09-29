import React, { createContext, useState } from "react";

interface AuthContextType {
  arInloggad: boolean;
  setArInloggad: React.Dispatch<React.SetStateAction<boolean>>;
}

// Skapa kontexten
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [arInloggad, setArInloggad] = useState(false);

  return (
    <AuthContext.Provider value={{ arInloggad, setArInloggad }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
