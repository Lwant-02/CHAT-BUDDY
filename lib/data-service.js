"use server";
import { connectMongooes } from "@/database-config/database";
import userModel from "@/models/user-model";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import ChatModel from "@/models/chat-model";
connectMongooes();

//Get Current user
export async function GetCurUser(email) {
  const data = await userModel.findOne({ email });
  return data;
}

//For creating new user
export async function CreateNewUser(data) {
  const { name, email, password } = data;
  let hashPassword = null;
  if (password) {
    const saltRound = 10;
    hashPassword = await bcrypt.hash(password, saltRound);
  }
  const userObj = {
    name: name,
    email: email,
    password: hashPassword,
    clerkUserId: data.clerkUserId || new Types.ObjectId(),
  };
  try {
    const existingUser = await GetCurUser(email);
    if (existingUser) {
      console.log("User already exists!");
    }
    const newUser = await userModel.create(userObj);
    const data = JSON.parse(JSON.stringify(newUser));
    return data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

//For creating new Chat
export async function CreateNewChats(payload) {
  try {
    const newChat = await ChatModel.create(payload);
    const data = JSON.parse(JSON.stringify(newChat));
    return data;
  } catch (error) {
    throw new Error(`Error creating chat: ${error.message}`);
  }
}

//For getting specific chat
export async function GetChatsByUserId(userId) {
  try {
    const res = await ChatModel.find({ user: userId });
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    throw new Error(`Error fetching certain chat: ${error.message}`);
  }
}

//For updating chat
export async function UpdateChats({ chatId = "", messages = [] }) {
  try {
    const res = await ChatModel.findByIdAndUpdate(
      chatId,
      { messages },
      { new: true }
    );
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    throw new Error(`Error updating chat: ${error.message}`);
  }
}

//For deleting chat
export async function DeleteChat(chatId) {
  try {
    const res = await ChatModel.findByIdAndDelete(chatId);
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    throw new Error(`Error deleting chat: ${error.message}`);
  }
}

//For editing title
export async function UpdateTitle({ chatId = "", newTitle = "" }) {
  try {
    const res = await ChatModel.findByIdAndUpdate(
      chatId,
      { title: newTitle },
      { new: true }
    );
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    throw new Error(`Error updating chat title: ${error.message}`);
  }
}

//For updating name and email
export async function UpdateName({ userId = "", name = "" }) {
  try {
    const res = await userModel.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true }
    );
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    throw new Error(`Error updating profile: ${error.message}`);
  }
}
