import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigation';

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
