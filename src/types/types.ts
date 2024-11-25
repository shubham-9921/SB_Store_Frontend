export type UserType = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
};

export type ProductType = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};

export type CartItemsType = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
  stock: number;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type OrderItemType = Omit<CartItemsType, "stock"> & {
  _id: string;
};

export type OrderType = {
  orderItems: any;
  orderItem: OrderItemType[];
  shippingInfo: ShippingInfoType;
  subtotal: number;
  tax: number;
  total: number;
  shippingCharges: number;
  discount: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};
