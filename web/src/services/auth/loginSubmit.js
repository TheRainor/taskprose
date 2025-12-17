import { loginApi } from "../../api/index.js";
import { showMessage } from "../../utils/messageBox.js";
import {
  setAccessTokensElectron,
  setRefreshTokensElectron,
} from "./tokenService.js";

const isElectron = !!window.electronStore;

export async function loginFormSubmit(formData) {
  const payload = {
    email: formData.get("email").trim(),
    password: formData.get("password").trim(),
    platform: isElectron ? "d" : "w",
  };

  try {
    const data = await loginApi(payload);
    const { first_name, last_name, email, success, accessToken, refreshToken } = data;
    
    if (isElectron) {
      // Save tokens via preload.js
      setAccessTokensElectron(accessToken);
      setRefreshTokensElectron(refreshToken);
    }

    if (success) return { first_name, last_name, email, success };
  } catch (err) {
    showMessage(err.messageKey, "error");
  }
}
