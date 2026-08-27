import conf from "../conf/conf";
import { Client, Databases,Query} from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client)
    }

    async createPost({title,content,featuredimage,status,userid,slug})
    {
        try {
             return await this.databases.createDocument({databaseId: conf.appWriteDatabaseId,collectionId: conf.appWriteCollectionId,documentId: slug,
             data: {
             "title": title,
             "content": content,
             "featuredimage":featuredimage,
             "status": status,
             "userid": userid
            }
        });

        } catch (error) {
            console.error("DatabaseService :: createPost :: error", error);
            throw error;
        }
    
    }

    async updatePost({title,content,featuredimage,status,userid,slug})
    {
         try {
            return await this.databases.updateDocument({databaseId: conf.appWriteDatabaseId,collectionId: conf.appWriteCollectionId,documentId: slug,
            data: {
                   "title": title,
                   "content": content,
                   "featuredimage":featuredimage,
                   "status": status,
                   "userid": userid
                  }   
         });
         } catch (error) {
            console.error("DatabaseService :: updatePost :: error", error);
            throw error;
         }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments({databaseId: conf.appWriteDatabaseId,collectionId: conf.appWriteCollectionId,
            queries: queries
            });
        } catch (error) {
            console.error("DatabaseService :: getAllPosts :: error", error);
            throw error;
        }
    }

    async getPost({slug}){
        try {
            return await this.databases.getDocument({databaseId: conf.appWriteDatabaseId,collectionId: conf.appWriteCollectionId,documentId: slug});
        } catch (error) {
            console.error("DatabaseService :: getPost :: error", error);
            throw error;
        }
    }

    async deletePost({slug}){
        try {
            return await this.databases.deleteDocument({databaseId: conf.appWriteDatabaseId,collectionId: conf.appWriteCollectionId,documentId: slug});
        } catch (error) {
            console.error("DatabaseService :: deletePost :: error", error);
            throw error;
        }
    }

}

const db = new DatabaseService();

export default db;