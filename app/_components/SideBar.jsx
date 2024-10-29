"use client";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import HoverButton from "./HoverButton";
import { PanelRightOpen } from "lucide-react";
import Divider from "@mui/material/Divider";
import Contact from "./Contact";
import ChatHistory from "./ChatHistory";
import { UseMainContext } from "@/context/MainContextProvider";

export default function SideBar({ setShowSideBar }) {
  const { setSelectedChat } = UseMainContext();
  function handleCloseSideBar() {
    setShowSideBar(false);
  }
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //This is for checking isSmallScreen and perform something
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 1366);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-80 text-grey-800 p-3 bg-sidebar flex flex-col h-full">
      <div className="lg:hidden flex items-center justify-center">
        <h1 className="text-lg lg:text-xl uppercase font-bold text-grey-600">
          CHAT-BUDDY
        </h1>
      </div>

      <div className="flex items-center mb-8 justify-between lg:justify-end p-1">
        <div className="lg:hidden flex">
          <HoverButton
            buttonIcon={
              <PanelRightOpen
                size={25}
                onClick={handleCloseSideBar}
                className="text-grey-600"
              />
            }
            popoverContent="Close Sidebar"
          />
        </div>

        <HoverButton
          buttonIcon={<Pencil size={23} className="text-grey-600" />}
          popoverContent="New Chat"
          onClick={() => {
            setSelectedChat(null);
            if (isSmallScreen) {
              setShowSideBar(false);
            }
          }}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <ChatHistory setShowSideBar={setShowSideBar} />

        {/* Footer */}
        <div className="mb-8 flex flex-col gap-1">
          <Contact />
          <Divider />
          <span className="text-md mt-1 text-grey-500 items-center justify-center flex">
            Built with ❤️
          </span>
        </div>
      </div>
    </div>
  );
}
