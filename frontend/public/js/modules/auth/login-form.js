import { loginApi } from "../../api/auth-api.js";
import { showMessage } from "../../components/message-box.js";

export function loginFormSubmit(formData) {
  const form = document.querySelector(formData);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      email: form.elements.email.value.trim(),
      password: form.elements.password.value.trim(),
      platform: "w",
    };

    try {
      const data = await loginApi(payload);

      if (data.success) window.location.href = "/to-do/all";
    } catch (err) {
      showMessage(err.message, "error");
    }
  });
}
