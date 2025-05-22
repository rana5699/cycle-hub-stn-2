export type TUser = {
  key?: string;
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
