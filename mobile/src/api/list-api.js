import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig.extra;

// Create list
export async function createListApi(listName, accessToken) {
  const res = await fetch(`${BASE_URL}/api/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
    body: JSON.stringify({ listName }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Get list
export async function getListsApi(accessToken) {
  const res = await fetch(`${BASE_URL}/api/lists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Get list counts
export async function getListCountsApi(accessToken) {
  const res = await fetch(`${BASE_URL}/api/lists/counts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Delete list
export async function deleteListsApi(listId, accessToken) {
  const res = await fetch(`${BASE_URL}/api/delete/lists/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Create list tasks
export async function createListTaskApi(payload, listId, accessToken) {
  const res = await fetch(`${BASE_URL}/api/list/tasks?listId=${listId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return await res.json();
  return res.json();
}

// Get list tasks
export async function getListTasksApi(listId, accessToken) {
  const res = await fetch(`${BASE_URL}/api/list/tasks?listId=${listId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}