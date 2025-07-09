import React from "react";
import {
  CirclePlus,
  Pencil,
  Trash,
  DiamondMinus,
  DiamondPlus,
} from "lucide-react";
import { useGoalStore } from "../store/useGoalStore.js";
import { useTransactionStore } from "../store/transactionStore.js";

const Sidebar = () => {
  const { openGoalForm } = useGoalStore();
  const { openExpenseForm, openIncomeForm } = useTransactionStore();

  return (
    <div className="sidebar-container">
      <div className="sidebar-btn" onClick={openGoalForm}>
        <button className="add-goal-btn" onClick={openGoalForm}>
          {" "}
          Add Goal
        </button>
      </div>
      <div className="sidebar-btn" onClick={openExpenseForm}>
        <button className="add-goal-btn" onClick={openExpenseForm}>
          {" "}
          Add Expense
        </button>
      </div>
      <div className="sidebar-btn" onClick={openIncomeForm}>
        <button className="add-goal-btn" onClick={openIncomeForm}>
          {" "}
          Add Income
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
