import React from "react";
import ExpenseCard from "./ExpenseCard";

const ExpenseCardHolder = ({ data }) => {
  return (
    <div className="expense-card-holder">
      {data.map((expense) => (
        <ExpenseCard
          key={expense._id}
          title={expense.title}
          amount={expense.amount}
          category={expense.category}
          description={expense.description}
        />
      ))}
    </div>
  );
};

export default ExpenseCardHolder;
