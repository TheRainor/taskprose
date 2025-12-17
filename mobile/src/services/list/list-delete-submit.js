import { deleteListsApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

export async function listDeleteSubmit(listId) {
  
   if (!listId) {
    throw new Error("Deletion failed.");
  }
  try {
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }

    const data = await deleteListsApi(listId, accessToken);

    return data.messageKey;
  } catch (err) {
    throw new Error(err.messageKey);
  }
}
