// Create list
export async function createListApi(listName, accessToken) {
  const res = await fetch("http://localhost:3000/api/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ listName }),
    credentials: "include",
  });
  if (!res.ok) return await res.json();
  return res.json();
}

// Get lists
export async function getListsApi(accessToken) {
  const res = await fetch("http://localhost:3000/api/lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Get list counts
export async function getListCountsApi(accessToken) {
  const res = await fetch("http://localhost:3000/api/lists/counts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Delete lists
export async function deleteListsApi(listId, accessToken) {
  const res = await fetch(`http://localhost:3000/api/delete/lists/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Create list tasks
export async function createListTaskApi(payload, listId, accessToken) {
  const res = await fetch(`http://localhost:3000/api/list/tasks?listId=${listId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) return await res.json();
  return res.json();
}

// Get list tasks
export async function getListTasksApi(listId, accessToken) {
  const res = await fetch(`http://localhost:3000/api/list/tasks?listId=${listId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}