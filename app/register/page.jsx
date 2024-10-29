import { getServerSession } from "next-auth";
import React from "react";
import RegisterForm from "../_components/RegisterForm";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";

export default async function page() {
  const session = await getServerSession(authConfig);

  if (session) redirect("/dashboard");

  return <RegisterForm />;
}
