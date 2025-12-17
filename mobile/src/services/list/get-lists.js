import { getListsApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

export async function getLists() {
  try {
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }

    const data = await getListsApi(accessToken);

    if (!data.success) throw new Error(data.messageKey || "Lists could not be retrieved");

    return { data: data.lists };
  } catch (err) {
    return { data: [], error: err.messageKey || err.message };
  }
}
