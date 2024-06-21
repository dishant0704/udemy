// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth(firebaseApp);
export const signInwithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) =>{
    
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();
};

export const getCategoriesandDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map(docSnapShot => docSnapShot.data());
        
    // .reduce((acc, docSnapShot) => {
    //     const {title, items} = docSnapShot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // },{});

    //return categoryMap;
}

//export const addCollectionAndDocuments = (collectionKey)

// const getData = () async =>{
//     String userId = (await FirebaseAuth.instance.currentUser()).uid;
//     return Firestore.instance.collection('users').document(userId);
//   }

export const creatUserDocumentFromAuth = async (userAuth) => {
    
    const user = userAuth
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
                creaedAt
            });
        }catch(error){
            console.log('error crating the user', error.message)

        }
    }

    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)