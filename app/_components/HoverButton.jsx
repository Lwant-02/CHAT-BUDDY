import { useThemeContext } from "@/context/ThemeContext";
import { Tooltip } from "@mui/material";

function HoverButton({
  buttonIcon,
  popoverContent,
  disabled,
  onClick,
  onClass,
}) {
  const { theme } = useThemeContext();
  return (
    <Tooltip title={popoverContent} className="cursor-pointer">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${
          theme === "dark-mode" ? "hover:bg-gray-500 " : "hover:bg-gray-300 "
        } transition-all duration-300 p-1 rounded-full ${
          onClass === "options" && "hover:bg-transparent"
        } `}
      >
        {buttonIcon}
      </button>
    </Tooltip>
  );
}

export default HoverButton;
