// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC4Up69I3x8UhAbUSYp0HXGWULCQohXzG4",
  authDomain: "covid-19-dashboard-b93a3.firebaseapp.com",
  databaseURL: "https://covid-19-dashboard-b93a3.firebaseio.com",
  projectId: "covid-19-dashboard-b93a3",
  storageBucket: "covid-19-dashboard-b93a3.appspot.com",
  messagingSenderId: "209223347001",
  appId: "1:209223347001:web:0a1227bc47682fe88456e8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;
