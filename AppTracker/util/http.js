import axios from "axios";
const API_URL = "https://expensetracker-2c26a-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(API_URL + "/expenses.jsona", expenseData);
  const id = response.data.name;
  return id;
}

export async function getExpenses() {
  const response = await axios.get(API_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(API_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(API_URL + `/expenses/${id}.json`);
}
