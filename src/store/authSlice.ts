import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  isAuth: boolean;
  user: {
    login: string;
    password: string;
    rooms: [string];
  };
}
const initialState: IAuth = {
  isAuth: false,
  user: {
    login: "",
    password: "",
    rooms: [""],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authAction(state, action) {
      // state.isAuth = action.payload;
      state.user = action.payload;
      state.isAuth = true;
    },
    addRoom(state, action) {
      state.user.rooms.push(action.payload);
    },
  },
});

export const { authAction, addRoom } = authSlice.actions;
export default authSlice.reducer;
