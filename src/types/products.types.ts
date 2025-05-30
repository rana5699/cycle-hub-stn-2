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

export type TUserPurchase ={
  allOrders: TOrder[];
  totalOrders: number;
}

export type TOrderResponse = {
  result: TOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// New Product
export enum BicycleCategory {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  BMX = "BMX",
  Electric = "Electric",
}

export type TProductVariant = {
  id: string;
  name: string;
  price: number;
  sku: string;
  inventory: number;
  attributes: {
    [key: string]: string;
  };
};

// export type TInventory = {
//   quantity: number;
//   // lowStockThreshold: number;
//   trackInventory: boolean;
// };

export type TSeo = {
  title: string;
  description: string;
  keywords: string;
};
export type TSpecifications = {
  [key: string]: string;
};

export type TBasicInfo = {
  name: string;
  description: string;
  price: number;
  brand: string;
  quantity: number;
  sku: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: "active" | "draft" | "archived";
};

export type TNewProduct = {
  _id?: string;
  id?: string;
  basicInfo: TBasicInfo;
  tags: string[];
  images: string[];
  specifications: TSpecifications;
  inStock: boolean;
  isDeleted: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrder = {
  _id: string;
  userId: string;
  address: TAddress;
  phoneNumber: string;
  products: TNewProduct[];
  orderIntent: "Confirmed" | "Rejected" | "Delivered" | "Pending";
  totalPrice: number;
  transactionInfo: TTransactionInfo;
  createdAt: string;
  updatedAt: string;
};
