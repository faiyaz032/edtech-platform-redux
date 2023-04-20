import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
});
