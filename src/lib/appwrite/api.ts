import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user:INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
       
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrl,
            username: user.username
        })
        return newUser;
    }
    catch (error) {
        console.log(error)
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            "65923cebf1425ca1eb79",
            "6592401a120ab3fd366a",
            ID.unique(),
            user
        )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch(error) {
        console.log(error);
    }
    
}

export async function getCurrentUser() {
    try {
        const currentAccount = account.get();

        if (!currentAccount) throw Error;
        
        const currentUser = await databases.listDocuments(
            "65923cebf1425ca1eb79",
            "6592401a120ab3fd366a",
            [Query.equal('accountId', (await currentAccount).$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch(error) {
        console.log(error);
    }   
}

export async function createPost(post: INewPost) {
    try {
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error;

        const fileUrl = await getFilePreview(uploadedFile.$id);

        if(!fileUrl) {
            deleteFile(uploadedFile.$id)
            throw Error;
        }

        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        const newPost = await databases.createDocument(
            "65923cebf1425ca1eb79",
            "65923fe1c1d2162a26bb",
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if (!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error;
        }

        return newPost;

    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            '65923cb796209c51484f',
            ID.unique(),
            file
        )

        return uploadedFile
    } catch (error) {
        console.log(error);
    }
}

export async function getFilePreview(fileId: string) {
    try {
        const fileUrl = await storage.getFilePreview(
            '65923cb796209c51484f',
            fileId,
            2000,
            2000,
            "top",
            100
        )

        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile('65923cb796209c51484f', fileId);
        
        return { status: "ok"};
    } catch (error) {
        console.log(error);
    }
}











// console.log("URL: " + appwriteConfig.url);
// console.log("PROJECT ID: " + appwriteConfig.projectId);
// console.log("DATABASE ID: " + appwriteConfig.databaseId);
// console.log("STORAGE ID: " + appwriteConfig.storageId);
// console.log("USER ID: " + appwriteConfig.usersCollectionId);
// console.log("POST ID: " + appwriteConfig.postsCollectionId);
// console.log("SAVE ID: " + appwriteConfig.savesCollectionId);