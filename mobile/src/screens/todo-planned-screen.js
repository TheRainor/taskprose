import { useState, View, Text, ScrollView, Pressable, Checkbox, Entypo, Feather } from "../libs/index";
import { Header, StatusView } from "../components/index";
import { useTaskManagement } from "../hooks/index";

export default function TodoPlannedScreen({ navigation }) {
  const { tasks, loading, handleCheckbox, handleDelete } = useTaskManagement(navigation, "planned");
  const [activeTaskId, setActiveTaskId] = useState(null);
  
  return (
    <View className="bg-indigo-950 min-h-screen">
      <Header />
      <View className="absolute top-0 left-0 right-0 z-50">
        <StatusView loading={loading} />
      </View>
      <View className="w-[87%] mt-[7%] self-center flex-1">
        <Text className="text-white text-2xl mb-4">Planlanan Görevler</Text>

        <ScrollView>
          {tasks.length === 0 && (
            <Text className="text-gray-300 text-center mt-10">
              Henüz planlanan göreviniz yok.
            </Text>
          )}
          {tasks.map((task) => (
            <View
              key={task.id}
              className={`mb-4 bg-white/10 px-4 py-3 rounded-xl flex-row items-center justify-between ${task.priority === "important" ? "border-2 border-yellow-300" : ""}`}
            >
              <View className="flex-row items-center flex-1">
                <Checkbox
                  value={task.status === "completed"}
                  onValueChange={() => handleCheckbox(task.id)}
                  disabled={task.status === "completed"}
                  color={task.status === "completed" ? "#3b82f6" : undefined}
                  className="mr-4"
                />
                <View className="flex-col flex-shrink">
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
                    {task.title}
                  </Text>
                  <Text
                    className="text-white/80 text-sm"
                    style={
                      task.status === "completed"
                        ? {
                            textDecorationLine: "line-through",
                            color: "rgba(255,255,255,0.5)",
                          }
                        : {}
                    }
                  >
                    {task.description}
                  </Text>
                </View>
              </View>
              <Text
                className={`px-2 py-1 bg-orange-500/20 text-orange-300 text-[10px] rounded-full ${
                  task.priority === "important" ? "" : "hidden"
                }`}
              >
                Önemli
              </Text>
              <Pressable
                onPress={() =>
                  setActiveTaskId(activeTaskId === task.id ? null : task.id)
                }
                className={`${!task.due_date && !task.alarm_time && !task.recurrence ? "hidden" : ""}`}
              >
                <Entypo name="info-with-circle" size={22} color="#7DD3FC" />
              </Pressable>
              {activeTaskId === task.id && (
                <View className="absolute top-14 right-8 bg-white/30 p-2 rounded-lg">
                  {!!task.alarm_time && (
                    <Text className="text-white">
                      Anımsat:{" "}
                      <Text className="text-blue-400">{task.alarm_time}</Text>
                    </Text>
                  )}
                  {!!task.due_date && (
                    <Text className="text-white">
                      Son Tarih:{" "}
                      <Text className="text-blue-400">{task.due_date}</Text>
                    </Text>
                  )}
                  {!!task.recurrence && (
                    <Text className="text-white">
                      Yineleme:{" "}
                      <Text className="text-blue-400">{task.recurrence}</Text>
                    </Text>
                  )}
                </View>
              )}
              <Pressable onPress={() => handleDelete(task.id)}>
                <Feather name="x" size={22} color="red" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
