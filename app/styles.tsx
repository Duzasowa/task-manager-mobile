import { StyleSheet } from "react-native";

export const colors = {
  background: "#1b2838",
  card: "#2a475e",
  accent: "#66c0f4",
  text: "#ffffff",
  textGray: "#c7d5e0",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textGray,
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
});
