import { redirect } from "@sveltejs/kit";
import { post_handle } from "$lib/api";

export async function load({ cookies, url }) {
  let storedId = cookies.get("sessionid");
  let auth = url.searchParams.get("auth");
  if (auth === null || auth === "") return {};

  let success = await post_handle(
    storedId,
    "/content/register",
    JSON.stringify({
      auth: auth,
    }),
  ).then((response) => {
    if (response.status < 300) return true;
    else return response.text;
  });
  if (success) {
    redirect(303, "/plattenspieler?success=true");
  }
  return { success: false, successm: "Something went wrong: " + success };
}
