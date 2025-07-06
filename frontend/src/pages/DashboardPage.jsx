import React from "react";
import Sidebar from "../componenets/Sidebar";
import AddGoalCard from "../componenets/AddGoalCard";
import { useGoalStore } from "../store/useGoalStore.js";
import AddTransactionCard from "../componenets/AddTransactionCard";
import { useTransactionStore } from "../store/transactionStore.js";

const DashboardPage = () => {
  const { showGoalForm } = useGoalStore();
  const { showExpenseForm } = useTransactionStore();

  return (
    <div className="dash-page-container">
      <Sidebar />
      {showGoalForm ? <AddGoalCard /> : ""}
      {showExpenseForm ? <AddTransactionCard /> : ""}
    </div>
  );
};

export default DashboardPage;
