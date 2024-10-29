import React from "react";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
import HoverButton from "./HoverButton";
import { useThemeContext } from "@/context/ThemeContext";
import UpdateProfile from "./UpdateProfile";
import { signOut } from "next-auth/react";

export default function ProfileModal({ openModal, onClose }) {
  const { theme } = useThemeContext();
  return (
    <>
      <Modal
        open={openModal}
        onClose={onClose}
        className="flex justify-center items-center"
      >
        <div
          className={`${
            theme === "light-mode" ? "bg-gray-200" : "bg-slate-400"
          }  flex flex-col justify-center items-center lg:w-[25rem] w-[20rem] rounded-md p-3 lg:p-5 shadow-md`}
        >
          <div className="flex justify-end w-full items-center">
            <HoverButton
              buttonIcon={
                <LogoutIcon className="text-gray-900 cursor-pointer " />
              }
              popoverContent="Logout"
              onPlace="rightTop"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            />
          </div>
          <div className="mt-5 mb-5">
            <UpdateProfile />
          </div>
        </div>
      </Modal>
    </>
  );
}
