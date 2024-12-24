import { redirect } from "@sveltejs/kit";
import { get } from "$lib/api";

export async function load({ cookies }) {
  let accountInfo = await get(cookies.get("sessionid"), "/user/account");
  let plattenspieler = await get(cookies.get("sessionid"), "/content/info");

  return {
    account: accountInfo,
    plattenspieler: plattenspieler,
  };
}
