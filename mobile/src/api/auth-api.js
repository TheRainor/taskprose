import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig.extra;

// User register
export async function registerApi(payload) {
  const res = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// User login
export async function loginApi(payload) {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// User logout
export async function logoutApi(accessToken, refreshToken, platform) {
  const res = await fetch(`${BASE_URL}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
    body: JSON.stringify({ refreshToken, platform }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Access token control
export async function checkAccessApi(accessToken) {
  const res = await fetch(`${BASE_URL}/api/check-access`, {
    method: "POST",
    headers: {"Authorization": `Bearer ${accessToken}`},
  });
  if (!res.ok) return await res.json();
  return res.json();
}

// Try refresh access token
export async function tryRefreshApi(refreshToken) {
  const res = await fetch(`${BASE_URL}/api/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}