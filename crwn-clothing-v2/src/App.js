import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route} from "react-router-dom";
import {getCurrentUser } from './utils/firebase/firebase'

import Home from "./routes/home/home";
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/checkout";
import { checkUserSession } from './store/user/userAction';

const App = () => {
    const dispatch = useDispatch();    
    //User
    useEffect(()=>{
        dispatch(checkUserSession())
       // getCurrentUser().then((user) =>console.log("user: ",user))
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
