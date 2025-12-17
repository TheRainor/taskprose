import { loginApi } from "../../api/index";
import { saveTokens } from "./token-service";

export async function loginFormSubmit({ email, password, setUser, t }) {
  if (!email || !password) {
    throw new Error(t("auth.login.emptyFields"));
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
      throw new Error(t("auth.login.failed"));
    }

    setUser({ first_name, last_name, email });
    return;
  } catch (err) {
    throw new Error(err.messageKey);
  }
}
