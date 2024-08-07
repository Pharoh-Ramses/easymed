"use server";

import { ID, Query, InputFile } from "node-appwrite";
import {
    BUCKET_ID,
    DATABASE_ID,
    databases,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    storage,
    users,
} from "../appwrite.config";
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
            user.name,
        );
    } catch (error: any) {
        // Check existing user
        if (error && error?.code === 409) {
            const documents = await users.list([Query.equal("email", [user.email])]);

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
        console.error("An error occurred while getting the user details:", error);
    }
};

export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserParams) => {
    try {
        let file;
        if (identificationDocument) {
            const inputFile = InputFile.fromBlob(
                identificationDocument?.get("blobFile") as Blob,
                identificationDocument?.get("fileName") as string,
            );
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...patient,
            },
        );
        return parseStringify(newPatient);
    } catch (error) {
        console.error("An error occurred while creating a patient:", error);
    }
};

export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal("userId", [userId])],
        );

        return parseStringify(patients.documents[0]);
    } catch (error) {
        console.error(
            "An error occurred while retrieving the patient details:",
            error,
        );
    }
};
