import { post_handle } from "$lib/api";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, url }) {
  let storedId = cookies.get("sessionid");
  let track = url.searchParams.get("track");
  if (track === null || track === "") {
    let message =
      "The record request was added. Please place your new record on your plattenspieler to complete the process.";
    let success = url.searchParams.get("success");
    if (success !== undefined && !success)
      message = "Have you entered the correct track id/link?";
    return {
      success:
        url.searchParams.get("success") !== undefined ? success : undefined,
      successm: message,
    };
  }

  let record = await post_handle(
    storedId,
    "/content/create",
    JSON.stringify({
      track: track,
    }),
  ).then((response) => {
    return response.status < 300;
  });

  redirect(303, "/record/add?success=" + record);
  return { success: record };
}
