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
      console.log(action.payload);
      state.isAuth = true;
    },
  },
});

export const { authAction } = authSlice.actions;
export default authSlice.reducer;
