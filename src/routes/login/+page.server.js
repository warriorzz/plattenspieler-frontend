import { redirect } from "@sveltejs/kit";
import { get_handle } from "$lib/api";

export async function load({ cookies, url }) {
  let storedId = cookies.get("sessionid");
  let passedToken = url.searchParams.get("token");
  if (passedToken !== null) {
    storedId = passedToken;
  }

  if (storedId === null || storedId === "") {
    return {};
  }

  let accountInfo = await get_handle(storedId, "/user/account").then(
    (response) => {
      if (response.status >= 400) {
        cookies.set("sessionid", null, { path: "/" });
        return null;
      }
      return response.json();
    },
  );

  if (accountInfo !== null) {
    if (passedToken !== null) {
      cookies.set("sessionid", passedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    }
    redirect(303, "/");
  }

  return {};
}
