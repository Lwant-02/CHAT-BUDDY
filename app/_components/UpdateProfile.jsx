"use client";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import { UpdateName } from "@/lib/data-service";
import { message } from "antd";
import { UseMainContext } from "@/context/MainContextProvider";
import { useRouter } from "next/navigation";
import MiniSpinner from "./MiniSpinner";

export default function UpdateProfile() {
  const { register, handleSubmit, reset } = useForm();

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData, setSelectedChat } = UseMainContext();
  const router = useRouter();
  const userId = userData?.id;

  async function handleSubmitForm(data) {
    const { name } = data;
    try {
      setIsLoading(true);
      const res = await UpdateName({ userId, name: name });
      if (res) {
        setUserData({ ...userData, name });
        router.refresh();
        setSelectedChat(null);
        message.success("Name successfully updated.");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <Avatar
          alt={session?.user?.name || "user name"}
          src={session?.user?.image ? session.user.image : ""}
          sx={{ width: "60px", height: "60px" }}
          className="shadow-md cursor-pointer"
        />
        <h1 className="text-gray-950 text-lg capitalize">{userData?.name}</h1>
      </div>
      <TextField
        label="Name"
        type="text"
        sx={{ width: { lg: "20rem", xs: "15rem" } }}
        variant="outlined"
        size="small"
        placeholder="Name"
        {...register("name")}
        defaultValue={userData?.name}
      />
      <TextField
        label="Email"
        className="text-sm"
        variant="outlined"
        type="email"
        placeholder="Email"
        disabled={true}
        defaultValue={userData?.email}
        size="small"
        sx={{
          width: { lg: "20rem", xs: "15rem" },
        }}
      />
      <div className="flex justify-center gap-3">
        <button
          className=" bg-gray-300 text-gray-900 border-gray-400 font-normal rounded-md h-10 w-28 text-md hover:bg-gray-400 shadow-md"
          onClick={() => reset()}
          type="button"
        >
          Cancel
        </button>
        <button
          className="bg-sky-500 text-stone-50 rounded-md border-sky-500 font-normal h-10 w-28 text-md hover:bg-sky-600 shadow-md flex justify-center items-center"
          type="submit"
        >
          {!isLoading ? "Update" : <MiniSpinner onClass="#ffffff" />}
        </button>
      </div>
    </form>
  );
}
