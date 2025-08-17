export async function updateSidebarCounts() {
    try {
      const [all, today, important, planned, completed] = await Promise.all([
        fetch('/api/tasks/all').then(r => r.json()),
        fetch('/api/tasks/today').then(r => r.json()),
        fetch('/api/tasks/important').then(r => r.json()),
        fetch('/api/tasks/planned').then(r => r.json()),
        fetch('/api/tasks/completed').then(r => r.json())
      ]);
  
    document.getElementById('count-all').textContent = all.resultAllTasks?.length ?? 0;
    document.getElementById('count-today').textContent = today.resultTodayTasks?.length ?? 0;
    document.getElementById('count-important').textContent = important.resultImportantTasks?.length ?? 0;
    document.getElementById('count-planned').textContent = planned.resultPlannedTasks?.length ?? 0;
    document.getElementById('count-completed').textContent = completed.resultCompletedTasks?.length ?? 0;
    } catch (err) {
      console.error("Sidebar sayıları güncellenemedi", err);
    }
  }
  
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarContent = document.getElementById("sidebar-content");
  const tasklist = document.querySelector(".task-list-container");
  if (sidebarToggle && sidebarContent) {
    sidebarToggle.addEventListener("click", function () {
      if (sidebarContent.classList.contains("max-h-0")) {
        sidebarContent.classList.remove(
          "max-h-0",
          "overflow-hidden",
          "opacity-0",
          "space-y-0"
        );
        tasklist.classList.toggle("hidden");
        sidebarContent.classList.add("max-h-96", "opacity-100", "space-y-6");
      } else {
        sidebarContent.classList.remove("max-h-96", "opacity-100", "space-y-6");
        sidebarContent.classList.add(
          "max-h-0",
          "overflow-hidden",
          "opacity-0",
          "space-y-0"
        );
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateSidebarCounts();
  });