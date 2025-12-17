import { useState, useLayoutEffect, View, Text, ScrollView, Pressable, Checkbox, Entypo, Feather } from "../libs/index";
import { Header, StatusView } from "../components/index";
import { useTaskManagement } from "../hooks/index";
import { useListId } from "../context/index";
import { useTranslation } from "react-i18next";

export default function ListTaskScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { listId, listName } = route?.params || {};
  const filter = "listTasks";

  const { setCurrentListId } = useListId();

  useLayoutEffect(() => {
    setCurrentListId(listId); 
    return () => {
      setCurrentListId(null); 
    };
  }, [listId, setCurrentListId]);
  
  const {
    tasks,
    loading,
    handleCheckbox,
    handleDelete,
  } = useTaskManagement(navigation, filter, listId);

  const [activeTaskId, setActiveTaskId] = useState(null);

  // ✅ List name
  const titleText = listName
    ? t("lists.detail.title", { name: listName })
    : t("lists.detail.loading");

  return (
    <View className="bg-indigo-950 min-h-screen">
      <Header />
      <View className="absolute top-0 left-0 right-0 z-50">
        <StatusView loading={loading} />
      </View>
      
      <View className="w-[87%] mt-[7%] self-center flex-1">
        {/* ✅ Geri butonu */}
        <Pressable 
          onPress={() => navigation.navigate("AllLists")}
          className="mb-4 flex-row items-center"
        >
          <Feather name="arrow-left" size={25} color="white" />
        </Pressable>

        {/* ✅ Liste başlığı */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold flex-1">
            {titleText}
          </Text>
        </View>

        {/* ✅ Task listesi */}
        <ScrollView className="flex-1">
          {tasks.length === 0 ? (
            <Text className="text-gray-300 text-center mt-10">
              {t("lists.detail.empty")}
            </Text>
          ) : (
            tasks.map((task) => (
              <View
                key={task.id}
                className={`mb-4 bg-white/10 px-4 py-3 rounded-xl ${
                  task.priority === "important" ? "border-2 border-yellow-300" : ""
                }`}
              >
                <View className="flex-row items-center justify-between">
                  {/* ✅ Checkbox ve task bilgileri */}
                  <View className="flex-row items-center flex-1">
                    <Checkbox
                      value={task.status === "completed"}
                      onValueChange={() => handleCheckbox(task.id)}
                      disabled={task.status === "completed"}
                      color={task.status === "completed" ? "#3b82f6" : undefined}
                      className="mr-4"
                    />
                      <Text
                        className="text-white"
                        style={
                          task.status === "completed"
                            ? {
                                textDecorationLine: "line-through",
                                color: "rgba(255,255,255,0.5)",
                              }
                            : {}
                        }
                      >
                        {task.task_name}
                      </Text>
                  </View>

                  {/* ✅ Sağ taraf butonlar */}
                  <View className="flex-row items-center ml-2">
                    {/* Important badge */}
                    {task.priority === "important" && (
                      <Text className="px-2 py-1 bg-orange-500/20 text-orange-300 text-[10px] rounded-full mr-2">
                        {t("taskItem.important")}
                      </Text>
                    )}
                    
                    {/* Info butonu */}
                    {(task.due_date || task.alarm_time || task.recurrence) && (
                      <Pressable
                        onPress={() =>
                          setActiveTaskId(activeTaskId === task.id ? null : task.id)
                        }
                        className="mr-2"
                      >
                        <Entypo name="info-with-circle" size={22} color="#7DD3FC" />
                      </Pressable>
                    )}
                    
                    {/* Delete butonu */}
                    <Pressable onPress={() => handleDelete(task.id)}>
                      <Feather name="x" size={22} color="#ef4444" />
                    </Pressable>
                  </View>
                </View>

                {/* ✅ Info popup */}
                {activeTaskId === task.id && (
                  <View className="mt-3 bg-white/20 p-3 rounded-lg">
                    {task.alarm_time && (
                      <Text className="text-white mb-1">
                        {t("taskItem.info.remind")}:{" "}
                        <Text className="text-blue-400">{task.alarm_time}</Text>
                      </Text>
                    )}
                    {task.due_date && (
                      <Text className="text-white mb-1">
                        {t("taskItem.info.due")}:{" "}
                        <Text className="text-blue-400">{task.due_date}</Text>
                      </Text>
                    )}
                    {task.recurrence && (
                      <Text className="text-white">
                        {t("taskItem.info.repeat")}:{" "}
                        <Text className="text-blue-400">{task.recurrence}</Text>
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}