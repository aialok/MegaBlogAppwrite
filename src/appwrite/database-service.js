import envConfig from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

class DatabaseServices {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(envConfig.VITE_APPWRITE_URL);
    this.client.setProject(envConfig.setProject);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, userId, slug, content, status, featuredImage }) {
    try {
      const post = await this.databases.createDocument(
        envConfig.VITE_APPWRITE_DATABASE_ID,
        envConfig.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          status,
          userId,
          featuredImage,
        }
      );

      return post;
    } catch (error) {
      console.log("There is error in creating the post", error);
    }
  }

  async updatePost(slug, data) {
    try {
      const response = await this.databases.updateDocument(
        envConfig.VITE_APPWRITE_DATABASE_ID,
        envConfig.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: data.featuredImage,
        }
      );
    } catch (error) {
      console.log("There is error in updating the post", error);
    }
  }

  async deletePost(slug) {
    try {
      const response = await this.databases.deleteDocument(
        envConfig.VITE_APPWRITE_DATABASE_ID,
        envConfig.VITE_APPWRITE_COLLECTION_ID,
        slug
      );

      return true;
    } catch (error) {
      console.log("There is error in deleting the post", error);
      return false;
    }
  }

  async getDocument(slug) {
    try {
      return await this.databases.getDocument(
        envConfig.VITE_APPWRITE_DATABASE_ID,
        envConfig.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("There is error in deleting the post", error);
      return false;
    }
  }

  async getPost(){
        try {
            return await this.databases.listDocuments(envConfig.VITE_APPWRITE_DATABASE_ID, envConfig.VITE_APPWRITE_COLLECTION_ID, [
                    Query.equals('status', 'active')
            ]);
        } catch (error) {
            console.log("There is error in getting the post", error);
        }

  }


  // file upload service

  async fileUpload(file) {
    try {
      return await this.bucket.createFile(
        envConfig.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("There is error in uploading the file", error);
    }
  }

  async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(envConfig.VITE_APPWRITE_BUCKET_ID, fileId);
        } catch (error) {
            
            console.log("There is error in deleting the file", error);

        }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      envConfig.VITE_APPWRITE_BUCKET_ID,
      fileId
    );
  }


}

const databaseServices = new DatabaseServices();

export default databaseServices;
