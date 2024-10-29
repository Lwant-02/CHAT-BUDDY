// "use client";
// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import FolderIcon from "@mui/icons-material/Folder";
// import { useThemeContext } from "@/context/ThemeContext";
// import avatar from "../../public/image/default-avatar.png";

// export default function UserAvatar() {
//   const { theme } = useThemeContext();
//   const [avatarSrc, setAvatarSrc] = useState("");
//   // Function to handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0]; // Get the selected file
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setAvatarSrc(e.target.result); // Set the image source from the file
//       };
//       reader.readAsDataURL(file); // Read the file as a data URL (base64)
//     }
//   };

//   // Function to trigger file input click
//   const handleAvatarClick = () => {
//     document.getElementById("avatarInput").click(); // Trigger the file input click
//   };

//   return (
//     <div className="flex items-center gap-1 ml-8">
//       <Avatar
//         alt="user name"
//         src={avatarSrc || avatar}
//         sx={{ width: "60px", height: "60px" }}
//         className="shadow-md cursor-pointer"
//       />
//       <span
//         className={`cursor-pointer rounded-md transition-all duration-300 ${
//           theme === "light-mode" ? "hover:bg-gray-300" : "hover:bg-gray-500"
//         }  pl-1 pr-1`}
//       >
//         <input
//           type="file"
//           id="avatarInput"
//           style={{ display: "none" }}
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//         <FolderIcon className="text-[18px] " onClick={handleAvatarClick} />
//       </span>
//     </div>
//   );
// }

import React from "react";

export default function UserAvatar() {
  return <div>UserAvatar</div>;
}
