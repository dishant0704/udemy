import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import { selectCartItems } from '../../store/cart/cartSelector';

import './CartDropdown.scss'

const CartDropdown = () => {
    //const {cartItems} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        
        navigate('/checkout');
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length?(
                    cartItems.map((item)=>(
                    <CartItem key={item.id} cartItem={item} />
                    ))
                ) :(
                    <span className='empty-message'>Your cart is Empty</span>
                )
                }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};
export default CartDropdown;