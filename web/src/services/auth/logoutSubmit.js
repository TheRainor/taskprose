import { logoutApi } from "../../api/index.js";
import { showMessage } from "../../utils/messageBox.js";
import { getTokensElectron, deleteTokensElectron } from "./tokenService.js";

const isElectron = !!window.electronStore;

export async function logoutFormSubmit() {
  const platform = isElectron ? "d" : "w";

  try {
    let accessToken = null;
    let refreshToken = null;

    if (isElectron) {
      // Get tokens from electron-store
      const tokens = await getTokensElectron();
      accessToken = tokens?.accessToken || null;
      refreshToken = tokens?.refreshToken || null;
    }

    const data = await logoutApi(platform, accessToken, refreshToken);

    if (data.success) {
      if (isElectron) {
        // Delete token from electron-store
        await deleteTokensElectron();
      }
      showMessage(data.messageKey, "success");
      setTimeout(() => {
        window.location.href = isElectron ? "#/auth" : "/auth";
      }, 720);
    }
  } catch (err) {
    showMessage(err.messageKey, "error");
  }
}
