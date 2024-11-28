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
  orderItems: [];
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

// dashboard

export type changeInPercent = {
  revenue: number;
  product: number;
  order: number;
  user: number;
};
export type countType = {
  revenue: number;
  products: number;
  users: number;
  orders: number;
};

export type orderChartType = {
  orderMonthsCount: number[];
  orderMonthsRevenue: number[];
};

export type StatsType = {
  changeInPercent: changeInPercent;
};
export type GenderType = {
  male: number;
  female: number;
};
export type modifiedLatestTransactionsType = {
  _id: string;
  discount: number;
  amount: number;
  qunatity: number;
  status?: "Processing" | "Shipped" | "Delivered";
};
export type StatsArrType = {
  changeInPercent: changeInPercent;
  stats: StatsType[];
  count: countType;
  chart: orderChartType;
  categoryCount: Record<string, number>[];
  gender: GenderType;
  modifiedLatestTransactions: modifiedLatestTransactionsType[];
};

export type ChartType = {
  orders: number[];
  products: number[];
  users: number[];
};

export type revenueSitType = {
  burnt: number;
  discount: number;
  marketingCost: number;
  netMargin: number;
  productCost: number;
};
export type stockAvailablityType = {
  inStock: number;
  outStock: number;
};
export type userAgeGroupType = {
  adult: number;
  old: number;
  teen: number;
};
export type userDistributionType = {
  adminUsers: number;
  customerUsers: number;
};
export type PieChartType = {
  Delivered: number;
  Processing: number;
  Shipped: number;
  productCategory: Record<string, number>[];
  revenueDistribution: revenueSitType;
  stockAvailablity: stockAvailablityType;
  userAgeGroup: userAgeGroupType;
  userDistribution: userDistributionType;
};

export type LineChartType = {
  discount: number[];
  products: number[];
  revenue: number[];
  users: number[];
};
