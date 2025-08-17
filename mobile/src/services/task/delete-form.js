import { deleteTasksApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";


export async function deleteFormSubmit(taskId) {
  
  if (!taskId) {
    throw new Error("Silme işlemi başarısız.");
  }
  try {
    const { success, message, accessToken } = await controlTokens(); 

    if (!success) {
      throw new Error(message);
    }
    const data = await deleteTasksApi(taskId, accessToken);
    
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
}
