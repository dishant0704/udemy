import { screen, fireEvent } from "@testing-library/react";

import { renderWithProvider } from "../../../utils/test.utils";

import ProductCard from "../product-card.component";
import { CartItems } from "../../cart-dropdown/cart-dropdown.styles";


describe('Product card tests',()=>{

    test('It should add product items when prdoct card button is click', async()=>{
        
        const mockupProduct = {
            id: 1,
            imageUrl: 'Product_1',
            name: 'Product 1',
            price: 10,
        }

    const{store} = renderWithProvider(
    <ProductCard product={mockupProduct} />,
        { 
            preloadedState: { 
                cart:{
                    cartItems: [],
                }
            } 
        });
           const addToCartButtonEliment = screen.getByText(/add to cart/i) 
           await fireEvent.click(addToCartButtonEliment)

           expect(store.getState().cart.cartItems.length).toBe(1);
       
    })
})
