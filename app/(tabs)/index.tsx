import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// Screens
import { JourneyProvider } from "@/context/JourneyContext";
import HomeScreen from "../../screens/HomeScreen";
import CompareScreen from "../../screens/CompareScreen";
import AddPhotoScreen from "../../screens/AddPhotoScreen";
import CreateJourneyScreen from "../../screens/CreateJourneyScreen";
import TimelineScreen from "../../screens/TimelineScreen";

// Types
export type RootStackParamList = {
  Main: undefined;
  CreateJourney: undefined;
  AddPhoto: { journeyId: string };
  Compare: { journeyId: string };
  Timeline: { journeyId: string };
};

export type TabParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <JourneyProvider>
      {/* <NavigationContainer> */}
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateJourney"
            component={CreateJourneyScreen}
            options={{ title: "New Journey" }}
          />
          <Stack.Screen
            name="AddPhoto"
            component={AddPhotoScreen}
            options={{ title: "Add Photo" }}
          />
          <Stack.Screen
            name="Compare"
            component={CompareScreen}
            options={{ title: "Compare Photos" }}
          />
          <Stack.Screen
            name="Timeline"
            component={TimelineScreen}
            options={{ title: "Timeline" }}
          />
        </Stack.Navigator>
      {/* </NavigationContainer> */}
    </JourneyProvider>
  );
}
