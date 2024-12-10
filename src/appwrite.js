
import { Client, Account } from "appwrite";

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('6757450200094ed1e789'); 

const account = new Account(client);

export { client, account };
