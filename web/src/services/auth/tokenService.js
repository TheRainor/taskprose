import { checkAccessApi, tryRefreshApi } from "../../api/index.js";

// Token verification process
export async function controlTokens() {
  const { success, user } = await checkAccessApi();

  if (!success) {
    const data = await tryRefreshApi();

    if (data.success) return { success: data.success, user: data.user };
  }
  return { success, user };
}
