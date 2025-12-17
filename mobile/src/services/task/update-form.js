import { updateTasksApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

export async function updateFormSubmit(taskId, completed) {
  
  if (!taskId) {
    throw new Error("Action failed");
  }

  const updates = {
    completed: completed || null,
  };

  try {
    const { success, message, accessToken } = await controlTokens(); 

    if (!success) {
      throw new Error(message);
    }
    const data = await updateTasksApi(updates, taskId, accessToken);
    
    return data.messageKey;
  } catch (err) {
    throw new Error(err.messageKey);
  }
}
