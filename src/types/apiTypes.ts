import { User } from "firebase/auth";
import {
  CartItemsType,
  OrderType,
  ProductType,
  ShippingInfoType,
  StatsArrType,
  UserType,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
export type MessageresponceType = {
  success: boolean;
  message: string;
};

export type UserResponceType = {
  user: UserType;
};

export type ProductResponceType = {
  success: boolean;
  products: ProductType[];
};

export type CategoryResponceType = {
  success: boolean;
  category: string[];
};

export type SearchProducstResType = ProductResponceType & {
  totalPages: number;
};

export type SearchQueryType = {
  price: number;
  page: number;
  sort: string;
  category: string;
  search: string;
};

export type NewProductReqType = {
  id: string;
  formData: FormData;
};
export type UpdateProductReqType = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductReqType = {
  userId: string;
  productId: string;
};

export type ProductDetailsResponseType = {
  success: boolean;
  product: ProductType;
};

export type NewOrderType = {
  shippingInfo: ShippingInfoType;
  orderItems: CartItemsType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  user: string;
  total: number;
};

export type AllOrderResponseType = {
  success: boolean;
  order: OrderType[];
};
export type UpdateOrderResponseType = {
  userId: string;
  orderId: string;
};
export type DeleteOrderResponseType = {
  success: boolean;
  message: string;
};

export type OrderDetailResponseType = {
  success: boolean;
  order: OrderType;
};

export type AllUserResponseType = {
  success: boolean;
  users: User[];
};

export type DeleteUserReqType = {
  userId: string;
  id: string;
};

// dashboard

export type StatsResponseType = {
  success: boolean;
  stats: StatsArrType;
};
