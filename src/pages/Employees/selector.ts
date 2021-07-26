import { RootState } from "../../app/store";

export const selectEmployees = (state: RootState) => state.employees.value;
export const selectLoading = (state: RootState) => state.employees.loading;
export const selectError = (state: RootState) => state.employees.error;
