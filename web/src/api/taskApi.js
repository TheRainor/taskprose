// Create task
export async function createTaskApi(payload) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return await res.json();
  return res.json();
}

// Get tasks
export async function getTasksApi(filter) {
  const url = filter ? `/api/tasks/${filter}` : "/api/tasks";
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Get task counts
export async function getTaskCountsApi() {
  const res = await fetch("/api/tasks/counts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Update tasks
export async function updateTasksApi(updates, taskId) {
  const res = await fetch(`/api/update/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Update tasks
export async function deleteTasksApi(taskId) {
  const res = await fetch(`/api/delete/tasks/${taskId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
