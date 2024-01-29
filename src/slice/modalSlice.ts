import { createSlice } from "@reduxjs/toolkit";

export interface ModalStateType {
  isOpen: boolean;
}

const initialState: ModalStateType = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAndCloseModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openAndCloseModal } = modalSlice.actions;

export default modalSlice;
