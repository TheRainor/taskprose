import { logoutApi } from "../../api/index";
import { getTokens, clearTokens } from "./token-service";


export async function logoutFormSubmit() {
  const tokens = await getTokens();

  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  const platform = "m";
  try {
    const data = await logoutApi(accessToken, refreshToken, platform);

    if (!data.success) {
      throw new Error("Giriş başarısız oldu.");
    }

    await clearTokens();

    return data.message;
  } catch (err) {
    throw new Error(err.message || "Sunucuya bağlanırken hata oluştu.");
  }
}
