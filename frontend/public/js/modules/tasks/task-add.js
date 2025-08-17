const now = new Date();

function formatDate(dt) {
  if (!dt) return null;
  const day     = String(dt.getDate()).padStart(2, '0');
  const month   = String(dt.getMonth() + 1).padStart(2, '0'); 
  const year    = dt.getFullYear();
  const hours   = String(dt.getHours()).padStart(2, '0');
  const minutes = String(dt.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} - ${hours}:${minutes}`;
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.add('hidden'));
}

function toggleDropdown(dropdownId) {
  const el = document.getElementById(dropdownId);
  if (!el) return;
  const isHidden = el.classList.contains('hidden');
  closeAllDropdowns();  
  if (isHidden) {
    el.classList.remove('hidden');
  }
}
window.toggleDropdown = toggleDropdown;

function openSelectionAlarm() {
  closeAllDropdowns();
  document.getElementById('alarmCustom').classList.toggle('hidden');
}

function openSelectionDate() {
  closeAllDropdowns();
  document.getElementById('dateCustom').classList.toggle('hidden');
}

function selectAlarm(value) {
  document.getElementById('hiddenAlarm').value = value;
  let alarmInfo;
  // --- Alarm zamanı hesaplama ---
    if (value === 'today') {
      alarmInfo = new Date(now);
      alarmInfo.setHours(now.getHours() + 3);
    } else if (value === 'tomorrow') {
      alarmInfo = new Date(now);
      alarmInfo.setDate(now.getDate() + 1);
    } else if (value === 'nextweek') {
      alarmInfo = new Date(now);
      alarmInfo.setDate(now.getDate() + 7);
    }
    alarmInfo = formatDate(alarmInfo);
  document.getElementById('alarmInfo').textContent = alarmInfo;
  updateClearButtons();
  closeAllDropdowns();
}
window.selectAlarm = selectAlarm;

function selectDate(value) {
  document.getElementById('hiddenDate').value = value;
  let dateInfo;
  // --- Due date hesaplama ---
    if (value === 'tomorrow') {
      dateInfo = new Date(now);
      dateInfo.setDate(now.getDate() + 1);
    } else if (value === 'nextweek') {
      dateInfo = new Date(now);
      dateInfo.setDate(now.getDate() + 7);
    }

    dateInfo = formatDate(dateInfo);
  document.getElementById('dateInfo').textContent = dateInfo;
  updateClearButtons();
  closeAllDropdowns();
}
window.selectDate = selectDate;

function selectRepeat(value) {
  document.getElementById('hiddenRepeat').value = value;
  let repeatInfo;
  switch(value) {
    case "daily":
      repeatInfo = "Günlük";
      break;
    case "weekly":
      repeatInfo = "Haftalık";
      break;
      case "monthly":
        repeatInfo = "Aylık";
      break;
    case "yearly":
      repeatInfo = "Yıllık";
      break;
    default:
  }
  document.getElementById('repeatInfo').textContent = repeatInfo;
  updateClearButtons();
  closeAllDropdowns();
}
window.selectRepeat = selectRepeat;

function clearAlarm () {
  document.getElementById('hiddenAlarm').value = "";
  document.getElementById('alarmInfo').textContent = "";
  document.getElementById('alarmCustomInput').value = "";
  updateClearButtons();
  closeAllDropdowns();
}

function clearDate () {
  document.getElementById('hiddenDate').value = "";
  document.getElementById('dateInfo').textContent = "";
  document.getElementById('dateCustomInput').value = "";
  updateClearButtons();
  closeAllDropdowns();
}

function clearRepeat () {
  document.getElementById('hiddenRepeat').value = "";
  document.getElementById('repeatInfo').textContent = "";
  document.getElementById('repeatCustomInput').value = "";
  updateClearButtons();
  closeAllDropdowns();
}

function updateClearButtons() {
  // Alarm
  const alarmValue = document.getElementById('hiddenAlarm').value;
  if (alarmValue) {
    document.getElementById('clearAlarm').classList.remove('hidden');
  } else {
    document.getElementById('clearAlarm').classList.add('hidden');
  }

  // Date
  const dateValue = document.getElementById('hiddenDate').value;
  if (dateValue) {
    document.getElementById('clearDate').classList.remove('hidden');
  } else {
    document.getElementById('clearDate').classList.add('hidden');
  }

  // Repeat
  const repeatValue = document.getElementById('hiddenRepeat').value;
  if (repeatValue) {
    document.getElementById('clearRepeat').classList.remove('hidden');
  } else {
    document.getElementById('clearRepeat').classList.add('hidden');
  }
}

// Dropdown dışında bir yere tıklanınca tüm dropdownları kapat
window.addEventListener('click', function(e) {
  // Eğer tıklanan element bir dropdown-container'ın içindeyse kapatma
  if (!e.target.closest('.dropdown-container')) {
    closeAllDropdowns();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const alarmCustomInput = document.getElementById('alarmCustomInput');
  if (alarmCustomInput) {
    alarmCustomInput.addEventListener('change', function() {
      const value = alarmCustomInput.value;
      if (value) {
        // Tarihi uygun formata çevir
        const dt = new Date(value);
        document.getElementById('alarmInfo').textContent = formatDate(dt);
        document.getElementById('hiddenAlarm').value = value;
      } else {
        document.getElementById('alarmInfo').textContent = "";
        document.getElementById('hiddenAlarm').value = "";
      }
      updateClearButtons();
    });
  }

  const dateCustomInput = document.getElementById('dateCustomInput');
  if (dateCustomInput) {
    dateCustomInput.addEventListener('change', function() {
      const value = dateCustomInput.value;
      if (value) {
        const dt = new Date(value);
        document.getElementById('dateInfo').textContent = formatDate(dt);
        document.getElementById('hiddenDate').value = value;
      } else {
        document.getElementById('dateInfo').textContent ="";
        document.getElementById('hiddenDate').value ="";
      }
      updateClearButtons();
    })
  }
});