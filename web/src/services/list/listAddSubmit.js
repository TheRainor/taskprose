import { createListApi } from "../../api/index.js";
import { controlTokens } from "../index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function listFormSubmit(formData) {
  const listName = formData.get("listName").trim().replace(/^./, (c) => c.toUpperCase());
  try {
    const token = await controlTokens();

    if (token.success) {
      const data = await createListApi(listName, token.accessToken);
      showMessage(data.messageKey, "success");
    }
  } catch (err) {
    showMessage(err.messageKey, "error");
  }
}
