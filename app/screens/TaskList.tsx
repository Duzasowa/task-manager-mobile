import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Task, RootStackParamList } from "../types";
import { useTasks } from "../context/TaskContext";
import { deleteTask, updateTask } from "../apiService";
import useLoader from "../hooks/useLoader";

type TaskListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskList"
>;

const TaskList: React.FC = () => {
  const navigation = useNavigation<TaskListNavigationProp>();
  const { tasks, fetchTasks } = useTasks();
  const { loading, showLoader, hideLoader } = useLoader();
  const [filter, setFilter] = React.useState<
    "ALL" | "PENDING" | "IN_PROGRESS" | "COMPLETED"
  >("ALL");

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "ALL") return true;
    return task.status === filter;
  });

  const handleMarkCompleted = async (id: string) => {
    showLoader();
    try {
      await updateTask(id, { status: "COMPLETED" });
      await fetchTasks(); // Refresh the task list after marking task as completed
    } catch (error) {
      console.error("Error marking task as completed:", error);
    } finally {
      hideLoader();
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskStatus}>Status: {item.status}</Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("TaskDetails", { taskId: item.id })}
      />
      <Button
        title="Mark Completed"
        onPress={() => handleMarkCompleted(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "ALL" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("ALL")}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "PENDING" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("PENDING")}
        >
          <Text style={styles.filterButtonText}>To Do</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "IN_PROGRESS" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("IN_PROGRESS")}
        >
          <Text style={styles.filterButtonText}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "COMPLETED" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("COMPLETED")}
        >
          <Text style={styles.filterButtonText}>Completed</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
      />
      <View style={styles.addButtonContainer}>
        <Button
          title="Add Task"
          onPress={() => navigation.navigate("TaskForm", { taskId: undefined })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1c1d",
    paddingTop: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#2b2c2d",
  },
  filterButtonActive: {
    backgroundColor: "#007bff",
  },
  filterButtonText: {
    color: "#ffffff",
  },
  taskList: {
    paddingHorizontal: 10,
    paddingBottom: 100, // Space for the add button
  },
  taskItem: {
    backgroundColor: "#2b2c2d",
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
  taskTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 8,
  },
  taskStatus: {
    color: "#888",
    marginBottom: 8,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    height: 90,
    backgroundColor: "#1b1c1d",
    paddingTop: 30,
  },
});
export default TaskList;
