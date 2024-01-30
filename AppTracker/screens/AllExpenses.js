import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

function AllExpenses() {
  const expenseContext = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expenseContext.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses yet"
    />
  );
}

export default AllExpenses;
