import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getTaskById, deleteTask } from "../apiService";
import useLoader from "../hooks/useLoader";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../context/TaskContext";

type TaskDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "TaskDetails"
>;

interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { tasks, fetchTasks } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const { loading, showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchTask = async () => {
      showLoader();
      try {
        const fetchedTask = await getTaskById(taskId);
        setTask(fetchedTask);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        hideLoader();
      }
    };
    fetchTask();
  }, [taskId, navigation]);

  const handleDeleteTask = async () => {
    showLoader();
    try {
      await deleteTask(taskId);
      fetchTasks();
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      hideLoader();
    }
  };

  if (loading || !task) {
    return (
      <View style={customStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.status}>Status: {task.status}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Task"
          onPress={() => navigation.navigate("TaskForm", { taskId: task.id })}
        />
        <Button title="Delete Task" onPress={handleDeleteTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1b1c1d",
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#b0b0b0",
    fontSize: 16,
    marginBottom: 8,
  },
  status: {
    color: "#d0d0d0",
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "48%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

const customStyles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default TaskDetails;
