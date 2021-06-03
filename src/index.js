import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5wiMQ0eATSPkPDLVP5SB3waOMU8a7jQ4",
  authDomain: "cart-57f6b.firebaseapp.com",
  projectId: "cart-57f6b",
  storageBucket: "cart-57f6b.appspot.com",
  messagingSenderId: "789282744057",
  appId: "1:789282744057:web:416f64ba3ce6e96e122428",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
