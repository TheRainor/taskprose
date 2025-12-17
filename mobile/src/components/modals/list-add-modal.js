import { useState, Modal, Pressable, View, Text, TextInput, Ionicons } from "../../libs/index";
import { listFormSubmit } from "../../services/index";
import { useRefresh, useMessageContext } from "../../context/index";
import { useTranslation } from "react-i18next";


export default function ListAddModal({ visible, onClose }) {
  const { t } = useTranslation();
  const { triggerRefresh } = useRefresh();
  const { showSuccess, showError } = useMessageContext();

  const [listName, setListName] = useState("");

  // --- reset / close
  const handleClose = () => {
    setListName("");
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const message = await listFormSubmit(listName, t);

      triggerRefresh();
      showSuccess(message);
      handleClose();
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable className="flex-1 bg-black/60" onPress={handleClose} />

      <View className="absolute bottom-0 w-full bg-violet-950 rounded-t-2xl p-5">

        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-xl text-white font-semibold">{t("listAdd.title")}</Text>
        </View>

        <TextInput
          value={listName}
          onChangeText={setListName}
          className="text-white p-3 mb-3 bg-white/20 rounded-xl"
          placeholder={t("listAdd.placeholder")}
          placeholderTextColor="#E5E7EB"
          multiline
        />

        <Pressable
          onPress={handleSubmit}
          className="bg-purple-600 items-center p-3 rounded-xl"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add" size={23} color="white" />
            <Text className="ml-2 text-white text-xl">{t("listAdd.submit")}</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}
