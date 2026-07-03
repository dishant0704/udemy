import { screen } from "@testing-library/react";
import { renderWithProvider } from "../../utils/test.utils";

import CartIcon from "./cart-icon.component";

describe('Cart icon test',()=>{
    test('User preload state to reander',()=>{
        const initialCartItem = [
            {id:1, name: 'test A', imgUrk: 'test', price: 10, quantity: 1},
            {id:2, name: 'test B', imgUrk: 'test', price: 20, quantity: 2}
        ]
        renderWithProvider(<CartIcon />, {
            preloadedState: { 
                cart: {
                    cartItems: initialCartItem
                } 
            }
        })

        const cartItemsEliment = screen.getByText('3');
        expect(cartItemsEliment).toBeInTheDocument();
    })

})