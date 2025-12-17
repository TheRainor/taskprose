import { Modal, Pressable, View, Text, Octicons } from "../../libs/index";
import { useTaskCountsContext } from "../../context/task-counts-context.js";
import { useListCountsContext } from "../../context/list-counts-context.js";
import { useTranslation } from "react-i18next";

export default function PageSelectionModal({
  visible,
  onClose,
  onSelect,
  currentPage,
}) {
  const { t } = useTranslation();
  const { counts } = useTaskCountsContext();
  const { listCounts } = useListCountsContext();
  const pages = [
    { key: "TodoAll", label: t("menubar.categories.all"), count: counts.count_all || 0 },
    { key: "TodoToday", label: t("menubar.categories.today"), count: counts.count_today || 0},
    { key: "TodoImportant", label: t("menubar.categories.important"), count: counts.count_important || 0},
    { key: "TodoPlanned", label: t("menubar.categories.planned"), count: counts.count_planned || 0 },
    { key: "TodoCompleted", label: t("menubar.categories.completed"), count: counts.count_completed || 0 },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Arka plan (kapatma) */}
      <Pressable className="min-h-screen bg-black/60" onPress={onClose} />

      {/* Alt sayfa: modal kutusu */}
      <View className="absolute bottom-0 w-full bg-violet-950 rounded-t-2xl p-5">
        {/* Başlık */}
        <Text className="text-center text-white text-xl font-semibold mb-4">
          {t("menubar.menu")}
        </Text>

        {/* --- Sayfa Seçimi --- */}
        {pages.map((page) => {
          const isActive = page.key === currentPage;
          return (
            <Pressable
              key={page.key}
              onPress={() => onSelect(page.key)}
              className={`flex-row items-center justify-between p-3 px-6 mb-4 rounded-xl ${
                isActive ? "bg-purple-800" : "bg-white/20"
              }`}
            >
              <Text
                className={`text-lg ${
                  isActive ? "text-white font-bold" : "text-white"
                }`}
              >
                <Octicons name="tasklist" size={18} color="white" />{" "}
                {page.label}
              </Text>
              <Text className="bg-white/20 px-3 py-1 rounded-full text-white">
                {page.count}
              </Text>
            </Pressable>
          );
        })}

        {/* --- Ayrı blok: Listeler --- */}
        <View className="mt-2">
          <Text className="text-white text-xl mb-3">{t("menubar.lists.title")}</Text>

          {(() => {
            const isActive = currentPage === "AllLists";
            return (
              <Pressable
                onPress={() => onSelect("AllLists")}
                className={`flex-row items-center justify-between p-3 px-6 mb-4 rounded-xl ${
                  isActive ? "bg-purple-800" : "bg-white/20"
                }`}
              >
                <Text
                  className={`text-lg ${
                    isActive ? "text-white font-bold" : "text-white"
                  }`}
                >
                  <Octicons name="list-unordered" size={18} color="white" /> {t("menubar.lists.all")}
                </Text>
                <Text className="bg-white/20 px-3 py-1 rounded-full text-white">
                  {listCounts?.list_count || 0}
                </Text>
              </Pressable>
            );
          })()}
        </View>
      </View>
    </Modal>
  );
}
