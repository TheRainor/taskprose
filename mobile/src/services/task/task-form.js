import { createTaskApi } from "../../api/index";
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
  title,
  description,
  chosenAlarm,
  chosenDate,
  chosenRepeat
}) {

  if (!title || !description) throw new Error("Alanları eksiksiz doldurun.");

  const payload = {
    title: title.trim().replace(/^./, (c) => c.toUpperCase()),
    description: description.trim().replace(/^./, (c) => c.toUpperCase()),
    alarm: chosenAlarm ? formatDateForMySQL(new Date(chosenAlarm)) : null,
    date: chosenDate ? formatDateForMySQL(new Date(chosenDate)) : null,
    repeat: chosenRepeat || null,
  };

  try {
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }
    
    const data = await createTaskApi(payload, accessToken);
    if (!data.success) {
      throw new Error("Görev eklenemedi.");
    }
    
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
}
