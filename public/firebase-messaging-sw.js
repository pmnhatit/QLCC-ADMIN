importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyAhz-FnRZvOwHv8hNDzhhB2a54FHCg08YQ",
    authDomain: "qlcc-admin.firebaseapp.com",
    projectId: "qlcc-admin",
    storageBucket: "qlcc-admin.appspot.com",
    messagingSenderId: "870320054313",
    appId: "1:870320054313:web:da6f3be6e8ae7187877c38",
    measurementId: "G-WETER27L35"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

const msg = firebase.messaging()

msg.setBackgroundMessageHandler(function(payload) {
  let options = {
    body: payload.data.body,
    icon: payload.data.icon
  }

  return self.registration.showNotification(payload.data.title, options);

});