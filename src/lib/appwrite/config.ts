
import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    url: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    storageId: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    savesCollectionId: String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID),
    postsCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    usersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
}

export const client = new Client()

client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject("65917109b86cee227df4");

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);















// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAZaDD4CrL0AxMV3bzjTL41wiP4-ZOO84o",
//   authDomain: "dhoothika-a2bc8.firebaseapp.com",
//   projectId: "dhoothika-a2bc8",
//   storageBucket: "dhoothika-a2bc8.appspot.com",
//   messagingSenderId: "597450703904",
//   appId: "1:597450703904:web:35822d2c59464ebaad6845",
//   measurementId: "G-5G3VBH3819"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

