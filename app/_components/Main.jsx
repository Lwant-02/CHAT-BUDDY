"use client";
import React, { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Messages from "./Messages";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { UseMainContext } from "@/context/MainContextProvider";
import { CreateNewChats, UpdateChats } from "@/lib/data-service";
import { useSession } from "next-auth/react";

export default function Main() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    keepLastMessageOnError: true,
    initialMessages: [],
  });
  const { selectedChat, setSelectedChat, userChats, setUserChats } =
    UseMainContext();
  const textareaRef = useRef(null);
  const { data: session } = useSession();

  //For creating new chats
  async function saveOrUpdateChats() {
    try {
      if (!selectedChat) {
        const payload = {
          user: session?.user?.id,
          messages: messages,
          title: messages[0].content,
        };
        const res = await CreateNewChats(payload);
        if (res) {
          setSelectedChat(res);
          setUserChats([res, ...userChats]);
        }
      } else {
        await UpdateChats({ chatId: selectedChat._id, messages });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    if (messages.length > 0) saveOrUpdateChats();
  }, [messages]);

  //For key down
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  //Only run when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  //This is for when we select the chat and display the chat history with user
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  return (
    <>
      <Messages messages={messages} />
      <div className="flex justify-center w-full lg:mb-7 md:mb-5 mb-3">
        <form
          onSubmit={handleSubmit}
          className="relative md:w-full w-full lg:w-[57rem] "
        >
          <textarea
            ref={textareaRef}
            className={`w-full p-[1rem] pl-5 pr-14 bg-grey-300 shadow-sm focus:outline-none rounded-full text-grey-900  text-md resize-none h-[3.2rem] overflow-auto items-center `}
            value={input}
            placeholder="Message L-0 Chat"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <button
            disabled={!input.length}
            type="submit"
            className={`absolute  focus:outline-none rounded-full transition-all ${
              input.length === 0
                ? "bg-grey-400"
                : "bg-grey-900 hover:bg-grey-600"
            } right-4 bottom-[0.83rem] items-center ${
              isLoading && "bg-grey-900"
            }`}
            style={{ width: "34px", height: "34px" }}
          >
            {isLoading ? (
              <StopRoundedIcon
                sx={{ fontSize: "25px" }} // Adjust icon size
                className="text-grey-50"
              />
            ) : (
              <ArrowUpwardIcon
                sx={{ fontSize: "20px" }} // Adjust icon size
                className="text-grey-300" // Set icon color
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
