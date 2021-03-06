import firebase from 'firebase/app'
import 'firebase/firestore'


 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCQq3H9HmTvMgiiFNf4d5hF2gY19QBH0j0",
    authDomain: "crud-firestore-react-62e09.firebaseapp.com",
    projectId: "crud-firestore-react-62e09",
    storageBucket: "crud-firestore-react-62e09.appspot.com",
    messagingSenderId: "508112656697",
    appId: "1:508112656697:web:b0f35322e18b16d0ef70e8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export  {firebase}