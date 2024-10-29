"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { message } from "antd";
import HoverButton from "./HoverButton";
import CheckIcon from "@mui/icons-material/Check";
import ShareMessage from "./ShareMessage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";
import bg from "@/public/icon.svg";
import Image from "next/image";

export default function ChatBotResponse({ message: { content }, onNewWord }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [copyText, setCopyText] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [openShareModal, setOpenShareModal] = useState(false);

  //For hanlde the response word by word
  useEffect(() => {
    const words = content.split(" ");
    if (wordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + (prev && " ") + words[wordIndex]);
        setWordIndex(wordIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [wordIndex, content, onNewWord]);

  //For copy message
  function onCopy(content) {
    try {
      navigator.clipboard.writeText(content);
      message.success("Message successfully copy.");
      setCopyText(content);
    } catch (error) {
      message.error("Failed to copy.");
    }
  }

  return (
    <div className="flex gap-3">
      <Image
        src={bg}
        alt="Chat Bot"
        className="w-[30px] h-[30px] border border-gray-300 bg-grey-300 p-1 rounded-full"
      />

      <div className="flex-1 flex flex-col ">
        {/* This is react-markdown and you can go to see dou in Google */}
        <ReactMarkdown
          components={{
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={solarizedDarkAtom}
                  wrapLongLines={true}
                  wrapLines={true}
                  lineProps={{
                    style: {
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    },
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} whitespace-pre-wrap`}>
                  {children}
                </code>
              );
            },
          }}
        >
          {displayText}
        </ReactMarkdown>
        <div className="flex -ml-2 transition-all duration-300">
          <HoverButton
            buttonIcon={
              copyText ? (
                <CheckIcon
                  className="text-grey-500"
                  sx={{ fontSize: "17px !important" }}
                />
              ) : (
                <ContentCopyIcon
                  className=" text-grey-500"
                  sx={{ fontSize: "17px !important" }}
                />
              )
            }
            popoverContent={Boolean(copyText) ? "Done" : "Copy"}
            onClick={() => !copyText && onCopy(displayText)}
          />
          <HoverButton
            buttonIcon={
              <ShareIcon
                className=" text-grey-500"
                sx={{ fontSize: "17px !important" }}
              />
            }
            popoverContent="Share"
            onClick={() => {
              setShareMessage(content);
              setOpenShareModal(true);
            }}
          />
        </div>
      </div>
      {openShareModal && (
        <ShareMessage
          open={openShareModal}
          messageToShare={shareMessage}
          setOpen={setOpenShareModal}
        />
      )}
    </div>
  );
}
