export const main_url =
  process.env.NODE_ENV === "production"
    ? "https://api.oshnigeria.org"
    : "https://sbxapi.oshnigeria.org";

export const cookies_id = "oshnigeria_state_cookies";
