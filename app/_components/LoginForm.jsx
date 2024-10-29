"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Divider from "@mui/material/Divider";
import { message as messagePopUp } from "antd";
import MiniSpinner from "./MiniSpinner";

export default function LoginForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    const { email, password } = data;
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (result && !result?.error) {
        router.replace("/dashboard");
        reset();
        messagePopUp.success("Login success.");
      } else {
        messagePopUp.error(result.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitGoogle() {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.log("Something went wrong with login wiht google");
      messagePopUp.error("Something went wrong!");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#257180] h-screen">
      <div className="flex flex-col items-center bg-[#BCF2F6] w-[20rem] lg:w-[25rem] p-8 gap-5 rounded-md shadow-md">
        <span className="text-xl font-semibold capitalize">Welcome Back</span>
        <span className="text-sm font-bold capitalize text-gray-500">
          Welcome to L-0 chat
        </span>
        <button
          className="bg-[#08c2ff] hover:bg-[#3AD4FF] h-10 flex items-center p-2 gap-2 rounded-md shadow-md"
          onClick={handleSubmitGoogle}
        >
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span className="text-gray-50">Continue with Google</span>
        </button>
        <Divider className=" w-60 lg:w-80">or</Divider>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8 flex-col">
            <TextField
              type="email"
              label="Email"
              sx={{ width: { lg: "20rem", xs: "15rem" } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              size="small"
              placeholder="Email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please provide a valid email!",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              sx={{ width: { lg: "20rem", xs: "15rem" } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              size="small"
              placeholder="Password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at leat 8 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>
          <div className="flex justify-center flex-col items-center gap-1 mt-5">
            <button className="h-8 bg-[#08c2ff] hover:bg-[#3AD4FF] text-gray-50 p-2 items-center flex lg:w-40 w-32 justify-center rounded-md shadow-md">
              {isLoading ? <MiniSpinner size="small" /> : "Sing In"}
            </button>
            <span className="flex gap-1">
              <span className="text-sm">Don't have an account?</span>
              <Link href="/register" className="text-sm underline">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
