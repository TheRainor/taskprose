import { registerApi } from "../../api/index";

export async function registerFormSubmit({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  t
}) {
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error(t("auth.register.emptyFields"));
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

    const { success, messageKey } = data;

    if (!success) {
      throw new Error(t("auth.register.failed"));
    }

    return messageKey;
    
  } catch (err) {
    throw new Error(err.messageKey || "An error occurred while connecting to the server.");
  }
}
