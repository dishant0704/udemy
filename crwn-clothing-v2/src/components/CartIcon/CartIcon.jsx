import { useDispatch, useSelector } from 'react-redux';

import {
    selectCartCount, 
    selectIsCartOpen
} from '../../store/cart/cartSelector';
import {setIsCartOpen} from '../../store/cart/cartAction.js';

import {ReactComponent as ShoppingIcon} from '../../assets/images/shopping-bag.svg';
//import { CartContext } from '../../context/CartContext';

import './CartIcon.scss'

const CartIcon = () => {
    //const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () =>{dispatch(setIsCartOpen(!isCartOpen));
    console.log("btn: "+isCartOpen);}
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )

}
export default CartIcon;