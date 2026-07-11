import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

// const sleep = (milSec: number): void =>{
//   var start = new Date().getTime();
//   for (var i=0; i< 1e7; i++){
//     if(new Date().getTime() - start > milSec){
//       break;
//     }
//   }
// }


const CartDropdown = () => {
  const [count, setCount] = useState(0)
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  
  // const hundredCount = useMemo(() =>{
  //   console.log("start")
  //   sleep(2000)
  //   console.log("end")
  //   return 100+ count
  // },[count])
  // const val = hundredCount
  // console.log(val)
  
  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  },[])

  return (
    <CartDropdownContainer>      
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
