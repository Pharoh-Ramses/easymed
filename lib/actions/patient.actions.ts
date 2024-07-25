"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const documents = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return documents.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.error("An error occurred while getting a user:", error);
    }
}
