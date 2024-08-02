import { Fragment } from 'react';
import { Outlet} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/CartIcon/CartIcon';
import CartDropdown from '../../components/CartDropdown/CartDropdown';

//import { UserContext } from '../../context/UserContext';
//import {CartContext} from '../../context/CartContext'
import { selectIsCartOpen } from '../../store/cart/cartSelector';
import{selectCurrentUser} from '../../store/user/userSelector'

import { ReactComponent as CrwnLogo } from '../../assets/images/crown.svg';
//import {signOutUser } from '../../utils/firebase/firebase';
import { signOutStart } from '../../store/user/userAction';

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigationStyle';

const Navigation = () =>{
    const dispatch = useDispatch()

    const currentUser = useSelector((state)=> state.user.currentUser)   
    const isCartOpen = useSelector(selectIsCartOpen) 

    const signOutUser = () => dispatch(signOutStart())

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>                
                <NavLinks>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                   
                    {
                        currentUser? (
                        <NavLink as='span' onClick={signOutUser}>                        
                        Sign Out
                        </NavLink>
                    ) :(
                        <NavLink to='/auth'>
                            Sign In
                        </NavLink>
                    )

                    }
                    <CartIcon />                    
                </NavLinks>
                {isCartOpen && <CartDropdown />}                      
            </NavigationContainer>
            <Outlet />            
        </Fragment>
    )
}

export default Navigation