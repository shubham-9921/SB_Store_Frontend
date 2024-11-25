import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartInitialReducer } from "../../types/reducerTypes";
import { CartItemsType } from "../../types/types";

const initialState: CartInitialReducer = {
  loading: false,
  cartItems: [],
  shippingCharges: 0,
  tax: 0,
  discount: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  total: 0,
  subtotal: 0,
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemsType>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }

      state.loading = false;
    },
    removeFormCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
    },
    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.tax = Math.round(subtotal * 0.18);
      state.shippingCharges =
        state.subtotal > 1000 || state.subtotal === 0 ? 0 : 200;
      state.total =
        subtotal + state.shippingCharges + state.tax - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const { addToCart, removeFormCart, calculatePrice, discountApplied } =
  cartReducer.actions;
