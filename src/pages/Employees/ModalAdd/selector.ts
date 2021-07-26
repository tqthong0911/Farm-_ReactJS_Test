import { RootState } from "../../../app/store";

export const selectIsOpen = (state: RootState) =>
  state.employees?.modalAdd?.isOpen;

export const selectInitValue = (state: RootState) =>
  state.employees?.modalAdd?.values;

export const selectIsLoading = (state: RootState) =>
  state.employees?.modalAdd?.loading;
