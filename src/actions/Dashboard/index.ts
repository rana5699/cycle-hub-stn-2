"use server";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

import { cookies } from "next/headers";

export const getDashboardStats = async () => {
  const cookieStore = cookies();

  const res = await fetch(`${apiUrl}/dashboard`, {
    headers: {
      Authorization: ((await cookieStore).get("accessToken")?.value) || "",
    },
  });

  return res.json();
};

export const getDashboardChart = async () => {
  const res = await fetch(`${apiUrl}/dashboard/chart`);
  const data = await res.json();
  return data;
};
