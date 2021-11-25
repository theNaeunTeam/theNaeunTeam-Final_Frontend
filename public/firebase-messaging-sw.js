// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//         .then(function(registration) {
//             console.log('Registration successful, scope is:', registration.scope);
//         }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//     });
// }

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCdDnZLLw2wo1KpixiGqQKXKKOES0pi1bU",
    authDomain: "final-d076c.firebaseapp.com",
    projectId: "final-d076c",
    storageBucket: "final-d076c.appspot.com",
    messagingSenderId: "416664792102",
    appId: "1:416664792102:web:2e7889a3e32d3b1654cae7",
    measurementId: "G-ZSXE97T7TD"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});