import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Set your Appwrite endpoint
  .setProject("6757450200094ed1e789"); // Set your project ID

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
