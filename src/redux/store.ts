import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";

// export const server = import.meta.env.VITE_SERVER;

const store = configureStore({
  reducer: {
    userApi: userAPI.reducer,
  },

  middleware: (mid) => [...mid(), userAPI.middleware],
});

export default store;
