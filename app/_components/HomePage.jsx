import Link from "next/link";
import React from "react";
import Image from "next/image";
import bg from "@/public/bg.jpg";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full">
        <div className="ml-1 lg:ml-20 lg:w-[45rem] p-5 lg:p-10 mt-8">
          <h1 className="lg:text-4xl text-2xl uppercase font-black text-[#433878] mb-2 lg:mb-10">
            <strong>AI Chat Bot Service</strong>
          </h1>
          <p className="lg:text-lg text-md  text-gray-700 text-justify mb-2 lg:mb-10 ">
            Welcome to{" "}
            <strong>
              <span className="uppercase font-black text-[#FF6500]">
                CHAT-BUDDY
              </span>
            </strong>
            , your AI-powered companion designed to assist you in navigating
            tasks and answering questions with ease. Whether you're seeking
            quick information, personalized guidance, or just someone to talk
            to, CHAT-BUDDY is here to respond in real-time with smart,
            conversational replies. Tailored to adapt to your needs, CHAT-BUDDY
            is a versatile tool that makes interaction effortless, helping you
            stay productive while enhancing your overall experience.
          </p>

          <div className="mt-5 lg:mt-0 flex justify-center lg:justify-start">
            <Link
              href="/login"
              className="bg-sky-500 p-3 rounded-md text-gray-50 hover:bg-sky-600 font-bold text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center lg:mr-20 lg:flex-1 p-5">
          <div className="relative aspect-square w-full lg:w-auto">
            <Image
              src={bg}
              width={500}
              height={500}
              alt="Chat Bot"
              placeholder="blur"
              className="w-full lg:w-auto h-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
