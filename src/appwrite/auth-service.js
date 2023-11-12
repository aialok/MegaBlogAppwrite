import envConfig from "../config/config";

import { Client, Account, ID } from "appwrite";

 console.log("Appwrite Url", envConfig.VITE_APPWRITE_URL)
 console.log("Appwrite Project Id",envConfig.VITE_APPWRITE_PROJECT_ID)

class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(envConfig.VITE_APPWRITE_URL);
    this.client.setProject(envConfig.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Some method
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("There is some error in appwrite auth setvice");
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const response = await this.account.createEmailSession(email, password);

      return response;
    } catch (error) {
      console.log("There is error in login into the account", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("There is some error in appwrite auth setvice");
      throw error;
    }
  }

  async getUserSessions() {
    try {
      const response = await this.account.get();
      console.log(response)
      return response;
    } catch (error) {
      console.log("There is some error in appwrite auth setvice", error);
      // throw error;
    }
  }
}

const authServices = new AuthServices();

export default authServices;
