import React from "react";
import ExpenseCard from "./ExpenseCard";
import { useTransactionStore } from "../store/transactionStore.js";

const LeftoverCard = () => {
  const { transactions, income } = useTransactionStore();
  const totalExpenseAmount = transactions.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalIncomeAmount = income.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="expense-card-holder">
      <h3>Monthly Balance</h3>
      <div className="expense-card-list">
        <ExpenseCard />
      </div>
      <div className="total-row">
        Total: {totalIncomeAmount - totalExpenseAmount}
      </div>
    </div>
  );
};

export default LeftoverCard;
