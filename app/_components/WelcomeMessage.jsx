import { useSession } from "next-auth/react";
import DisplayTextEffect from "./DisplayTextEffect";
import { UseMainContext } from "@/context/MainContextProvider";

export default function WelcomeMessage() {
  const { userData } = UseMainContext();

  const header = `Hi, ${userData?.name ? userData.name : ""} 😊`;
  const firstText = "What can I help you today?";
  const secondText = "I am a helpfull AI assistance developed by Lwant";
  return (
    <div className="flex justify-center items-center h-[75vh]">
      <span className="flex flex-col items-center">
        <h1 className="text-grey-600 text-lg font-bold capitalize">
          <DisplayTextEffect text={header} />
        </h1>
        <h1 className="text-grey-600 text-md font-bold ">
          <DisplayTextEffect text={firstText} />
        </h1>
        <span className="text-grey-500 text-sm font-bold">
          <DisplayTextEffect text={secondText} />
        </span>
      </span>
    </div>
  );
}
