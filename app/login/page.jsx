import React from "react";
import LoginForm from "../_components/LoginForm";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authConfig);

  if (session) redirect("/dashboard");
  return <LoginForm />;
}
