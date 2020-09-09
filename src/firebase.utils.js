import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyC8HU14TzLXCJ1zCioPSM64oSJqpNxWNF4",
  authDomain: "spotify-app-7d164.firebaseapp.com",
  databaseURL: "https://spotify-app-7d164.firebaseio.com",
  projectId: "spotify-app-7d164",
  storageBucket: "spotify-app-7d164.appspot.com",
  messagingSenderId: "898279202982",
  appId: "1:898279202982:web:85a0cee7aa60604ee35467"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;