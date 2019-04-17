importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-messaging.js');

firebase.initializeApp({
  authDomain: "osiris-trading-push.firebaseapp.com",
  databaseURL: "https://osiris-trading-push.firebaseio.com",
  projectId: "osiris-trading-push",
  messagingSenderId: "833600745389"
});

const messaging = firebase.messaging();
