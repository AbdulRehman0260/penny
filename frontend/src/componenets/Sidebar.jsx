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
      <div className="goal-btn-container">
        <div className="sidebar-btn" onClick={openGoalForm}>
          <CirclePlus />
          <button className="add-goal-btn" onClick={openGoalForm}>
            {" "}
            Goal
          </button>
        </div>
        <div className="sidebar-btn">
          <Trash />
          <button className="add-goal-btn"> Goal</button>
        </div>
      </div>
      <div className="money-btn-container">
        <div className="sidebar-btn" onClick={openExpenseForm}>
          <DiamondMinus />
          <button className="add-goal-btn" onClick={openExpenseForm}>
            {" "}
            Expense
          </button>
        </div>
        <div className="sidebar-btn" onClick={openIncomeForm}>
          <DiamondPlus />
          <button className="add-goal-btn" onClick={openIncomeForm}>
            {" "}
            Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
