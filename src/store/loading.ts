import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface LoadingState {
  value: boolean;
}
const initialState: LoadingState = {
  value: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingStart: state => {
      state.value = false;
    },
    loadingComplete: state => {
      state.value = true;
    },
  },
});

export const { loadingStart, loadingComplete } = loadingSlice.actions;

export const loadingStatus = (state: RootState) => state.loading.value;

export default loadingSlice.reducer;
