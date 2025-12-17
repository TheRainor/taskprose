import { Modal, Pressable, View, Text } from "../../libs/index";
import { logoutFormSubmit } from "../../services/index";
import { useTranslation } from "react-i18next";

export default function ProfileModal({ visible, onClose, navigation }) {
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      const msg = await logoutFormSubmit(t);
      navigation.navigate("Login", { successMessage: msg });
    } catch (err) {
      navigation.setParams({ errorMessage: err });
    }
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable className="min-h-screen bg-black/60" onPress={onClose} />
      <View className="absolute bottom-0 w-full bg-violet-950 rounded-t-2xl p-5">
        <Pressable
          onPress={handleLogout}
          className="bg-red-500/60 p-2 mx-20 rounded-2xl"
        >
          <Text className="text-white text-center font-semibold text-lg">
            {t("signOut")}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
