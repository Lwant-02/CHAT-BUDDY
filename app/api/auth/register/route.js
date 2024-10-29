import { CreateNewUser, GetCurUser } from "@/lib/data-service";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log({ name, email, password });
    const existingUser = await GetCurUser(email);
    if (!existingUser) {
      await CreateNewUser({ name, email, password });
      return NextResponse.json(
        { message: "Registration successfull!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occur during registration user!" },
      { status: 500 }
    );
  }
}
