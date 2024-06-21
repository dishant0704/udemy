import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
//import logger from "redux-logger";
import { loggerMiddleware } from "./Middleware/logger";

import {RootReducer} from './rootReducer'

 const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
 }

const persistedReducer = persistReducer(persistConfig, RootReducer)

const Middlewares = [process.env.NODE_ENV !== 'production' && loggerMiddleware].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...Middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

