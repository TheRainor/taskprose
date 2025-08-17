import { loginApi } from "../../api/index";
import { saveTokens } from "./token-service";


export async function loginFormSubmit({ email, password ,setUser }) {
  if (!email || !password) {
    throw new Error("E-posta ve şifre alanları boş bırakılamaz.");
  }

  const payload = {
    email: email.trim(),
    password: password.trim(),
    platform: "m",
  };

  try {
    const data = await loginApi(payload);

    const { first_name, last_name, email, accessToken, refreshToken, success } =
      data;
    await saveTokens({ accessToken, refreshToken }, true);
    if (!success) {
      throw new Error("Giriş başarısız oldu.");
    }

    setUser({ first_name, last_name, email });
    return;
  } catch (err) {
    throw new Error(err.message || "Sunucuya bağlanırken hata oluştu.");
  }
}
