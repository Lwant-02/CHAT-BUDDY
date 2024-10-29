"use client";
import React, { useEffect, useRef } from "react";
import WelcomeMessage from "./WelcomeMessage";
import ChatBotResponse from "./ChatBotResponse";

export default function Messages({ messages }) {
  const messageRef = useRef(null);

  // Track whenever a new word is added in the chatbot response
  function handleNewWord() {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  //This is for welcome message if no message yet!
  if (messages.length === 0) return <WelcomeMessage />;

  return (
    <div
      className="mt-5 flex flex-col gap-5 text-sm lg:text-md h-[80vh] overflow-y-auto text-grey-700 lg:pl-20 lg:pr-20 md:pl-2 md:pr-2 p-1 "
      ref={messageRef}
    >
      {messages.map((m) => {
        if (m.role === "user") {
          return (
            <div className="flex justify-end items-center " key={m.id}>
              <span className="bg-grey-300 p-2 rounded-md text-grey-800 ">
                {m.content}
              </span>
            </div>
          );
        } else {
          return (
            <ChatBotResponse message={m} key={m.id} onNewWord={handleNewWord} />
          );
        }
      })}
    </div>
  );
}
