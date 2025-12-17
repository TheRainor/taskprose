import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig.extra;

// Create task
export async function createTaskApi(payload, accessToken) {
  const res = await fetch(`${BASE_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Get tasks
export async function getTasksApi(type, accessToken) {
  const res = await fetch(`${BASE_URL}/api/tasks/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Get task counts
export async function getTaskCountsApi(accessToken) {
  const res = await fetch(`${BASE_URL}/api/tasks/counts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Update tasks
export async function updateTasksApi(updates, taskId, accessToken) {
  const res = await fetch(`${BASE_URL}/api/update/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Delete tasks
export async function deleteTasksApi(taskId, accessToken) {
  const res = await fetch(`${BASE_URL}/api/delete/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`   
    },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
