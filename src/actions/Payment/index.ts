/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPaymentIntent = async (data: any) => {
  const res = await fetch(`${apiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
