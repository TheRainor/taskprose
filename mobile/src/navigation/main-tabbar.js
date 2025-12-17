import {
  useState,
  View,
  Pressable,
  Ionicons,
  Octicons,
  Entypo,
  createBottomTabNavigator,
  Dimensions,
} from "../libs/index.js";
import {
  TodoAllScreen,
  TodoTodayScreen,
  TodoImportantScreen,
  TodoPlannedScreen,
  TodoCompletedScreen,
  ListsScreen,
  ListTaskScreen,
} from "../screens/index.js";
import {
  PageSelectionModal,
  ProfileModal,
  TaskAddModal,
  ListAddModal,
} from "../components/index.js";
import { useTaskManagement } from "../hooks/index.js";
import { useRoute, useEffect, getFocusedRouteNameFromRoute, useFocusEffect } from "../libs/index.js";
import { useListId } from "../context/index.js";

const Tab = createBottomTabNavigator();

const SCREEN_CONFIGS = [
  { name: "TodoAll", component: TodoAllScreen },
  { name: "TodoToday", component: TodoTodayScreen },
  { name: "TodoImportant", component: TodoImportantScreen },
  { name: "TodoPlanned", component: TodoPlannedScreen },
  { name: "TodoCompleted", component: TodoCompletedScreen },
  { name: "AllLists", component: ListsScreen },
  { name: "ListTaskScreen", component: ListTaskScreen },
];

export default function MainTabs({ navigation }) {
  // 🔢 Görev sayıları
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

  // 📐 Ekran genişliğini al
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = 56; // p-2 + icon ≈ 56px
  const rightPosition = (screenWidth - buttonWidth) / 2; // Merkeze hizalamak için right değeri

  // 🔒 Modal yönetimi
  const [modalStates, setModalStates] = useState({
    menu: false,
    taskAdd: false,
    listAdd: false,
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

  // 🔥 Şu an hangi ekrandayız?
  const route = useRoute();
  const [currentRoute, setCurrentRoute] = useState(getFocusedRouteNameFromRoute(route) || "TodoAll");

  const { currentListId } = useListId();

  // ✅ Navigation state değişikliklerini dinle
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const routeName = getFocusedRouteNameFromRoute(route) || "TodoAll";
      setCurrentRoute(routeName);
    });

    return unsubscribe;
  }, [navigation, route]);

  // ✅ Route değiştiğinde de güncelle
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || "TodoAll";
    setCurrentRoute(routeName);
  }, [route]);

  // whether we're on the top-level lists screen (used to toggle list vs task add button)
  const isAllListsScreen = currentRoute === "AllLists";
  // whether we're viewing a specific list's detail page (used to attach a new task to that list)
  const isListDetailScreen = currentRoute === "ListTaskScreen";

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
        {/* Tüm ekranları tanımlıyoruz ama tab bar'da gizliyoruz */}
        {SCREEN_CONFIGS.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{ tabBarButton: () => null }}
          />
        ))}

        {/* 🔁 Dinamik ekleme butonu */}
        <Tab.Screen
          key={`${isAllListsScreen ? 'ListAdd' : 'TaskAdd'}-${currentRoute}`}
          name={isAllListsScreen ? "ListAdd" : "TaskAdd"}
          component={View}
          options={{
            tabBarButton: () => (
              <Pressable
                onPress={() =>
                  toggleModal(isAllListsScreen ? "listAdd" : "taskAdd")
                }
                style={{ right: rightPosition }}
                className="absolute p-2 -bottom-1 bg-violet-700 rounded-full active:bg-violet-600"
              >
                <Entypo
                  name={isAllListsScreen ? "list" : "plus"}
                  size={35}
                  color="white"
                />
              </Pressable>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Sol alt: Menü butonu */}
      <Pressable
        onPress={() => toggleModal("menu")}
        className="absolute bottom-6 left-6 p-2 bg-violet-800 rounded-full active:bg-violet-700"
      >
        <Ionicons name="menu-outline" size={28} color="#E6E6E6" />
      </Pressable>

      {/* Sağ alt: Profil butonu */}
      <Pressable
        onPress={() => toggleModal("profile")}
        className="absolute bottom-6 right-6 p-2 bg-violet-800 rounded-full active:bg-violet-700"
      >
        <Octicons name="gear" size={28} color="#D9D9D9" />
      </Pressable>

      {/* Modallar */}
      <PageSelectionModal
        visible={modalStates.menu}
        onClose={() => toggleModal("menu")}
        onSelect={handleSelect}
        currentPage={currentRoute}
        counts={counts}
      />

      <TaskAddModal
        visible={modalStates.taskAdd}
        onClose={() => toggleModal("taskAdd")}
        // only pass a listId when we're on a list detail screen; otherwise ensure null
        listId={isListDetailScreen ? currentListId : null}
      />

      <ListAddModal
        visible={modalStates.listAdd}
        onClose={() => toggleModal("listAdd")}
      />

      <ProfileModal
        visible={modalStates.profile}
        onClose={() => toggleModal("profile")}
        navigation={navigation}
      />
    </>
  );
}
