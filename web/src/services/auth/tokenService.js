import { checkAccessApi, tryRefreshApi } from "../../api/index.js";

const isElectron = !!window.electronStore;

// === Electron Store Helpers ===
export const setAccessTokensElectron = (accessToken) =>
  window.electronStore.set("jwt_access", accessToken);

export const setRefreshTokensElectron = (refreshToken) =>
  window.electronStore.set("jwt_refresh", refreshToken);

export const getTokensElectron = async () => {
  return window.authAPI.getTokens();
};

export const deleteTokensElectron = async () => {
  await Promise.all([
    window.electronStore.delete("jwt_access"),
    window.electronStore.delete("jwt_refresh"),
  ]);
};

// === Token Verification Flow ===
export async function controlTokens() {
  let accessToken, refreshToken;

  if (isElectron) {
    ({ accessToken, refreshToken } = await getTokensElectron());
  }

  const { success, first_name, last_name, email } = await checkAccessApi(accessToken);

  if (success) {
    return { success, first_name, last_name, email, accessToken };
  }

  // Access token invalid → try refresh
  const data = await tryRefreshApi(refreshToken);

  if (data.success) {
    if (isElectron) {
      await setAccessTokensElectron(data.newAccessToken);
    }
    return {
      success: data.success,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      accessToken: data.newAccessToken,
    };
  }

  // If refresh also fails → delete tokens
  if (isElectron) {
    await deleteTokensElectron();
  }

  return { success };
}
