import { logoutApi } from "../../api/auth-api.js";
import { showMessage } from "../../components/message-box.js";

export function logoutFormSubmit(formData) {
  const form = document.querySelector(formData);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      platform: "w",
    };

    try {
      const data = await logoutApi(payload);

      if (data.success) window.location.href = "/";
      
    } catch (err) {
      showMessage(err.message, "error");
    }
  });
}
