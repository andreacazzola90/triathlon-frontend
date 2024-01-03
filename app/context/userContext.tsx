"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id?: number;
  name?: string;
  isLoggedIn?: boolean;
  dateOfBirth?: Date;
  weight?: number;
  goal?: string;
  athleteLevel?: string;
  phone?: number;
  privacyAccept?: boolean;
  // Aggiungi altre proprietà utente se necessario
}

interface UserContextProps {
  user: User | null;
  login: (userData: User) => void;
  updateUser: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser deve essere utilizzato all'interno di un UserProvider"
    );
  }
  return context;
};
