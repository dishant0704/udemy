//import { async } from "@firebase/util";
//import { signInwithGooglePopup, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.js";
import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import SignInForm from '../../components/SignInForm/SignInForm';
import './authentication.scss'
import { 
    auth,
    signInwithGooglePopup,
    signInwithGoogleRedirect, 
    creatUserDocumentFromAuth } from "../../utils/firebase/firebase";
const Authentication = () =>{
    useEffect(() => {
        async function syncSignIn() {
            const response = await getRedirectResult(auth)
            if (response) {
                const user = await signInwithGooglePopup();
                await creatUserDocumentFromAuth(user);
            }
        }

        syncSignIn();

    }, [])
    // const logGoogleRedirectUser = async () =>{
    //     const user = await signInwithGoogleRedirect();
    //     console.log(user)
    //     //const userDocRef = await creatUserDocumentFromAuth(user)
    // }

    return(
        <div className='authentication-container'>
            {/* <h1>Sign In Page</h1>            */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
};
export default Authentication