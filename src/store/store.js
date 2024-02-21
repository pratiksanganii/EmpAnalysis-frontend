// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import empReducer from './employeeSlice';

const store = configureStore({
  reducer: { user: userReducer, emp: empReducer },
});

export default store;
