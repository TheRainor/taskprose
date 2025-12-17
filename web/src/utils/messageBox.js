import i18n from "../i18n";

export function showMessage(messageKey, type = "error") {
  const existingBox = document.getElementById("message");
  if (existingBox) existingBox.remove();

  const box = document.createElement("div");
  box.id = "message";
  box.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-lg font-semibold z-50 ${
    type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
  }`;

  box.textContent = i18n.t(messageKey);

  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 4000);
}
