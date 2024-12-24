import { redirect } from "@sveltejs/kit";
import { post_handle, get } from "$lib/api";

export async function load({ params, cookies, url }) {
  let storedId = cookies.get("sessionid");
  let plattenspieler = await get(
    cookies.get("sessionid"),
    "/content/info?id=" + params.id,
  );

  let pid = params.id;
  let ssid = url.searchParams.get("ssid");
  let password = url.searchParams.get("password");
  if (
    (ssid === null || ssid === "") &&
    (password === null || password === "")
  ) {
    return {
      plattenspieler: plattenspieler,
      success: url.searchParams.get("success") === "true" ? true : undefined,
      successm: "Successfully set your new wifi credentials.",
    };
  }

  if (ssid === null || ssid === "" || password === null || password === "") {
    return { plattenspieler: plattenspieler, success: false };
  }

  let success = await post_handle(
    storedId,
    "/content/wifi",
    JSON.stringify({
      ssid: decodeURIComponent(ssid),
      password: decodeURIComponent(password),
      pid: pid,
    }),
  ).then((response) => {
    return response.status < 300;
  });
  if (success) redirect(303, "/plattenspieler/" + pid + "?success=true");
  return {
    plattenspieler: plattenspieler,
    success: false,
    successm: "Something went wrong when setting your new wifi credentials.",
  };
}
