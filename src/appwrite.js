import { Client, Account, Databases } from "appwrite";

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint if needed
  .setProject("6757450200094ed1e789"); // Replace with your project ID

// Initialize services
const account = new Account(client);
const databases = new Databases(client);

// Export client and service instances
export { client, account, databases };
