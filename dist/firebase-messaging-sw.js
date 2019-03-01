importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-messaging.js');

var config = {
  authDomain: "propify-c0f15.firebaseapp.com",
  databaseURL: "https://propify-c0f15.firebaseio.com",
  projectId: "propify-c0f15",
  messagingSenderId: "508221299021"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();