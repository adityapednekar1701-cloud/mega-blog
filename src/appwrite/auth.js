import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client(); 
    account; 
    constructor(){
        this.client.setProject(conf.appWriteProjectId).setEndpoint(conf.appWriteUrl);
        this.account = new Account(this.client);
    }

    async createAccount({email,name,password})
    {
        try {
             const userAccount = await this.account.create({userId: ID.unique(),email: email,password: password,name: name});
             if(userAccount){
                return this.login({email,password})
             }else
             {
               return userAccount;
             }  
            } catch (error){
              console.error("AuthService :: createAccount :: error", error);
              throw error;
            }
    }

    async login({email,password}){
        try{
          return await this.account.createEmailPasswordSession({email: email,password: password});
        }
        catch(error)
        {
          console.error("AuthService ::login :: error", error);
          throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
           if (error.code === 401) {
            console.warn("AuthService :: getCurrentUser :: No active user session (User is a Guest).");
            return null; // Return null safely so Redux knows the user is logged out
        }
        
        // If it is a completely different error (like network down), log it and throw
        console.error("AuthService :: getCurrentUser :: Real system error", error);
        throw error;
      }
    }

    async logout(){
        try {
           await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            throw error;
        }
    }


}

const authService = new AuthService();

export default authService;