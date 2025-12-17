import { logoutApi } from "../../api/index";
import { getTokens, clearTokens } from "./token-service";

export async function logoutFormSubmit(t) {
  const tokens = await getTokens();

  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  const platform = "m";
  try {
    const data = await logoutApi(accessToken, refreshToken, platform);

    if (!data.success) {
      throw new Error(t("signOutFailed"));
    }

    await clearTokens();

    return data.messageKey;
  } catch (err) {
    throw new Error(err.messageKey || "An error occurred while connecting to the server.");
  }
}
