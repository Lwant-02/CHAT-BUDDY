import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useThemeContext } from "@/context/ThemeContext";

export default function ConfirmDialog({ open, setOpen, chatId, onDelete }) {
  const { theme } = useThemeContext();
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(chatId);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: `${theme === "dark-mode" ? "#94a3b8" : "#e0e0e0"}`,
          padding: "5px",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Delete Chat?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will delete this chat permanently!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          onClick={(e) => handleClose(e)}
          className={` text-gray-950 ${
            theme === "dark-mode"
              ? "hover:bg-gray-200 border border-gray-200"
              : "hover:bg-gray-400 border border-gray-400"
          }  rounded-md h-8 p-3 flex justify-center items-center`}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          className="bg-red-500 text-gray-50 hover:bg-red-600 rounded-md h-8 p-3 flex justify-center items-center"
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
}
