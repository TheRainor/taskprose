import { useState, View, Pressable, Ionicons, Octicons, Entypo, createBottomTabNavigator } from "../libs/index.js";
import { TodoAllScreen, TodoTodayScreen, TodoImportantScreen, TodoPlannedScreen, TodoCompletedScreen } from "../screens/index.js";
import { PageSelectionModal, ProfileModal, TaskAddModal } from "../components/index.js"; 
import { useTaskManagement } from "../hooks/index.js"; 

const Tab = createBottomTabNavigator();

const SCREEN_CONFIGS = [
  { name: "TodoAll", component: TodoAllScreen },
  { name: "TodoToday", component: TodoTodayScreen },
  { name: "TodoImportant", component: TodoImportantScreen },
  { name: "TodoPlanned", component: TodoPlannedScreen },
  { name: "TodoCompleted", component: TodoCompletedScreen },
];

export default function MainTabs({ navigation }) {
  const allTasks = useTaskManagement("all");
  const todayTasks = useTaskManagement("today");
  const importantTasks = useTaskManagement("important");
  const plannedTasks = useTaskManagement("planned");
  const completedTasks = useTaskManagement("completed");

  const counts = {
    all: allTasks.tasks.length,
    today: todayTasks.tasks.length,
    important: importantTasks.tasks.length,
    planned: plannedTasks.tasks.length,
    completed: completedTasks.tasks.length,
  };

  const [modalStates, setModalStates] = useState({
    menu: false,
    taskAdd: false,
    profile: false,
  });

  const toggleModal = (modalName) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const handleSelect = (pageKey) => {
    toggleModal("menu");
    navigation.navigate("MainTabs", { screen: pageKey });
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#9ca3af",
          tabBarStyle: {
            backgroundColor: "#1a1641",
            borderTopWidth: 0,
            height: 77,
          },
        }}
      >
        {/* Hidden but defined todo screens */}
        {SCREEN_CONFIGS.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{ tabBarButton: () => null }}
          />
        ))}

        {/* Add Task Button */}
        <Tab.Screen
          name="TaskAdd"
          component={View}
          options={{
            tabBarButton: () => (
              <Pressable
                onPress={() => toggleModal("taskAdd")}
                className="absolute p-2 -bottom-1 right-[173px] bg-violet-700 rounded-full"
              >
                <Entypo name="plus" size={35} color="white" />
              </Pressable>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Bottom Action Buttons */}
      <Pressable
        onPress={() => toggleModal("menu")}
        className="absolute bottom-6 left-6 p-2 bg-violet-800 rounded-full"
      >
        <Ionicons name="menu-outline" size={28} color="#E6E6E6" />
      </Pressable>

      <Pressable
        onPress={() => toggleModal("profile")}
        className="absolute bottom-6 right-6 p-2 bg-violet-800 rounded-full"
      >
        <Octicons name="gear" size={28} color="#D9D9D9" />
      </Pressable>

      {/* Modals */}
      <PageSelectionModal
        visible={modalStates.menu}
        onClose={() => toggleModal("menu")}
        onSelect={handleSelect}
        currentPage={null}
        counts={counts}
      />
      <TaskAddModal
        visible={modalStates.taskAdd}
        onClose={() => toggleModal("taskAdd")}
      />
      <ProfileModal
        visible={modalStates.profile}
        onClose={() => toggleModal("profile")}
        navigation={navigation}
      />
    </>
  );
}
