import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationStateType {
  showMenu: boolean;
  currentPage: number;
}

const initialState: NavigationStateType = {
  showMenu: false,
  currentPage: 0,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.showMenu = true;
    },
    closeMenu: (state) => {
      state.showMenu = false;
    },
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
    setCurrentPage: (
      state,
      action: PayloadAction<NavigationStateType['currentPage']>
    ) => {
      state.currentPage = action.payload;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu, setCurrentPage } =
  navigationSlice.actions;
export default navigationSlice.reducer;
