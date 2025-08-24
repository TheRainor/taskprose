import { loginApi } from "../../api/index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function loginFormSubmit(formData) {
  const payload = {
    email: formData.get("email").trim(),
    password: formData.get("password").trim(),
    platform: "w",
  };

  try {
    const data = await loginApi(payload);

    const { first_name, last_name, email, success } = data;

    if (success) return { first_name, last_name, email, success };
  } catch (err) {
    showMessage(err.message, "error");
  }
}
