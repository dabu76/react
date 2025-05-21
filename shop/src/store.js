import { configureStore, createSlice } from "@reduxjs/toolkit";

import user from "./store2/userSlice";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});
let product = createSlice({
  name: "product",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, action) {
      const id = action.payload;
      const index = state.findIndex((item) => item.id === id);
      state[index].count++;
    },
    reservation(state, action) {
      state.push(action.payload);
    },
  },
});
export let { changeCount, reservation } = product.actions;
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    product: product.reducer,
  },
});
