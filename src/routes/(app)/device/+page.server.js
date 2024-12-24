import { redirect } from "@sveltejs/kit";
import { get, post_handle } from "$lib/api";

const backendBaseUrl = "https://plattenspieler-api.bjarn.ee/api";

export async function load({ cookies, url }) {
  let storedId = cookies.get("sessionid");
  if (storedId === null) {
    redirect(307, "/login");
  }

  let device = url.searchParams.get("device");
  if (device === null || device === "") {
    let devices = await get(
      cookies.get("sessionid"),
      "/user/account/devices",
      null,
    );

    return { devices: devices.devices, selected: devices.selected };
  }

  if (device === "any") device = "";
  let success = await post_handle(
    storedId,
    "/user/account/device",
    JSON.stringify({
      device: device,
    }),
  ).then((response) => {
    return response.status;
  });
  if (success) {
    redirect(303, "/?success=true");
  }
  return { devices: [], success: success, successm: "Something went wrong." };
}
