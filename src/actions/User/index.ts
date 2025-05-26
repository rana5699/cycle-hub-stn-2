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

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const result = await res.json();

//   console.log(result," User Profile");

  return result;
};
