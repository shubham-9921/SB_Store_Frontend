import { CartItemsType, ShippingInfoType, UserType } from "./types";

export interface UserInitialReducer {
  user: UserType | null;
  loading: boolean;
}

export interface CartInitialReducer {
  loading: boolean;
  cartItems: CartItemsType[];
  subtotal: number;
  tax: number;
  total: number;
  shippingCharges: number;
  shippingInfo: ShippingInfoType;
  discount: number;
  // stock: number;
}
