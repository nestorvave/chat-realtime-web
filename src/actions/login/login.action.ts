"use server";

export async function loginAction(body: any) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!apiUrl) {
    throw new Error("API URL is not defined in environment variables");
  }
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}
