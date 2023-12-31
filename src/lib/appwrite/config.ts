import { appwriteConfig } from "@/conf/conf";
import { Client, Account } from "appwrite";

 
export const client = new Client()

client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject("65917109b86cee227df4");

console.log(appwriteConfig.appwriteUrl);
console.log(appwriteConfig.projectId);

export const account = new Account(client);















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

