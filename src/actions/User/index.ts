"use server";

import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const myProfile = async () => {
  const cookieStore = cookies();

  const res = await fetch(`${apiUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: (await cookieStore).get("accessToken")?.value || "",
    },
    cache: "no-store",
  });

  const result = await res.json();

  return result;
};

export const getAllUsers = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value || "";

  const res = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
    cache: "no-store",
  });

  const result = await res.json();
  return result;
};

// export const updateUserStatus = async (id, updatedData) => {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("accessToken")?.value || "";

//   const res = await fetch(`${apiUrl}/users/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: JSON.stringify(updatedData),
//   });

//   const result = await res.json();
//   return result;
// };