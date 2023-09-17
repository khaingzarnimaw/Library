import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwhyUiTsEs_g8fcLOp5DxHGozZ-CYKA-I",
    authDomain: "library-app-37918.firebaseapp.com",
    projectId: "library-app-37918",
    storageBucket: "library-app-37918.appspot.com",
    messagingSenderId: "706999839651",
    appId: "1:706999839651:web:8c9f1f5ea9d412a53d0816",
    measurementId: "G-3142EY28G4"
  };

  const app = initializeApp(firebaseConfig);

 let db = getFirestore(app);
 let auth = getAuth(app)
 let storage = getStorage(app)
 export {db,auth ,storage};