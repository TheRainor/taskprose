import "./global.css";
import { NavigationContainer, createNativeStackNavigator } from "./src/libs/index.js"
import { LoginScreen, RegisterScreen } from "./src/screens/index.js"
import MainTabs from "./src/navigation/main-tabbar.js";
import { UserProvider, TaskRefreshProvider, MessageProvider } from "./src/context/index.js"


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <TaskRefreshProvider>
    <MessageProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MessageProvider>
    </TaskRefreshProvider>
    </UserProvider>
  );
}
