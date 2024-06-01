import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["XSRF-Token"] = Cookies.get("csrf_token");
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) {
    const error = await res.json();
    throw new Error(error);
  }

  return res;
}

export function restoreCSRF() {
  return csrfFetch("/api/auth/csrf/restore");
}
