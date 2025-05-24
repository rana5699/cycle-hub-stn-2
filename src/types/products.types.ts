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



// New Product


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

export type TInventory = {
  quantity: number;
  lowStockThreshold: number;
  trackInventory: boolean;
};

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
  sku: string;
  barcode?: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: "active" | "draft" | "archived";
};

export type TNewProduct = {
  id?: string;
  basicInfo: TBasicInfo;
  tags: string[];
  images: string[];
  inventory: TInventory;
  specifications: TSpecifications;
  variants: TProductVariant[];
  seo: TSeo;
};
