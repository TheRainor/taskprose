import { logoutApi } from "../../api/index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function logoutFormSubmit() {
  const payload = {
    platform: "w",
  };

  try {
    const data = await logoutApi(payload);

    showMessage(data.message, "success");

    if (data.success) {
      setTimeout(() => {
        window.location.href = "/auth";
      }, 720);
    }
  } catch (err) {
    showMessage(err.message, "error");
  }
}
