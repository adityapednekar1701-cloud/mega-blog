import conf from "../conf/conf";
import { Client, ID, Storage} from "appwrite";

export class StorageService{
    client = new Client();
    storage;

    constructor(){
         this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId);
         this.storage = new Storage(this.client);
    }

    async uploadFile({file})
    {
        try {
            return await this.storage.createFile({bucketId: conf.appWriteBucketId,fileId: ID.unique(),file: file});
        } catch (error) {
            console.error("StorageService :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile({fileId})
    {
        try {
            return await this.storage.deleteFile({bucketId: conf.appWriteBucketId,fileId: fileId});
        } catch (error) {
            console.error("StorageService :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview({fileId})
    {
        try {
            return this.storage.getFileView({bucketId: conf.appWriteBucketId,fileId: fileId});
        } catch (error) {
            console.error("StorageService :: getFilePreview :: error", error);
            throw error;
        }
    }
}

const bucket = new StorageService();

export default bucket;