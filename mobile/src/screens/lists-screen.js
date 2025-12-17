import { View, Text, ScrollView, Pressable, Feather } from "../libs/index";
import { Header, StatusView } from "../components/index";
import { useListManagement } from "../hooks/index";
import { useTranslation } from "react-i18next";

export default function ListsScreen({ navigation }) {
  const { t } = useTranslation();
  const { lists, loading, handleDelete } = useListManagement(navigation, "all");

  return (
    <View className="bg-indigo-950 min-h-screen">
      <Header />
      <View className="absolute top-0 left-0 right-0 z-50">
        <StatusView loading={loading} />
      </View>
      <View className="w-[87%] mt-[7%] self-center flex-1">
        <Text className="text-white text-2xl mb-4">{t("lists.page.title")}</Text>

        <ScrollView>
          {lists.length === 0 && (
            <Text className="text-gray-300 text-center mt-10">
              {t("lists.page.empty")}
            </Text>
          )}
          {lists.map((list) => (
            <Pressable
              key={list.id}
              className="mb-4 bg-white/10 active:bg-white/20 px-4 py-3 rounded-xl"
              onPress={() => navigation.navigate('ListTaskScreen', { listId: list.id, listName: list.list_name })}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-white font-medium flex-1 flex-shrink">
                  {list.list_name}
                </Text>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation?.();
                    handleDelete(list.id);
                  }}
                  className="ml-4"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather name="x" size={22} color="#dc2626" />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}