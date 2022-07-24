import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';

export const rootReducer = combineReducers({
  // add reducers here
  cart: cartReducer,
  products: productReducer,
  auth: authReducer,
});
