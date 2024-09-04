export const main_url =
  process.env.NEXT_PUBLIC_NODE_ENV !== "production"
    ? "https://sbxapi.oshnigeria.org"
    : "https://api.oshnigeria.org";

// export const main_url = "https://api.oshnigeria.org";

export const cookies_id = "oshnigeria_state_cookies";
