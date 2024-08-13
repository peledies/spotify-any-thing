import { createSlice } from '@reduxjs/toolkit';

interface NavigationStateType {
  showMenu: boolean;
  showPage: string;
}

const initialState: NavigationStateType = {
  showMenu: false,
  showPage: 'something',
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
  },
});

export const { openMenu, closeMenu, toggleMenu } = navigationSlice.actions;
export default navigationSlice.reducer;
