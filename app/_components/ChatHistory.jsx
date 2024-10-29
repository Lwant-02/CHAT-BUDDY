"use client";
import React, { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { UseMainContext } from "@/context/MainContextProvider";
import HoverButton from "./HoverButton";
import Options from "./Options";
import ShareMessage from "./ShareMessage";
import { DeleteChat, GetChatsByUserId, UpdateTitle } from "@/lib/data-service";
import { useSession } from "next-auth/react";
import { message } from "antd";
import MiniSpinner from "./MiniSpinner";

export default function ChatHistory({ setShowSideBar }) {
  const { selectedChat, setSelectedChat, userChats, setUserChats } =
    UseMainContext();
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  //This is for fecth the user chat
  async function getChat() {
    try {
      setIsLoading(true);
      const res = await GetChatsByUserId(session?.user?.id);
      if (res) {
        setUserChats(res);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getChat();
  }, []);

  //This is for checking isSmallScreen and perform something
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 1366);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //This is for deleting chat
  async function handleDeleteChat(chatId) {
    try {
      const res = await DeleteChat(chatId);
      if (res) {
        const updateChat = userChats.filter((chat) => chat._id !== chatId);
        setUserChats(updateChat);
        if (selectedChat?._id === chatId) setSelectedChat(null);
      }
      message.success("Chat successfully deleted.");
    } catch (error) {
      message.error(error);
    }
  }

  //This is for edit title
  async function handleSaveEdit(chatId) {
    try {
      const res = await UpdateTitle({ chatId, newTitle });
      if (res) {
        setUserChats(
          userChats.map((chat) =>
            chat._id === chatId ? { ...chat, title: newTitle } : chat
          )
        );
        setEditingChatId(null);
      }
    } catch (error) {
      message.error(error);
    }
  }

  return (
    <div className="flex flex-col mt-7 h-[25rem] overflow-y-auto gap-1">
      <h1 className="text-md  p-1 text-grey-600">Your recent chats</h1>

      {/* Hers is for loading and show message */}
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <MiniSpinner size="large" />
        </div>
      )}

      {!isLoading && userChats.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <span className="text-grey-500 text-md">No chat found!</span>
        </div>
      )}

      {userChats
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((chat) => (
          <div
            className={`hover:bg-grey-100 pl-2 pr-2 rounded-md text-grey-500 items-center flex justify-between cursor-pointer text-sm ${
              selectedChat?._id === chat._id ? "bg-grey-100" : ""
            }`}
            key={chat._id}
            onClick={() => {
              setSelectedChat(chat);
              if (isSmallScreen) {
                setShowSideBar(false);
              }
            }}
          >
            {editingChatId === chat._id ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => handleSaveEdit(chat._id)}
                className="overflow-hidden whitespace-nowrap truncate bg-transparent w-full focus:outline-none"
                autoFocus
              />
            ) : (
              <span className="overflow-hidden whitespace-nowrap truncate">
                {chat.title}
              </span>
            )}
            <Options
              setOpenModal={setOpenModal}
              setShowSideBar={setShowSideBar}
              onDelete={handleDeleteChat}
              chatId={chat._id}
              onEdit={setEditingChatId}
              icon={
                <HoverButton
                  buttonIcon={<Ellipsis size={20} className="text-grey-500" />}
                  popoverContent="Options"
                  onClass="options"
                  onClick={(e) => e.stopPropagation()}
                />
              }
            />
            <ShareMessage
              open={openModal}
              messageToShare={selectedChat?.messages}
              setOpen={setOpenModal}
            />
          </div>
        ))}
    </div>
  );
}
