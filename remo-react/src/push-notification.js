import firebase from "firebase";
export const initializeFirebase = async () => {
  console.log("Initiatilizing firebase");
  firebase.initializeApp({
    apiKey: "AIzaSyA4t8sdJ4zbf61BtF5uvk3Y8li0P2vuh7U",
    authDomain: "brainplay-65283.firebaseapp.com",
    databaseURL: "https://brainplay-65283.firebaseio.com",
    projectId: "brainplay-65283",
    storageBucket: "brainplay-65283.appspot.com",
    messagingSenderId: "76446739900",
    appId: "1:76446739900:web:28c5cc69ebdf53fdb74fb9"
  });
  const messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(() => {
      console.log("Permission granted");
      return messaging.getToken();
    })
    .then(token => {
      console.log(token);
    })
    .catch(() => {
      console.log("Permission issues");
    });
};
