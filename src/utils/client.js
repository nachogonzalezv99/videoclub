import { QueryClient } from "@tanstack/react-query";
import * as auth from "./auth-provider";

const queryClient = new QueryClient();

const apiURL = process.env.REACT_APP_API_URL;

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      queryClient.clear();
      window.location.assign(window.location);
      return Promise.reject({ message: "Please re-authenticate" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
