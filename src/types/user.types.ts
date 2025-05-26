// export type TUser = {
//   key?: string;
//   _id: string;
//   name: string;
//   email: string;
//   role: "admin" | "user";

//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

type Role = "customer" | "admin" | "creator"; 

export type TUser = {
  createdAt: string;  
  email: string;
  isActive: boolean;
  name: string;
  role: Role;       
  updatedAt: string;  
  __v: number;
  _id: string;
};
