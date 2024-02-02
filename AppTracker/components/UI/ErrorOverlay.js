import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import Button from "./Button";

function ErrorOverlay({ messege, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Something went wrong</Text>
      <Text style={styles.text}>{messege}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.prrimary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
 
});

export default ErrorOverlay;
