import envConfig from "../config/config";

import { Client, Account, ID } from "appwrite";

const client = new Client();
const account = new Account();

class AuthServices {
  account;
  constructor() {
    client.setEndpoint(envConfig.VITE_APPWRITE_URL);
    client.setProject(envConfig.VITE_APPWRITE_PROJECT_ID);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await account.create(
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
      const response = await account.createEmailSession(email, password);

      return response;
    } catch (error) {
      console.log("There is error in login into the account", error);
    }
  }

  async logout() {
    try {
      await account.deleteSessions();
    } catch (error) {
      console.log("There is some error in appwrite auth setvice");
      throw error;
    }
  }

  async getUserSessions() {
    try {
      const response = await account.get();
      return response;
    } catch (error) {
      console.log("There is some error in appwrite auth setvice");
      throw error;
    }
  }
}

const authServices = new AuthServices();

export default authServices;
