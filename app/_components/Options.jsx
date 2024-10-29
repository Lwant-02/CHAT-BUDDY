"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "antd";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShareIcon from "@mui/icons-material/Share";
import ConfirmDialog from "./ConfirmDialog";

export default function Options({
  icon,
  ClassName,
  setOpenModal,
  setShowSideBar,
  onDelete,
  chatId,
  onEdit,
}) {
  const [visible, setVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [open, setOpen] = useState(false);

  //This is for checking isSmallScreen and perform something
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 1366);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleMenuClick(e) {
    e.domEvent.stopPropagation();
  }
  function handleOpenShareModal() {
    setOpenModal(true);
  }

  function handleVisibleChange(flag) {
    setVisible(flag);
  }
  const items = [
    {
      label: (
        <div className="gap-2 flex p-[0.30rem]">
          <button
            className="flex gap-1 justify-center items-center"
            onClick={() => {
              handleOpenShareModal();
              if (isSmallScreen) {
                setShowSideBar(false);
              }
            }}
          >
            <ShareIcon className="text-grey-800 " />

            <span className="text-grey-800">Share</span>
          </button>
        </div>
      ),
      key: "1",
      onClick: handleMenuClick,
    },

    {
      label: (
        <div className="gap-2 flex p-[0.30rem]">
          <button
            className="flex gap-2 items-center justify-center"
            onClick={() => onEdit(chatId)}
          >
            <EditRoundedIcon className="text-grey-800" />
            <span className="text-grey-800">Edit</span>
          </button>
        </div>
      ),
      key: "2",
      onClick: handleMenuClick,
    },
    {
      label: (
        <div className="gap-2 flex p-[0.30rem]">
          <button
            className="flex gap-1 justify-center items-center"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteRoundedIcon className="text-red-500" />
            <span className="text-red-500">Delete</span>
          </button>
        </div>
      ),
      key: "3",
      onClick: handleMenuClick,
    },
  ];
  return (
    <>
      <div
        className={`${ClassName}  transition-all duration-300 rounded-lg cursor-pointer`}
      >
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          className="cursor-pointer"
          open={visible}
          onOpenChange={handleVisibleChange}
          overlayClassName="dropdown-overlay"
        >
          {icon}
        </Dropdown>
      </div>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        chatId={chatId}
        onDelete={onDelete}
      />
    </>
  );
}
