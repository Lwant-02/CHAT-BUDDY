"use client";
import React, { useState } from "react";
import { Dropdown } from "antd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ProfileModal from "./ProfileModal";
import Theme from "./Theme";
import { signOut, useSession } from "next-auth/react";
import { UseMainContext } from "@/context/MainContextProvider";

export default function DropDownMenu({ icon, ClassName }) {
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userData } = UseMainContext();
  const shortName = userData?.name?.slice(0, 15);

  function handleMenuClick(e) {
    e.domEvent.stopPropagation();
  }
  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }
  function handleVisibleChange(flag) {
    setVisible(flag);
  }
  const items = [
    {
      label: (
        <div className="flex flex-row justify-center items-center text-grey-800 font-bold capitalize">
          {shortName}
        </div>
      ),
      key: "0",
      disabled: true,
      type: "group",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="gap-2 flex p-[0.30rem]">
          <button
            className="flex gap-1 justify-center items-center"
            onClick={handleOpenModal}
          >
            <SettingsIcon className="text-grey-800 " />

            <span className="text-grey-800">Setting</span>
          </button>
        </div>
      ),
      key: "1",
      onClick: handleMenuClick,
    },

    {
      label: (
        <div className="gap-2 flex p-[0.30rem]">
          <span className="flex gap-2 items-center justify-center">
            <Theme />
          </span>
        </div>
      ),
      key: "2",
      onClick: handleMenuClick,
    },
    {
      label: (
        <div className="gap-2 flex p-[0.30rem]">
          <button className="flex gap-1 justify-center items-center">
            <LogoutIcon className="text-grey-800" />
            <span
              className="text-grey-800"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              Logout
            </span>
          </button>
        </div>
      ),
      key: "3",
      onClick: handleMenuClick,
    },
  ];
  return (
    <div
      className={`${ClassName}  transition-all duration-300 rounded-lg cursor-pointer `}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        className="cursor-pointer"
        open={visible}
        onOpenChange={handleVisibleChange}
      >
        {icon}
      </Dropdown>
      <ProfileModal openModal={openModal} onClose={handleCloseModal} />
    </div>
  );
}
