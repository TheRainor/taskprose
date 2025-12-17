import { useState, useCallback, useFocusEffect, Pressable, View, Text, TextInput, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform, AntDesign, FontAwesome6 } from "../libs/index";
import { loginFormSubmit, controlTokens } from "../services/index";
import { useUser } from "../context/index";
import { useSuccessMessage } from "../hooks/index";
import { useTranslation } from "react-i18next";

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const success = useSuccessMessage();
  const { setUser } = useUser();
  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const { accessToken, first_name, last_name, email } = await controlTokens();
        
        if (accessToken) {
          setUser({
            first_name: first_name,
            last_name: last_name,
            email: email,
          });
          navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
        }
      };
      checkAuth();
    }, [navigation])
  );
  const handleLogin = async () => {
    setError("");
    try {
      await loginFormSubmit({ email, password, setUser, t });
      navigation.navigate("MainTabs");
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
            {success ? (
              <Text className="text-green-400 text-center mb-4">{success}</Text>
            ) : null}

            <View className="mb-4 gap-3">
              <Text className="text-white text-2xl font-semibold">
                {t("auth.login.title")}
              </Text>
              <Text className="text-gray-300">{t("auth.login.subtitle")}</Text>
            </View>

            <Text className="text-white mt-6">{t("auth.login.emailLabel")}</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="text-white p-3 mt-2 bg-white/20 rounded-3xl text-center"
              placeholder={t("auth.login.emailPlaceholder")}
              placeholderTextColor="#E5E7EB"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text className="text-white mt-4">{t("auth.login.passwordLabel")}</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="text-white p-3 mt-2 mb-6 bg-white/20 rounded-3xl text-center"
              placeholder=". . . . . . . . ."
              placeholderTextColor="#E5E7EB"
            />

            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}

            <Pressable
              onPress={handleLogin}
              className="bg-violet-700 items-center mt-2 p-3 rounded-3xl"
            >
              <Text className="text-white text-xl">{t("auth.login.submit")}</Text>
            </Pressable>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-white/50" />
              <Text className="text-white/80 text-lg">{t("auth.login.divider")}</Text>
              <View className="flex-1 h-px bg-white/50" />
            </View>

            {/* Sosyal butonlar */}
            <View className="flex-row justify-between">
              <Pressable
                className="w-28 h-14 border border-white/30 rounded-full items-center justify-center active:bg-white/10"
                onPress={() => console.log("Facebook pressed")}
              >
                <FontAwesome6 name="facebook-f" size={20} color="white" />
              </Pressable>

              <Pressable
                className="w-28 h-14 border border-white/30 rounded-full items-center justify-center active:bg-white/10"
                onPress={() => console.log("X pressed")}
              >
                <FontAwesome6 name="x-twitter" size={20} color="white" />
              </Pressable>

              <Pressable
                className="w-28 h-14 border border-white/30 rounded-full items-center justify-center active:bg-white/10"
                onPress={() => console.log("Google pressed")}
              >
                <AntDesign name="google" size={22} color="white" />
              </Pressable>
            </View>

            <View className="flex-row items-center mt-8 ml-2">
              <Text className="text-gray-300 mr-2 text-base">
                {t("auth.login.noAccount")}
              </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text className="text-violet-400 text-2xl">{t("auth.login.registerLink")}</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
