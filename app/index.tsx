import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskList from "./screens/TaskList";
import TaskForm from "./screens/TaskForm";
import TaskDetails from "./screens/TaskDetails";
import { Ionicons } from "@expo/vector-icons";
import { TaskProvider } from "./context/TaskContext";

type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetails: { taskId: string };
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface CustomHeaderProps {
  title: string;
  canGoBack?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, canGoBack }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, { marginLeft: canGoBack ? 10 : 0 }]}>
        {title}
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={({ navigation, route }) => ({
          header: (props) => (
            <CustomHeader
              title={props.options.title ?? "Task Manager"}
              canGoBack={navigation.canGoBack()}
            />
          ),
        })}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskList}
          options={{ title: "Task List" }}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskForm}
          options={{ title: "Task Form" }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{ title: "Task Details" }}
        />
      </Stack.Navigator>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60, // Custom height for the header
    backgroundColor: "#1b1c1d", // Dark background similar to Steam
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "#ffffff", // White text color
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    marginRight: 10,
  },
});
