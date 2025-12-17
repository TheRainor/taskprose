import { deleteListsApi } from "../../api/index.js";
import { controlTokens } from "../index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function listDeleteSubmit(listId) {
  if (!listId) return;

  try {
    const token = await controlTokens();

    if (!token.success) throw new Error(token.messageKey);

    const data = await deleteListsApi(listId, token.accessToken);
    showMessage(data.messageKey, "success");
  } catch (err) {
    showMessage(err.messageKey);
  }
}
