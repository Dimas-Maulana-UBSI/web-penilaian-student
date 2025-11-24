import type { WebResponse } from "../types/response";
import type { Assignment } from "../types/assignment";

export async function GetAssignments(): Promise<WebResponse<Assignment[]>> {
  const url = "http://127.0.0.1:3000/assignments";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
