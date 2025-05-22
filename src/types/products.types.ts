export type TProduct = {
  key?: string;
  _id?: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  imageUrl: string;
  description: string;
  quantity: number;
  rating: number;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TUpdateProduct = {
  name?: string;
  brand?: string;
  price?: number;
  type?: string;
  imageUrl?: string;
  description?: string;
  quantity?: number;
  rating?: number;
  inStock?: boolean;
};

export type TTransactionInfo = {
  transactionId: string;
  paymentStatus: string;
  paymentDate: string;
  paymentMethod: string;
};

export type TAddress = {
  city: string;
  country: string;
};

export type TOrder = {
  _id: string;
  userId: string;
  address: TAddress;
  phoneNumber: string;
  products: TProduct[];
  totalPrice: number;
  transactionInfo: TTransactionInfo;
  createdAt: string;
  updatedAt: string;
};

export type TOrderResponse = {
  allOrders: TOrder[];
  totalCost: number;
};
