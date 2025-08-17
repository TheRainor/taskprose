import {
  useState, useCallback, useFocusEffect, Pressable, View, Text, TextInput, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform, AntDesign } from "../libs/index";
import { loginFormSubmit, controlTokens } from "../services/index";
import { useUser } from "../context/index";
import { useSuccessMessage } from "../hooks/index";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const success = useSuccessMessage();
  const { setUser } = useUser();

  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const { accessToken, user } = await controlTokens();  
        if (accessToken) {
          setUser({ first_name: user.first_name, last_name: user.last_name, email: user.email });
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          });
        }
      };
      checkAuth();
    }, [navigation])
  );

  const handleLogin = async () => {
    setError("");
    try {
      await loginFormSubmit({ email, password, setUser });
      navigation.navigate("MainTabs");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-indigo-950 min-h-screen flex-1 justify-center">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center"
        >
          <View className="mx-5 px-8 py-10 bg-white/10 border border-white/40 rounded-2xl">
            {success ? (
              <Text className="text-green-400 text-center mb-4">{success}</Text>
            ) : null}
            <View className="items-center mb-6 gap-2">
              <Text className="text-white">Hoş Geldiniz! 👋</Text>
              <Text className="text-white">Hesabınıza giriş yapın</Text>
            </View>
            <Text className="text-white">E-posta</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="text-white p-3 mt-2 bg-white/20 rounded-xl text-center"
              placeholder="ornek@email.com"
              placeholderTextColor="#E5E7EB"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text className="text-white mt-4">Şifre</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              className="text-white p-3 mt-2 mb-6 bg-white/20 rounded-xl text-center"
              placeholder=". . . . . . . . ."
              placeholderTextColor="#E5E7EB"
            />
            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}
            <Pressable
              onPress={handleLogin}
              className="bg-violet-700 items-center mt-2 p-3 rounded-xl"
            >
              <Text className="text-white text-xl">Giriş Yap</Text>
            </Pressable>
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-white/50" />
              <Text className="text-white text-xl">veya</Text>
              <View className="flex-1 h-px bg-white/50" />
            </View>
            <View className="bg-white/30 items-center rounded-xl py-2">
              <AntDesign name="google" size={24} color="white" />
            </View>
            <View className="flex-row">
              <Text className="flex-1 text-white text-center mt-9">
                Hesabınız yok mu?
              </Text>
              <Pressable
                onPress={() => navigation.navigate("Register")}
                className="bg-violet-700 px-5 py-3 mt-6 mr-4 rounded-xl"
              >
                <Text className="text-white">Kayıt Ol</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
