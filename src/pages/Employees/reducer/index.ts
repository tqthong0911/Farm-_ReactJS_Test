import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteEmployeeByIdAsync,
  deleteEmployeeByIdAsyncBuilder,
} from "./deleteEmployeeById";
import { getEmployeesAsync, getEmployeesAsyncBuilder } from "./getEmployees";
import {
  submitEmployeeAsync,
  submitEmployeeAsyncBuilder,
} from "./submitEmployee";
import { DataView } from "../types";

export interface States {
  value?: DataView[];
  loading?: boolean;
  error?: boolean;
  modalAdd?: {
    isOpen?: boolean;
    values?: DataView;
    loading?: boolean;
  };
}

const initialState: States = {};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setOpenModalAdd: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        modalAdd: {
          ...state.modalAdd,
          isOpen: action.payload,
        },
      };
    },
    setModalValues: (state, action: PayloadAction<DataView>) => {
      return {
        ...state,
        modalAdd: {
          ...state.modalAdd,
          values: action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    deleteEmployeeByIdAsyncBuilder(builder);
    getEmployeesAsyncBuilder(builder);
    submitEmployeeAsyncBuilder(builder);
  },
});

export const actions = {
  ...employeesSlice.actions,
  submitEmployeeAsync,
  getEmployeesAsync,
  deleteEmployeeByIdAsync,
};

export default employeesSlice.reducer;
