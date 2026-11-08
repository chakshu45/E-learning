const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchData = async (endpoint: string, options: RequestInit = {}) => {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("sky_user");
      token = stored ? JSON.parse(stored)?.token : null;
    } catch {
      token = null;
    }
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  // Ensure clean URL joining
  const cleanBase = API_BASE.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${cleanBase}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || "Invalid response from server" };
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("sky_user");
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login";
      }
    }
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
