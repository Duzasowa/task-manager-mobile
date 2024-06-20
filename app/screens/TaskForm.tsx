import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles, colors } from "../styles";

type RootStackParamList = {
  TaskForm: { taskId?: string };
  TaskList: undefined;
  TaskDetails: { taskId: string };
};

type TaskFormProps = NativeStackScreenProps<RootStackParamList, "TaskForm">;

const TaskForm: React.FC<TaskFormProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Логіка для додавання завдання
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={colors.textGray}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={colors.textGray}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskForm;
