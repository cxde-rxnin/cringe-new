
import { Client, Account, Databases } from "appwrite";

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6757450200094ed1e789'); 

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
