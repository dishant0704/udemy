import { useState } from "react";
import FormInput from "../FormInput/FormInput"
import Button, {BUTTON_TYPE_CLASSES} from "../Button/Button";
import { useDispatch } from "react-redux";

import './SignInForm.scss'
import { googleSignInStart, emailSignInStart } from "../../store/user/userAction";

const defaultFormFields = {
    email: '',
    password:''}

const SignInForm= () =>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields
    
    const dispatch = useDispatch()

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () =>{
        dispatch(googleSignInStart())
        //await signInWithGooglePopup();        
        //const userDocRef = await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password))
            //await signInAuthUserWithEmailAndPassword(email, password)
            //setCurrentUser(user)            
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error)
            }
            if (error.code === 'auth/wrong-password') {

            } else {
                console.log('user creation encountered an error ', error)
            }
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };
    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with ypur email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email}/>

                <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">  
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm