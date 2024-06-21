import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
//import { UserProvider } from './context/UserContext';
//import { ProductsProvider } from './context/ProductsContext';
//import { CategoriesProvider } from './context/CategoriesContext';
//import { CartProvider } from './context/CartContext';
import { store, persistor } from './store/store';

import reportWebVitals from './reportWebVitals';

import './index.scss';

//import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    {/* <UserProvider> */}
                        {/* <ProductsProvider> */}
                        {/* <CategoriesProvider> */}
                            {/* <CartProvider> */}
                                <App />
                            {/* </CartProvider> */}
                        {/* </CategoriesProvider> */}
                        {/* </ProductsProvider>                 */}
                    {/* </UserProvider> */}
                </BrowserRouter>
            </PersistGate>            
        </Provider>
    </React.StrictMode>,
    rootElement
    //document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
