import { redirect } from "@sveltejs/kit";
import { get } from "$lib/api";

export async function load({ url, cookies }) {
  if (cookies.get("sessionid") === null) {
    redirect(307, "/login");
  }

  let accountInfo = await get(cookies.get("sessionid"), "/user/account");
  let successP = url.searchParams.get("success");
  let success = undefined;
  if (successP === "true") success = true;
  if (successP === "false") success = false;

  return {
    account: accountInfo,
    success: success,
  };
}
