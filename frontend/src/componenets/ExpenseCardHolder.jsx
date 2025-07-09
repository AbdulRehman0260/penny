import React from "react";
import ExpenseCard from "./ExpenseCard";

const ExpenseCardHolder = ({ data }) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  console.log(totalAmount);

  return (
    <div className="expense-card-holder">
      <h3>Monthly Expenses</h3>
      <div className="expense-card-list">
        {data.map((expense) => (
          <ExpenseCard
            key={expense._id}
            title={expense.title}
            amount={expense.amount.toLocaleString("en-GB")}
            category={expense.category}
            description={expense.description}
            type="expense"
            id={expense._id}
          />
        ))}
      </div>
      <div className="total-row">
        Total: £{totalAmount.toLocaleString("en-GB")}
      </div>
    </div>
  );
};

export default ExpenseCardHolder;
