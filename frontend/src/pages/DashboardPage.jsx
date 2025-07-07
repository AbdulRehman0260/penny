import React from "react";
import Sidebar from "../componenets/Sidebar";
import AddGoalCard from "../componenets/AddGoalCard";
import { useGoalStore } from "../store/useGoalStore.js";
import AddTransactionCard from "../componenets/AddTransactionCard";
import AddIncomeCard from "../componenets/AddIncomeCard";
import { useTransactionStore } from "../store/transactionStore.js";
import ExpenseCardHolder from "../componenets/ExpenseCardHolder";
import IncomeCardHolder from "../componenets/IncomeCardHolder";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const { showGoalForm } = useGoalStore();
  const {
    showExpenseForm,
    showIncomeForm,
    getMonthlyExpenseTransactions,
    getMonthlyIncomeTransactions,
    transactions,
    income,
  } = useTransactionStore();

  useEffect(() => {
    getMonthlyExpenseTransactions();
  }, []);

  useEffect(() => {
    getMonthlyIncomeTransactions();
  }, []);

  return (
    <div className="dash-page-container">
      <Sidebar />
      {showGoalForm ? <AddGoalCard /> : ""}
      {showExpenseForm ? <AddTransactionCard /> : ""}
      {showIncomeForm ? <AddIncomeCard /> : ""}
      <div className="monthly-picture">
        <ExpenseCardHolder data={transactions} />
        <IncomeCardHolder data={income} />
      </div>
    </div>
  );
};

export default DashboardPage;
