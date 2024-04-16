"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database";
//before the function, you need 'type' for 'user' object.
// since ts is not used, we dont' need the types

export async function createUser(user) {
  //user is object
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId, user) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    // return JSON.parse(JSON.stringify(updatedUser));
    // you stringify  mongoObject, then parse it to js object ??? useless
    // return mongoObject directly, bc itself is  a js object.
    return updateUser;
  } catch (error) {
    handleError(error);
  }
}
