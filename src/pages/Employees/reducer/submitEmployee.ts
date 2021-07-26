import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { States } from ".";
import { actions } from "../../../common/Toast/reducer";
import { MagicKeyValue } from "../../../type";
import { createEmployee, updateEmployeeById } from "../api";
import { mapDataToPost } from "../helper";
import { getEmployeesAsync } from "./getEmployees";

export const submitEmployeeAsync = createAsyncThunk(
  "employee/submitEmployee",
  async (data: MagicKeyValue, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const dataPost = mapDataToPost(data);

    let response;
    const isAdd = !dataPost.id;
    try {
      response = await (isAdd
        ? createEmployee(dataPost)
        : updateEmployeeById(dataPost));
      batch(() => {
        dispatch(
          actions.setArgs({
            isOpen: true,
            type: "success",
            message: `Add ${dataPost.name} successfully.`,
          })
        );

        dispatch(getEmployeesAsync());
      });
    } catch (error) {
      dispatch(
        actions.setArgs({
          isOpen: true,
          type: "error",
          message: `Cannot add ${dataPost.name}.`,
        })
      );
    }
    return response;
  }
);

export const submitEmployeeAsyncBuilder = (
  builder: ActionReducerMapBuilder<States>
) => {
  builder
    .addCase(submitEmployeeAsync.pending, (state) => {
      return {
        ...state,
        modalAdd: {
          ...state.modalAdd,
          loading: true,
        },
      };
    })
    .addCase(submitEmployeeAsync.fulfilled, (state, action) => {
      return {
        ...state,
        modalAdd: {
          ...state.modalAdd,
          isOpen: false,
          values: {},
          loading: false,
        },
      };
    })
    .addCase(submitEmployeeAsync.rejected, (state, action) => {
      return {
        ...state,
        modalAdd: {
          ...state.modalAdd,
          loading: false,
        },
      };
    });
};
