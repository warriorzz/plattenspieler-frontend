import { redirect } from "@sveltejs/kit";

const backendBaseUrl = "https://plattenspieler-api.bjarn.ee/api";

export async function get(
  sessionid: string,
  endpoint: string,
  is_json: boolean | null,
) {
  let data = await get_handle(sessionid, endpoint).then((response) => {
    if (response.status >= 400) {
      redirect(307, "/login");
    }
    if (is_json === false) return response.text();
    return response.json();
  });
  return data;
}

export async function get_handle(sessionId: string, endpoint: string) {
  return fetch(backendBaseUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionId,
    },
    method: "GET",
  });
}

export async function post_handle(
  sessionid: string,
  endpoint: string,
  body: BodyInit | null,
) {
  return fetch(backendBaseUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionid,
    },
    method: "POST",
    body: body,
  });
}

export async function post(
  sessionid: string,
  endpoint: string,
  is_json: boolean | null,
  body: BodyInit | null,
) {
  let data = await post_handle(sessionid, endpoint, body).then((response) => {
    if (response.status >= 400) {
      redirect(307, "/login");
    }
    if (is_json === false) return response.text();
    return response.json();
  });
  return data;
}
