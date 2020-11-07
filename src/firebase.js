import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCixU6j6kIWI6vkALZz5Gfs2FJYdgNvEvs",
    authDomain: "disrope.firebaseapp.com",
    databaseURL: "https://disrope.firebaseio.com",
    projectId: "disrope",
    storageBucket: "disrope.appspot.com",
    messagingSenderId: "1022403743298",
    appId: "1:1022403743298:web:84d090afd0a87620fae7db",
    measurementId: "G-JFRS5G5HFC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();


