import {
  useState, useCallback, useFocusEffect, Pressable, View, Text, TextInput, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Platform } from "../libs/index";
import { controlTokens, registerFormSubmit } from "../services/index"

export default function RegisterScreen({ navigation }) {
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
              routes: [{ name: 'MainTabs' }],
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
      });
      navigation.navigate("Login", { successMessage: msg });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-indigo-950 min-h-screen flex-1 justify-center">
        {/* Login */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center"
        >
          {/* Register */}
          <View className=" mx-5 px-8 py-10 bg-white/10 border border-white/40 rounded-2xl">
            {/* Register İçeriği */}
            <View className="items-center mb-6 gap-2">
              <Text className="text-white">Hesap Oluştur 🚀</Text>
              <Text className="text-white">Hemen ücretsiz kayıt ol</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2 gap-4">
              <View className="flex-1">
                <Text className="text-white">Ad</Text>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  className="text-white p-3 mt-2 bg-white/20 rounded-xl"
                  placeholder="Adınız"
                  placeholderTextColor="#E5E7EB"
                />
              </View>
              <View className="flex-1">
                <Text className="text-white">Soyad</Text>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  className="text-white p-3 mt-2 bg-white/20 rounded-xl"
                  placeholder="Soyadınız"
                  placeholderTextColor="#E5E7EB"
                />
              </View>
            </View>
            <Text className="text-white mt-4">E-posta</Text>
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
              className="text-white p-3 mt-2 bg-white/20 rounded-xl text-center"
              placeholder=". . . . . . . . ."
              placeholderTextColor="#E5E7EB"
            />
            <Text className="text-white mt-4">Şifre Tekrar</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              className="text-white p-3 mt-2 mb-6 bg-white/20 rounded-xl text-center"
              placeholder=". . . . . . . . ."
              placeholderTextColor="#E5E7EB"
            />
            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}
            <Pressable
              onPress={handleRegister}
              className="bg-violet-700 items-center mt-2 p-3 rounded-xl"
            >
              <Text className="text-white text-xl">Kayıt Ol</Text>
            </Pressable>
            <View className="flex-row">
              <Text className="flex-1 text-white text-center mt-9">
                Zaten bir hesabınız var mı?
              </Text>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                className="bg-violet-700 px-5 py-3 mt-6 mr-4 rounded-xl"
              >
                <Text className="text-white text-base">Giriş Yap</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
