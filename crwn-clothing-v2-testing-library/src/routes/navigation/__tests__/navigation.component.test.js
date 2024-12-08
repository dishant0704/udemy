import { screen, fireEvent } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test.utils";
import * as reactRedux from 'react-redux'

import Navigation from "../navigation.component";
import { signOutStart } from "../../../store/user/user.action";

describe('Navigation Test',()=>{
    test('It should be reander a sign in link and not sign out link if there is no currenetUser',()=>{
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user:{
                    currentUser: null
                }
            }
        })
        const signLinkEliment = screen.getByText(/sign in/i)
        expect(signLinkEliment).toBeInTheDocument();
        
        const signOutLinkElement = screen.queryByText(/sign out/i)
        expect(signOutLinkElement).toBeNull();
    })

    test('It should be reander a sign out link and not sign in link if there is no currenetUser', ()=>{
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        })
        const signLinkEliment = screen.queryByText(/sign in/i)
        expect(signLinkEliment).toBeNull();

        const signOutLinkElement = screen.getByText(/sign out/i)
        expect(signOutLinkElement).toBeInTheDocument();
    })

    test('It should not reander the cart dropdown if idCartOpen is false',()=>{
        renderWithProvider(<Navigation />, {
            preloadedState: {
                cart:{
                    isCartOpen: false,
                    cartItems: []
                }
            }
        })
        const cartDropdownElement = screen.queryByText(/your cart is empty/i)
        expect(cartDropdownElement).toBeNull();
    })

    test('It should reander the cart dropdown if idCartOpen is true',()=>{
        renderWithProvider(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        })
        const cartDropdownElement = screen.getByText(/your cart is empty/i)
        expect(cartDropdownElement).toBeInTheDocument();
    })

    test('it should dispatch signOutStart action when clicking on the Sign out link ', async ()=>{
        
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch)
        
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        });

        const signOutEliment = screen.getByText(/sign out/i)
        expect(signOutEliment).toBeInTheDocument();

        await fireEvent.click(signOutEliment);
        expect(mockDispatch).toHaveBeenCalled();

        const signOutAction = signOutStart();
        expect(mockDispatch).toHaveBeenCalledWith(signOutAction);

        mockDispatch.mockClear()

    })
})