import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countrySlice';


const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;
