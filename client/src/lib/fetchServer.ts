export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const AUTH_ENDPOINTS = ["login", "token", "authenticateUser"];

export async function fetchServer(
  method: HttpMethod,
  body: any,
  endpoint: string,
  server: string,
  signal?: AbortSignal
): Promise<any> {
  const isAuthEndpoint = AUTH_ENDPOINTS.includes(endpoint);

  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
    }),
  };

  if (signal) {
    options.signal = signal;
  }

  try {
    let resp = await fetch(`${server.replace(/\/$/, "")}/${endpoint}`, options);

    if ((resp.status === 401 || resp.status === 403) && !isAuthEndpoint) {
      try {
        const tokenResp = await fetch(`${server.replace(/\/$/, "")}/token`, {
          method: "POST",
          credentials: "include",
        });

        if (!tokenResp.ok) {
          throw new Error("Token refresh failed");
        }

        resp = await fetch(`${server.replace(/\/$/, "")}/${endpoint}`, options);
        if (resp.status === 401) {
          throw new Error("Session expired after token refresh");
        }
      } catch (error) {
        console.error("Session expired or refresh failed:", error);
        window.localStorage.removeItem("sessn-cmp");
        window.localStorage.removeItem("sess-recg-id");
        window.localStorage.removeItem("idt-curr-usr");
        window.localStorage.removeItem("sessn-id");

        if (!window.location.pathname.includes("/login")) {
          const redirectUrl = window.location.pathname + window.location.search;
          window.localStorage.setItem(
            "lgt-mess",
            "Your session has expired. Please log in again."
          );
          window.localStorage.setItem("redirectAfterLogin", redirectUrl);
          window.history.replaceState(null, "", "/login");
          window.dispatchEvent(new Event("popstate"));
        }

        return { err: true, mess: "Session expired. Please log in again." };
      }
    }

    const data = await resp.json();
    return { err: false, ...data };
  } catch (error: any) {
    if (error?.name === "AbortError") {
      return { err: true, mess: "Request aborted" };
    }
    if (error?.name === "Forbidden") {
      return { err: true, mess: "Forbidden, No Token Found" };
    }
    if (error?.name === "Unauthorized") {
      return { err: true, mess: "Unauthorized" };
    }
    console.log("Error Details:", error);
    return {
      err: true,
      mess: "Could not connect to server. Please check your internet connection",
    };
  }
}
