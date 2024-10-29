import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomePage from "@/app/_components/HomePage";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (session) redirect("/dashboard");

  return (
    <div>
      <HomePage />
    </div>
  );
}
