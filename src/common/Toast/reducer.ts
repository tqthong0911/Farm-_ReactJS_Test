import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgsProps } from "antd/lib/notification";

interface States extends ArgsProps {
  isOpen: boolean;
}

const initialState: States = {
  message: "",
  isOpen: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setArgs: (state, action: PayloadAction<States>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const actions = toastSlice.actions;

export default toastSlice.reducer;
