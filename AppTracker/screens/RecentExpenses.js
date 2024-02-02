import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const ctx = useContext(ExpenseContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        ctx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses');
      }
      setIsFetching(false);
    }
    fetchExpenses();
  }, []);

  function errorResetHandler() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay messege={error} onConfirm={errorResetHandler}/>
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
