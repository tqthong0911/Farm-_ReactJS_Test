import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { batch } from "react-redux";
import { actions } from "../../../common/Toast/reducer";
import { deleteEmployeeById } from "../api";
import { DataView } from "../types";
import { getEmployeesAsync } from "./getEmployees";
import { States } from ".";

export const deleteEmployeeByIdAsync: AsyncThunk<
  AxiosResponse<any>,
  { data: DataView },
  {}
> = createAsyncThunk(
  "employee/deleteEmployeeById",
  async ({ data }, thunkApi) => {
    const { dispatch } = thunkApi;
    const { id, name } = data;
    let response: any;
    try {
      response = await deleteEmployeeById(id!);
      batch(() => {
        dispatch(
          actions.setArgs({
            isOpen: true,
            type: "success",
            message: `Delete ${name} successfully.`,
          })
        );

        dispatch(getEmployeesAsync());
      });
    } catch (error) {
      dispatch(
        actions.setArgs({
          isOpen: true,
          type: "error",
          message: `Cannot delete ${name}.`,
        })
      );
    }

    return response;
  }
);

export const deleteEmployeeByIdAsyncBuilder = (
  builder: ActionReducerMapBuilder<States>
) => {
  builder
    .addCase(deleteEmployeeByIdAsync.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteEmployeeByIdAsync.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
      };
    })
    .addCase(deleteEmployeeByIdAsync.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
};
