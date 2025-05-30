/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// 1. Create an Order
export const postOrder = async (orderData: any) => {
  const res = await fetch(`${apiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  revalidateTag("user-orders");
  revalidateTag("all-orders");
  return data;
};

// 2. Verify Payment
export const verifyPayment = async () => {
  const res = await fetch(`${apiUrl}/verify`);
  const data = await res.json();
  return data;
};

// 3. Total Revenue (admin)
export const totalRevenue = async () => {
  const cookieStore = cookies();
  const res = await fetch(`${apiUrl}/orders/revenue`, {
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
  });

  const data = await res.json();
  return data;
};

// 4. Get All Orders (admin)
export const allOrders = async () => {
  const cookieStore = cookies();
  const res = await fetch(`${apiUrl}/all-orders`, {
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
    next: {
      tags: ["all-orders"],
    },
  });

  const data = await res.json();
  return data;
};

// 5. Get Orders for a User
export const getOrdersByUser = async (userId: string) => {
  const cookieStore = cookies();
  const res = await fetch(`${apiUrl}/orders/${userId}`, {
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
  });

  const data = await res.json();
  return data;
};

// 6. Confirm an Order (admin)
export const confirmOrder = async (id: string) => {
  const cookieStore = cookies();
  const res = await fetch(`${apiUrl}/order/${id}/confirm`, {
    method: "PUT",
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
  });

  const data = await res.json();
  revalidateTag("all-orders");

  return data;
};

// 7. Reject an Order (admin)
export const rejectOrder = async (id: string) => {
  const cookieStore = cookies();
  const res = await fetch(`${apiUrl}/order/${id}/reject`, {
    method: "PUT",
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
  });

  const data = await res.json();

   revalidateTag("all-orders");
  return data;
};
