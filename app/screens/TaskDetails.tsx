import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "../styles";

type RootStackParamList = {
  TaskForm: { taskId?: string };
  TaskList: undefined;
  TaskDetails: { taskId: string };
};

type TaskDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "TaskDetails"
>;

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    // Логіка для отримання деталей завдання
    const fetchedTask: Task = {
      id: taskId,
      title: "Task 1",
      description: "Description 1",
      status: "Pending",
    };
    setTask(fetchedTask);
  }, [taskId]);

  if (!task) {
    return <Text style={styles.title}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.description}>Status: {task.status}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TaskForm", { taskId })}
      >
        <Text style={styles.buttonText}>Edit Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetails;
