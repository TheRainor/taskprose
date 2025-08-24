// Tarih formatlaması için utility fonksiyonlar
export const formatDateLocal = (dt) => {
  const d = new Date(dt);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} - ${hours}:${minutes}`;
};

export const toMySQLDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDynamicDate = (type) => {
  const now = new Date();
  let dt = new Date(now);

  if (type === "today") {
    dt.setHours(now.getHours() + 3);
  } else if (type === "tomorrow") {
    dt.setDate(now.getDate() + 1);
  } else if (type === "nextweek") {
    dt.setDate(now.getDate() + 7);
  }
  return dt;
}; 