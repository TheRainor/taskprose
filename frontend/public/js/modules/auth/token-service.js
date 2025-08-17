import { checkAccessApi, tryRefreshApi } from '../../api/auth-api.js';

// Token verification process
export async function controlTokens() {
  const { success, message } = await checkAccessApi();

  if (!success) {
    const { newAccessToken } = await tryRefreshApi();

    if (newAccessToken) {
      return { success: true };
    }
    return { success: false, message };
  }
  return { success: true };
}