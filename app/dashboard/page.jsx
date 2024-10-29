import React from "react";
import SideBar from "../_components/SideBar";
import ChatArea from "../_components/ChatArea";

export default function page() {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:hidden md:hidden xl:flex">
        <SideBar />
      </div>
      <div className="flex-1 h-full">
        <ChatArea />
      </div>
    </div>
  );
}
