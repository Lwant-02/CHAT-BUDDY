"use client";

import { getSession, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();
export default function MainContextProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [userChats, setUserChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setUserData({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          clerkUserId: session.user.clerkUserId,
        });
      }
    };

    fetchData();
  }, [session]);

  return (
    <MainContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        userChats,
        setUserChats,
        userData,
        setUserData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

function UseMainContext() {
  const context = useContext(MainContext);
  if (context === undefined)
    throw new Error("Context can not be outside of the MainContextProvider!");
  return context;
}
export { UseMainContext };
