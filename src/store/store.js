// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import empReducer from './employeeSlice';
import chartReducer from './chartSlice';

const store = configureStore({
  reducer: { user: userReducer, emp: empReducer, chart: chartReducer },
});

export default store;
