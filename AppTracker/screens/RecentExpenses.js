import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const ctx = useContext(ExpenseContext);

  const recent = ctx.expenses.filter((expense) => {
    const today = new Date();
    const dateAgo = getDateMinusDays(today, 7);

    return expense.date > dateAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recent}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses yet last 7 days"
    />
  );
}

export default RecentExpenses;
