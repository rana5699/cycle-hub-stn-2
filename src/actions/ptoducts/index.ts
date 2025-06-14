/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createProduct = async (product: any) => {
  const cookieStore = cookies();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...productData } = product;

  const res = await fetch(`${apiUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();

  revalidateTag("products");
  return data;
};

export const updateProduct = async (id: string, product: any) => {
  const cookieStore = cookies();

  console.log(product,"product from server");             

  const res = await fetch(`${apiUrl}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();


  revalidateTag("products");
  revalidateTag(`product-${id}`);
  return data;
};

export const deleteProduct = async (id: string) => {
  const cookieStore = cookies();

  const res = await fetch(`${apiUrl}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
  });
  const data = await res.json();

  revalidateTag("products");
  revalidateTag(`product-${id}`);
  return data;
};

export const getAllProducts = async () => {
  const res = await fetch(`${apiUrl}/products`, {
    next: { tags: ["products"] },
  });
  const data = await res.json();
  return data;
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${apiUrl}/products/${id}`, {
    next: { tags: [`product-${id}`] },
  });
  const data = await res.json();
  return data;
};
