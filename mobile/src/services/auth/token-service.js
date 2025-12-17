import * as SecureStore from "expo-secure-store";
import { checkAccessApi, tryRefreshApi } from "../../api/index";

// Save tokens for login
export async function saveTokens({ accessToken, refreshToken } = false) {
  await SecureStore.setItemAsync("jwt_access", accessToken, {
    keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
  });
  await SecureStore.setItemAsync("jwt_refresh", refreshToken);
}

// Get tokens
export async function getTokens() {
  const accessToken = await SecureStore.getItemAsync("jwt_access");
  const refreshToken = await SecureStore.getItemAsync("jwt_refresh");
  return { accessToken, refreshToken };
}

// Clear tokens
export async function clearTokens() {
  await SecureStore.deleteItemAsync("jwt_access");
  await SecureStore.deleteItemAsync("jwt_refresh");
}

// Save access token for refresh access
async function saveAccessToken(newAccessToken) {
  await SecureStore.setItemAsync("jwt_access", newAccessToken, {
    keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
  });
}

// Clear access token for refresh access
async function clearAccessToken() {
  await SecureStore.deleteItemAsync("jwt_access");
}

// Token verification process
export async function controlTokens() {
  const { accessToken, refreshToken } = await getTokens();
  const { success, message, first_name, last_name, email } = await checkAccessApi(accessToken);
  
  if (!success) {
    const { newAccessToken, first_name, last_name, email } = await tryRefreshApi(refreshToken);
    if (newAccessToken) {
      await clearAccessToken();
      await saveAccessToken(newAccessToken);
      return { success: true, accessToken: newAccessToken, first_name, last_name, email };
    }
    await clearTokens();
    return { success: false, message, first_name, last_name, email };
  }
  return { success: true, accessToken, first_name, last_name, email };
}
