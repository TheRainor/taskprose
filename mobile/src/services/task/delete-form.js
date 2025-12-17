import { deleteTasksApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

export async function deleteFormSubmit(taskId) {
  
  if (!taskId) {
    throw new Error("Deletion failed.");
  }
  try {
    const { success, message, accessToken } = await controlTokens(); 

    if (!success) {
      throw new Error(message);
    }
    const data = await deleteTasksApi(taskId, accessToken);
    
    return data.messageKey;
  } catch (err) {
    throw new Error(err.messageKey);
  }
}
