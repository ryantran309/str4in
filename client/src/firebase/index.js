import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiof_eRL7BG0SQW1OafgTkUBUyCdo-qKg",
  authDomain: "users-avatar-upload.firebaseapp.com",
  projectId: "users-avatar-upload",
  storageBucket: "users-avatar-upload.appspot.com",
  messagingSenderId: "943575185733",
  appId: "1:943575185733:web:7735c7c85a0df460d0e62c",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
