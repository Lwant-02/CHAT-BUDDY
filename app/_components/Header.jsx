import { PanelRightClose } from "lucide-react";
import HoverButton from "./HoverButton";
import Account from "./Account";
import DropDownMenu from "./DropDownMenu";
import TuneIcon from "@mui/icons-material/Tune";

export default function Header({ handleOpen }) {
  return (
    <>
      <div className="font-bold flex gap-6 items-center justify-center lg:pl-10">
        <span className="lg:hidden flex">
          <HoverButton
            buttonIcon={
              <PanelRightClose
                size={28}
                className="text-grey-600 cursor-pointer "
                onClick={handleOpen}
              />
            }
            popoverContent="Open Sidebar"
          />
        </span>

        <h1 className="lg:text-xl text-lg text-grey-500 uppercase hidden lg:flex font-bold">
          CHAT-BUDDY
        </h1>
      </div>
      <DropDownMenu
        icon={
          <HoverButton
            buttonIcon={
              <TuneIcon sx={{ fontSize: "28px" }} className="text-grey-600 " />
            }
            popoverContent="Open Setting"
          />
        }
        ClassName="lg:hidden flex"
      />
      <div className="lg:flex hidden mr-6 items-center">
        <Account />
      </div>
    </>
  );
}
