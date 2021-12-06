importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
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
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.image
    };
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
