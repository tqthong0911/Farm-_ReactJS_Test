import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEmployees } from "../api";
import { mapDataToView } from "../helper";
import { States } from "./";
export const getEmployeesAsync = createAsyncThunk(
  "employee/getEmployee",
  async () => {
    const response = await fetchEmployees();
    return {
      ...response,
      data: mapDataToView(response.data),
    };
  }
);

export const getEmployeesAsyncBuilder = (
  builder: ActionReducerMapBuilder<States>
) => {
  builder
    .addCase(getEmployeesAsync.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getEmployeesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: false,
        value: action.payload.data,
      };
    })
    .addCase(getEmployeesAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    });
};
