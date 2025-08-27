
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCV_rUs7niBHA_vC0QXFIqDkFaD1oyCsCo",
  authDomain: "friendshub-2af50.firebaseapp.com",
  databaseURL: "https://friendshub-2af50-default-rtdb.firebaseio.com",
  projectId: "friendshub-2af50",
  storageBucket: "friendshub-2af50.firebasestorage.app",
  messagingSenderId: "646777082165",
  appId: "1:646777082165:web:8ebc8ebd9507f78133bc7c"
};


const app = initializeApp(firebaseConfig);

export default firebaseConfig