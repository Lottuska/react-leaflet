import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../features/favourites';

export default configureStore({
  reducer: {
    favourites: favouritesReducer
  }
})