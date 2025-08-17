import { registerApi } from "../../api/auth-api.js";
import { showMessage } from "../../components/message-box.js";
import { showLogin } from "./auth-page.js";

export function registerFormSubmit(formData) {
  const form = document.querySelector(formData);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      first_name: form.elements.first_name.value.trim().replace(/^./, (c) => c.toUpperCase()),
      last_name: form.elements.last_name.value.trim().replace(/^./, (c) => c.toUpperCase()),
      email: form.elements.email.value.trim(),
      password: form.elements.password.value,
      confirmPassword: form.elements.confirmPassword.value,
    };

    try {
      const data = await registerApi(payload);

      if (data.success) {
        showLogin();
        showMessage(data.message, "success");
      }
    } catch (err) {
      showMessage(err.message, "error");
    }
  });
}
