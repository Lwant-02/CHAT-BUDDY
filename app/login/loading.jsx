import React from "react";
import Spinner from "../_components/Spinner";

export default function loading() {
  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
