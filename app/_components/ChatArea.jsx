"use client";
import { useState } from "react";
import { Drawer } from "@mui/material";
import SideBar from "./SideBar";
import Header from "./Header";
import Main from "./Main";

export default function ChatArea() {
  const [showSideBar, setShowSideBar] = useState(false);

  function handleOpen() {
    setShowSideBar(true);
  }

  return (
    <div className="flex flex-col bg-chatarea h-full p-2">
      <div className="flex justify-between">
        <Header handleOpen={handleOpen} />
      </div>

      <div className="flex flex-col justify-between flex-1 ">
        <Main />
      </div>

      {setShowSideBar && (
        <Drawer
          variant="temporary"
          open={showSideBar}
          onClose={() => setShowSideBar(false)}
          transitionDuration={300} // Animation duration
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              transition: "transform 300ms ease-in-out", // Smooth transition for the drawer
            },
          }}
        >
          <SideBar setShowSideBar={setShowSideBar} />
        </Drawer>
      )}
    </div>
  );
}
