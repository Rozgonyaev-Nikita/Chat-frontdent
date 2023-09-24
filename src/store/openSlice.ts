import { createSlice } from "@reduxjs/toolkit";

interface IOpen {
  isOpenUser: boolean;
}
const initialState: IOpen = {
  isOpenUser: false,
};

const openSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    openUserList(state) {
      state.isOpenUser = !state.isOpenUser;
    },
  },
});

export const { openUserList } = openSlice.actions;
export default openSlice.reducer;
