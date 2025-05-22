import { DecodedToken, decodeToken } from "./decodeToken";

// Define the expected structure of the token

export const getActiveUser = (): DecodedToken | null => {
  try {
     if (typeof window === "undefined") return null; 
    const cookieString = document.cookie;
    const token = getCookieValue("accessToken", cookieString);
    if (!token) return null;

    const decoded = decodeToken(token);

    return decoded;
  } catch (error) {
    console.error("Invalid or malformed token:", error);
    return null;
  }
};

const getCookieValue = (name: string, cookieStr: string): string | null => {
  const match = cookieStr.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};
