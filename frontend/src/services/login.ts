import type { WebResponse } from "../types/response";
import type { User } from "../types/user";

export async function loginUser(email: string, password: string): Promise<WebResponse<User>> {
  const url = "http://127.0.0.1:3000/login";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data)
  return data;
}
