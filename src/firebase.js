import firebase from 'firebase/app';
 import 'firebase/messaging';

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

let messaging;

// we need to check if messaging is supported by the browser
if(firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}
messaging.requestPermission().then(()=>{
    return messaging.getToken();
  }).then(token_device=>{
    console.log( token_device)
  })
messaging.onMessage(async (payload) => {
    console.log('Message received. ', payload);
    // ...
  });

// if ('serviceWorker' in navigator) {
//     console.log("service");
//     window.addEventListener('load', async () => {
//         const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//             updateViaCache: 'none'
//         });
//         messaging.useServiceWorker(registration);
//     });
// }
// const receiveMessage=()=>{
//     const messaging = firebase.messaging();
//     // [START messaging_receive_message]
//     // Handle incoming messages. Called when:
//     // - a message is received while the app has focus
//     // - the user clicks on an app notification created by a service worker
//     //   `messaging.onBackgroundMessage` handler.
//     messaging.onMessage((payload) => {
//       console.log('Message received. ', payload);
//       // ...
//     });
//     // [END messaging_receive_message]
//   }
export {
    messaging,firebase
};