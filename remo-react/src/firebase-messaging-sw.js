importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");
console.log("Initiatilizing firebase from service worker");
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
