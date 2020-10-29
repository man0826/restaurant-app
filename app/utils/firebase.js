import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCyOEB5uWchAEkiNSbwE1ojUurblxFW_8s",
  authDomain: "restaurants-app-85d2f.firebaseapp.com",
  databaseURL: "https://restaurants-app-85d2f.firebaseio.com",
  projectId: "restaurants-app-85d2f",
  storageBucket: "restaurants-app-85d2f.appspot.com",
  messagingSenderId: "342656192050",
  appId: "1:342656192050:web:e978d59417ccac8c2ef62b",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
