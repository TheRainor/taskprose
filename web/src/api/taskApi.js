// Create task
export async function createTaskApi(payload, accessToken) {
  const res = await fetch("http://localhost:3000/api/tasks", {
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

// Get tasks
export async function getTasksApi(filter, accessToken) {
  const res = await fetch(`http://localhost:3000/api/tasks/${filter}`, {
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

// Get task counts
export async function getTaskCountsApi(accessToken) {
  const res = await fetch("http://localhost:3000/api/tasks/counts", {
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

// Update tasks
export async function updateTasksApi(updates, taskId, accessToken) {
  const res = await fetch(`http://localhost:3000/api/update/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(updates),
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Delete tasks
export async function deleteTasksApi(taskId, accessToken) {
  const res = await fetch(`http://localhost:3000/api/delete/tasks/${taskId}`, {
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
