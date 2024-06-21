import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route} from "react-router-dom";
import {
    onAuthStateChangedListener, 
    creatUserDocumentFromAuth } from './utils/firebase/firebase'

import Home from "./routes/home/home";
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/checkout";
import {setCurrentUser} from './store/user/userAction';

const App = () => {
    const dispatch = useDispatch();    
    //User
    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user) =>{
            if(user){
                creatUserDocumentFromAuth(user)
            }
            dispatch(setCurrentUser(user));
        });
        return unsubcribe;
    },[]);

   return(
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='shop/*' element={<Shop />} />
            <Route path='auth' element={<Authentication />} />
            <Route path='checkout' element={<Checkout />} />
        </Route>
    </Routes>    
   )
}

export default App;
