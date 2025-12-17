import { createListApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

export async function listFormSubmit(listName, t) {
  if (!listName) throw new Error(t("listAdd.emptyName"));

  listName = listName.trim().replace(/^./, (c) => c.toUpperCase());
  
  try {
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }

    const data = await createListApi(listName, accessToken);
    
    if (!data.success) {
      throw new Error(t("listAdd.failed"));
    }
    return data.messageKey;
  } catch (err) {
    throw new Error(err.messageKey);
  }
}
