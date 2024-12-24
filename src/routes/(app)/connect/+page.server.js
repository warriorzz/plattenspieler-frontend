import { redirect } from "@sveltejs/kit";
import { post } from "$lib/api";

export async function load({ cookies }) {
  let redirectUrl = await post(
    cookies.get("sessionid"),
    "/user/account/connect",
    false,
    null,
  );
  redirect(303, redirectUrl);
  return {};
}
