import { updateTasksApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

export async function updateFormSubmit(taskId) {
  
  if (!taskId) {
    throw new Error("Eylem başarısız.");
  }

  const updates = {
    // Updates will come here
  };

  try {
    const { success, message, accessToken } = await controlTokens(); 

    if (!success) {
      throw new Error(message);
    }
    const data = await updateTasksApi(updates, taskId, accessToken);
    
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
}
