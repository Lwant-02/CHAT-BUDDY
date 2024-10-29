import React from "react";
import Avatar from "@mui/material/Avatar";
import DropDownMenu from "./DropDownMenu";
import { useSession } from "next-auth/react";
import { Button } from "antd";

export default function Account() {
  const { data: session } = useSession();
  return (
    <DropDownMenu
      icon={
        <Button ghost className="border-none rounded-full w-[40px] h-[40px]">
          <Avatar
            alt={session?.user?.name || "user name"}
            src={session?.user?.image ? session.user.image : ""}
            sx={{ width: "40px", height: "40px" }}
            className="shadow-md"
          />
        </Button>
      }
    />
  );
}
