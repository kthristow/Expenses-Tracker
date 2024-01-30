import { Text, View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../contants/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpenseContext } from "../store/expense-context";

function ManageExpense({ route, navigation }) {
  const ctx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpense() {
    ctx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function onCancel() {
    navigation.goBack();
  }

  function onConfirm() {
    if (isEditing) {
      ctx.updateExpense(editedExpenseId, {
        description: "test",
        amount: 20.33,
        date: new Date("2002-02-20"),
      });
    } else {
      ctx.addExpense({
        description: "test",
        amount: 20.33,
        date: new Date("2002-02-20"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={onConfirm}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpense;
