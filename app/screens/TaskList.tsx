import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles, colors } from "../styles";

type RootStackParamList = {
  TaskForm: { taskId?: string };
  TaskList: undefined;
  TaskDetails: { taskId: string };
};

type TaskListProps = NativeStackScreenProps<RootStackParamList, "TaskList">;

interface Task {
  id: string;
  title: string;
  description: string;
}

const TaskList: React.FC<TaskListProps> = ({ navigation }) => {
  const tasks: Task[] = [
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("TaskDetails", { taskId: item.id })
              }
            >
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TaskForm", { taskId: undefined })}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskList;
