import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "../styles";

type RootStackParamList = {
  NotFound: undefined;
  TaskList: undefined;
};

type NotFoundScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NotFound"
>;

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.description}>This screen doesn't exist.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TaskList")}
      >
        <Text style={styles.buttonText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;
