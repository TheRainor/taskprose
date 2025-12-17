import { useState, useCallback, useFocusEffect, Pressable, View, Text, TextInput,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "../libs/index";
import { controlTokens, registerFormSubmit } from "../services/index";
import { useTranslation } from "react-i18next";

export default function RegisterScreen({ navigation }) {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const { accessToken } = await controlTokens();
        if (accessToken) {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
          });
        }
      };
      checkAuth();
    }, [navigation])
  );

  const handleRegister = async () => {
    setError("");
    try {
      const msg = await registerFormSubmit({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        t
      });
      navigation.navigate("Login", { successMessage: msg });
    } catch (err) {
      setError(t(err.message));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-slate-900 min-h-screen flex-1 justify-center">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center"
        >
          <View className="px-5">
            <View className="mb-4 gap-3">
              <Text className="text-white text-2xl font-semibold">
                {t("auth.login.title")}
              </Text>
              <Text className="text-gray-300">{t("auth.login.subtitle")}</Text>
              <Text className="text-white text-2xl font-semibold mt-6">
                {t("auth.register.title")}
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-1">
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  className="text-white px-4 mt-2 bg-white/20 rounded-3xl"
                  placeholder={t("auth.register.firstNamePlaceholder")}
                  placeholderTextColor="#E5E7EB"
                />
              </View>
              <View className="flex-1">
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  className="text-white px-4 mt-2 bg-white/20 rounded-3xl"
                  placeholder={t("auth.register.lastNamePlaceholder")}
                  placeholderTextColor="#E5E7EB"
                />
              </View>
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="text-white px-4 mt-7 bg-white/20 rounded-3xl"
              placeholder={t("auth.register.emailPlaceholder")}
              placeholderTextColor="#E5E7EB"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              className="text-white px-4 mt-7 bg-white/20 rounded-3xl"
              placeholder={t("auth.register.passwordPlaceholder")}
              placeholderTextColor="#E5E7EB"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              className="text-white px-4 mt-7 mb-6 bg-white/20 rounded-3xl"
              placeholder={t("auth.register.confirmPasswordPlaceholder")}
              placeholderTextColor="#E5E7EB"
            />
            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}
            <Pressable
              onPress={handleRegister}
              className="bg-violet-700 items-center mt-2 p-3 rounded-3xl"
            >
              <Text className="text-white text-xl">{t("auth.register.submit")}</Text>
            </Pressable>
            <View className="flex-row items-center mt-8 ml-2">
              <Text className="text-gray-300 mr-2 text-base">
                {t("auth.register.haveAccount")}
              </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text className="text-violet-400 text-2xl">{t("auth.register.loginLink")}</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
