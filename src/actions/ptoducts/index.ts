"use server";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllProducts = async () => {
  const res = await fetch(`${apiUrl}/products`);
  const data = await res.json();
  return data;
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${apiUrl}/products/${id}`);
  const data = await res.json();
  return data;
};        
