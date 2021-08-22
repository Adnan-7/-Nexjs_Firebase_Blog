import firebase from 'firebase/app'
import  'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyC5CDcypa6s2nEuXIfGSzpa34a-GGQjneI",
    authDomain: "nextjsblog-b4445.firebaseapp.com",
    projectId: "nextjsblog-b4445",
    storageBucket: "nextjsblog-b4445.appspot.com",
    messagingSenderId: "506626868601",
    appId: "1:506626868601:web:8de11ec462a3a438af5ba8"
  };

  if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage()

  export {auth,db, storage}