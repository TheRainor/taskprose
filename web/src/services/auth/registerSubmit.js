import { registerApi } from "../../api/index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function registerFormSubmit(formData) {

  const payload = {
    first_name: formData.get("first_name").trim().replace(/^./, (c) => c.toUpperCase()),
    last_name: formData.get("last_name").trim().replace(/^./, (c) => c.toUpperCase()),
    email: formData.get("email").trim(),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    const data = await registerApi(payload);

    if (data.success) {
      showMessage(data.messageKey, "success");
      return data.success;
    }
  } catch (err) {
    showMessage(err.messageKey, "error");
  }
}
