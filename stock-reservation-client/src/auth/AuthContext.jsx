import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const STORAGE_KEY = "stock_reservation_auth";
const CACHE_PREFIX = "stock_reservation_cache:";
const AuthContext = createContext(null);

function readJSON(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private/restricted browser modes.
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() =>
    readJSON(STORAGE_KEY, { user: null, token: null }) || { user: null, token: null }
  );
  const [booting, setBooting] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => writeJSON(STORAGE_KEY, auth), [auth]);

  const apiRequest = useCallback(async (path, options = {}) => {
    const method = (options.method || "GET").toUpperCase();
    const cacheKey = `${CACHE_PREFIX}${method}:${path}`;
    const headers = {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    };
    if (auth.token) headers.Authorization = `Bearer ${auth.token}`;

    let response;
    try {
      response = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch (error) {
      setOffline(true);
      if (method === "GET") {
        const cached = readJSON(cacheKey);
        if (cached) return { ...cached, offline: true };
      }
      throw new Error("The server is unavailable. Your saved local data is still available.");
    }

    const body = await response.json().catch(() => ({ message: "Unexpected server response" }));

    if (response.status === 401) {
      setAuth({ user: null, token: null });
      throw new Error(body.message || "Your session has expired. Please sign in again.");
    }

    if (!response.ok) throw new Error(body.message || "Request failed");

    setOffline(false);
    if (method === "GET") writeJSON(cacheKey, body);
    return body;
  }, [auth.token]);

  useEffect(() => {
    let active = true;

    (async () => {
      if (!auth.token) {
        if (active) setBooting(false);
        return;
      }

      try {
        const body = await apiRequest("/auth/me");
        if (active) setAuth((a) => ({ ...a, user: body.data.user }));
      } catch (error) {
        // Keep the locally stored session when the API is temporarily offline.
        if (error.message?.includes("server is unavailable")) {
          setOffline(true);
        } else if (active) {
          setAuth({ user: null, token: null });
        }
      } finally {
        if (active) setBooting(false);
      }
    })();

    return () => { active = false; };
  }, []); // intentionally runs once to restore the stored session

  async function login(payload) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      throw new Error("Unable to reach the server. Please make sure the backend is running.");
    });
    const body = await response.json().catch(() => ({ message: "Unexpected server response" }));
    if (!response.ok) throw new Error(body.message || "Login failed");
    setAuth(body.data);
    setOffline(false);
    return body.data;
  }

  async function register(payload) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      throw new Error("Unable to reach the server. Please make sure the backend is running.");
    });
    const body = await response.json().catch(() => ({ message: "Unexpected server response" }));
    if (!response.ok) throw new Error(body.message || "Registration failed");
    setAuth(body.data);
    setOffline(false);
    return body.data;
  }

  async function updateProfile(payload) {
    const body = await apiRequest("/auth/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    setAuth((a) => ({ ...a, user: body.data.user }));
    return body.data.user;
  }

  function logout() {
    setAuth({ user: null, token: null });
    setOffline(false);
  }

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token && auth.user),
      booting,
      offline,
      login,
      register,
      logout,
      updateProfile,
      apiRequest,
    }),
    [auth, booting, offline, apiRequest]
  );

  if (booting) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="card px-6 py-5 text-sm text-slate-600">Restoring your session…</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
