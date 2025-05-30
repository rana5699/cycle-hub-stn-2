
type Role = "customer" | "admin"; 

export type TUser = {
  createdAt: string;  
  email: string;
  isActive: boolean;
  name: string;
  role: Role;       
  updatedAt: string;  
  _id: string;
};

export type TUserResponse = {
  result : TUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
};
