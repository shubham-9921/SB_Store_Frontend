import { createSlice } from "@reduxjs/toolkit";
import { UserInitialReducer } from "../../types/reducerTypes";

const initialState: UserInitialReducer = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userNotExist: (state) => {
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
