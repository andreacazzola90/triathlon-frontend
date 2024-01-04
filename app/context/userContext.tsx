"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User
  extends IFormNegozioRetail,
    IFormPhotoboot,
    IFormTecnogym,
    IFormTryOn {
  id?: number;
  name?: string;
  isLoggedIn?: boolean;
  dateOfBirth?: Date;
  weight?: number;
  goal?: string;
  athleteLevel?: string;
  phone?: number;
  privacyAccept?: boolean;
}

export type IFormNegozioRetail = {
  confirmPurchase?: boolean;
  shoeModelPurchased?: string;
};

export type IFormPhotoboot = {
  shoeBrand?: string;
  shoeModelTested?: string;
  shoeSizeTested?: string;
};

export type IFormTecnogym = {
  cadence?: string;
  supportTime?: string;
  verticalOscillation?: string;
  symmetry?: string;
};

export type IFormTryOn = {
  becauseIRun?: string;
  photo?: File;
};

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
    const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "users/" + user?.id;
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser({ ...user, ...data });
      })
      .catch((error) => {
        console.error(error);
      });

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
