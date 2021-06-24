import firebase from 'firebase/app';
 import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyAHfiiQQsaz-jWPZWrsLsTpSKCUhytJF7k",
  authDomain: "apartment-management-8187f.firebaseapp.com",
  projectId: "apartment-management-8187f",
  storageBucket: "apartment-management-8187f.appspot.com",
  messagingSenderId: "687231716945",
  appId: "1:687231716945:web:7b3d5434e847f761ccf270",
  measurementId: "G-M99LY2ZW7V"
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
// messaging.onMessage(async (payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });

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