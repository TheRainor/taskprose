// User register
export async function registerApi(payload) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// User login
export async function loginApi(payload) {
  console.log("api tetiklendi: ",payload);
  
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// User logout
export async function logoutApi(payload) {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Access token control
export async function checkAccessApi() {
  const res = await fetch("/api/check-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) return await res.json();
  return res.json();
}

// Try refresh access token
export async function tryRefreshApi() {
  const res = await fetch("/api/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}