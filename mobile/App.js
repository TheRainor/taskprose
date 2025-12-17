import "./global.css";
import "./src/libs/i18n";
import {
  NavigationContainer,
  createNativeStackNavigator,
} from "./src/libs/index.js";
import { LoginScreen, RegisterScreen } from "./src/screens/index.js";
import MainTabs from "./src/navigation/main-tabbar.js";
import {
  UserProvider,
  RefreshProvider,
  TaskCountsProvider,
  ListCountsProvider,
  ListIdProvider,
  MessageProvider,
} from "./src/context/index.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <RefreshProvider>
        <TaskCountsProvider>
          <ListCountsProvider>
            <MessageProvider>
              <ListIdProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      gestureEnabled: false,
                    }}
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
              </ListIdProvider>
            </MessageProvider>
          </ListCountsProvider>
        </TaskCountsProvider>
      </RefreshProvider>
    </UserProvider>
  );
}
