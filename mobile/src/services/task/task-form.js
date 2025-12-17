import { createTaskApi, createListTaskApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";

function formatDateForMySQL(date) {
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export async function taskFormSubmit({
  taskName,
  chosenAlarm,
  chosenDate,
  chosenRepeat,
  listId = null,
  t
}) {

  if (!taskName) throw new Error(t("taskAdd.emptyFields"));

  const payload = {
    taskName: taskName.trim().replace(/^./, (c) => c.toUpperCase()),
    alarm: chosenAlarm ? formatDateForMySQL(new Date(chosenAlarm)) : null,
    date: chosenDate ? formatDateForMySQL(new Date(chosenDate)) : null,
    repeat: chosenRepeat || null,
  };

  try {
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }
    
    let data = {};
      if (listId) {
        data = await createListTaskApi(payload, listId, accessToken);
      } else {
        data = await createTaskApi(payload, accessToken);
      }
    if (!data.success) {
      throw new Error(t("taskAdd.failed"));
    }
    
    return data.messageKey;
  } catch (err) {
    throw new Error(err.messageKey);
  }
}
