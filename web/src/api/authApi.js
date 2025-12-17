// User register
export async function registerApi(payload) {
  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// User login
export async function loginApi(payload) {
  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// User logout
export async function logoutApi(platform, accessToken, refreshToken) {
  const res = await fetch("http://localhost:3000/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      platform,
      ...(refreshToken ? { refreshToken } : {}),
    }),
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Access token control
export async function checkAccessApi(accessToken) {
  const res = await fetch("http://localhost:3000/api/check-access", {
    method: "POST",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
  });

  if (!res.ok) return await res.json();
  return res.json();
}

// Try refresh access token
export async function tryRefreshApi(refreshToken) {
  const res = await fetch("http://localhost:3000/api/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ...(refreshToken ? { refreshToken } : {}),
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    return data;
  }
  const data = await res.json();
  return data;
}
