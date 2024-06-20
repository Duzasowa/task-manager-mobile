import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Task } from "../types";
import { createTask, getTaskById, updateTask } from "../apiService";
import useLoader from "../hooks/useLoader";
import DropDownPicker from "react-native-dropdown-picker";
import { useTasks } from "../context/TaskContext";

type TaskFormProps = NativeStackScreenProps<RootStackParamList, "TaskForm">;

const TaskForm: React.FC<TaskFormProps> = ({ route, navigation }) => {
  const { fetchTasks } = useTasks();
  const { taskId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"PENDING" | "IN_PROGRESS" | "COMPLETED">(
    "PENDING"
  );
  const { loading, showLoader, hideLoader } = useLoader();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
  ]);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId]);

  const fetchTask = useCallback(
    async (taskId: string) => {
      showLoader();
      try {
        const task = await getTaskById(taskId);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        hideLoader();
      }
    },
    [showLoader, hideLoader]
  );

  const validateForm = useCallback(() => {
    let valid = true;
    if (title.trim().length < 1) {
      setTitleError("Title must be at least 1 character long.");
      valid = false;
    } else {
      setTitleError("");
    }
    if (description.trim().length < 1) {
      setDescriptionError("Description must be at least 1 character long.");
      valid = false;
    } else {
      setDescriptionError("");
    }
    return valid;
  }, [title, description]);

  const handleSaveTask = useCallback(async () => {
    if (!validateForm()) return;

    showLoader();
    try {
      const taskData = { title, description, status };
      if (taskId) {
        await updateTask(taskId, taskData);
      } else {
        await createTask(taskData);
      }
      fetchTasks();
      navigation.navigate("TaskList");
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      hideLoader();
    }
  }, [
    title,
    description,
    status,
    taskId,
    validateForm,
    fetchTasks,
    showLoader,
    hideLoader,
    navigation,
  ]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        maxLength={30}
      />
      {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
      <Text style={styles.charCount}>{title.length}/30</Text>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        maxLength={100}
      />
      {descriptionError ? (
        <Text style={styles.errorText}>{descriptionError}</Text>
      ) : null}
      <Text style={styles.charCount}>{description.length}/100</Text>
      <DropDownPicker
        open={open}
        value={status}
        items={items}
        setOpen={setOpen}
        setValue={setStatus}
        setItems={setItems}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownContainerStyle}
        labelStyle={styles.dropdownLabelStyle}
      />
      <Button title="Save Task" onPress={handleSaveTask} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1b1c1d",
  },
  input: {
    backgroundColor: "#2b2c2d",
    color: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: "#2b2c2d",
    borderColor: "#444",
  },
  dropdownText: {
    color: "#ffffff",
  },
  dropdownContainerStyle: {
    backgroundColor: "#2b2c2d",
  },
  dropdownLabelStyle: {
    color: "#ffffff",
  },
  charCount: {
    color: "#888",
    textAlign: "right",
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default TaskForm;
