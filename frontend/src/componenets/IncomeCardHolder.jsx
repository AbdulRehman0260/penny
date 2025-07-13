import React from "react";
import ExpenseCard from "./ExpenseCard";
import { useTransactionStore } from "../store/transactionStore";

const IncomeCardHolder = () => {
  const { income } = useTransactionStore();
  const totalAmount = income.reduce((sum, item) => sum + item.amount, 0);
  console.log(totalAmount);

  return (
    <div className="expense-card-holder">
      <h3>Monthly Income</h3>
      <div className="income-card-list">
        {income.map((income) => (
          <ExpenseCard
            key={income._id}
            title={income.title}
            amount={income.amount.toLocaleString("en-GB")}
            category={income.category}
            description={income.description}
            type="income"
            recurring={income.recurring}
            frequency={income.frequency}
            id={income._id}
          />
        ))}
      </div>
      <div className="total-row-income">
        Total: £{totalAmount.toLocaleString("en-GB")}
      </div>
    </div>
  );
};

export default IncomeCardHolder;
