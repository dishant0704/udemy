// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY4ymOxEBWlR8sLJ0As0VgFiDtKVRNUgY",
  authDomain: "crwn-clothing-db-fa60c.firebaseapp.com",
  projectId: "crwn-clothing-db-fa60c",
  storageBucket: "crwn-clothing-db-fa60c.appspot.com",
  messagingSenderId: "697471495933",
  appId: "1:697471495933:web:536d5cc39254a6a3101894"
};

// Initialize Firebase
//const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account'
});
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInwithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

// const getData = () async =>{
//     String userId = (await FirebaseAuth.instance.currentUser()).uid;
//     return Firestore.instance.collection('users').document(userId);
//   }

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    
    if(!userAuth) return;
    const user = userAuth.user
    const userId = user.uid
    const userDocRef = doc(db, 'users', userId)    
    
    
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){

        const {displayName, email} = user
        const creaedAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                creaedAt,
                ...additionalInformation
            });
        }catch(error){
            console.log('error crating the user', error.message)

        }
    }

    return userDocRef;
}