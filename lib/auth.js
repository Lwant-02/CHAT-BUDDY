import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongooes } from "@/database-config/database";
import { GetCurUser } from "./data-service";
import userModel from "@/models/user-model";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Sign In",
      credentials: {},
      async authorize(credentials) {
        await connectMongooes();
        //Find user by email
        const curUser = await GetCurUser(credentials.email);
        if (curUser?.email !== credentials?.email) {
          throw new Error("No user found with this email!");
        }
        //Compare password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          curUser.password
        );
        if (isPasswordValid) {
          return {
            id: curUser._id,
            email: curUser.email,
            name: curUser.name,
          };
        }
        throw new Error("Password is incorrect!");
      },
    }),
  ],
  // Google sign-in callback
  callbacks: {
    async signIn({ user, account }) {
      try {
        const existingUser = await GetCurUser(user.email);
        if (!existingUser) {
          const userObj = {
            name: user.name,
            email: user.email,
            password: "Google",
            clerkUserId: account.providerAccountId || null,
          };
          await userModel.create(userObj);
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in", error);
        return false;
      }
    },
    async session({ session }) {
      const curUser = await GetCurUser(session.user.email);

      if (curUser) {
        session.user.id = curUser?._id;
        session.user.clerkUserId = curUser?.clerkUserId;
        session.user.name = curUser?.name;
        session.user.email = curUser?.email;
      } else {
        console.warn("No user found for email:", session.user.email);
      }

      return session;
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
};
