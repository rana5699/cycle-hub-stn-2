/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userRegister = async (data: any) => {
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const userLogin = async (data: any) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (result.success) {
    (await cookies()).set("accessToken", result?.data?.accessToken);
  }
  return result;
};

export const logoutUser = async () => {
  try {
    (await cookies()).delete("accessToken");
  } catch (error: any) {
    return Error(error);
  }
};
