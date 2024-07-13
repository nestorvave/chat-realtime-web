"use server";

export async function loginAction(body: any) {
  const response = await fetch("http://localhost:4000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log(result);
  return result;
}
