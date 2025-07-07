import React from "react";
import Sidebar from "../componenets/Sidebar";
import AddGoalCard from "../componenets/AddGoalCard";
import { useGoalStore } from "../store/useGoalStore.js";
import AddTransactionCard from "../componenets/AddTransactionCard";
import { useTransactionStore } from "../store/transactionStore.js";
import ExpenseCardHolder from "../componenets/ExpenseCardHolder";

const expenses = [
  {
    _id: "1",
    title: "Grocery Shopping",
    amount: 85.5,
    category: "food",
    description: "Weekly groceries from the local supermarket",
  },
  {
    _id: "2",
    title: "Salary Payment",
    amount: 3500.0,
    category: "income",
    description: "Monthly salary payment",
  },
  {
    _id: "3",
    title: "Gas Station",
    amount: 45.75,
    category: "transport",

    description: "Fuel for the car",
  },
  {
    _id: "4",
    title: "Movie Tickets",
    amount: 28.0,
    category: "entertainment",
    description: "Movie night with friends",
  },
  {
    _id: "5",
    title: "Electric Bill",
    amount: 120.3,
    category: "utilities",
    description: "Monthly electricity bill",
  },
];

const DashboardPage = () => {
  const { showGoalForm } = useGoalStore();
  const { showExpenseForm, getExpenseTransactions } = useTransactionStore();
  const d = getExpenseTransactions();
  console.log(d);
  return (
    <div className="dash-page-container">
      <Sidebar />
      {showGoalForm ? <AddGoalCard /> : ""}
      {showExpenseForm ? <AddTransactionCard /> : ""}
      <ExpenseCardHolder data={expenses} />
    </div>
  );
};

export default DashboardPage;
