import { registerApi } from "../../api/index";

export async function registerFormSubmit({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) {
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error("Alanları lütfen doldurun.");
  }

  const payload = {
    first_name: firstName.trim().replace(/^./, (c) => c.toUpperCase()),
    last_name: lastName.trim().replace(/^./, (c) => c.toUpperCase()),
    email: email.trim(),
    password: password.trim(),
    confirmPassword: confirmPassword.trim(),
  };
  try {
    const data = await registerApi(payload);

    const { success, message } = data;

    if (!success) {
      throw new Error("Kayıt başarısız oldu.");
    }

    return message;
    
  } catch (err) {
    throw new Error(err.message || "Sunucuya bağlanırken hata oluştu.");
  }
}
