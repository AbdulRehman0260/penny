import React from "react";
import ExpenseCard from "./ExpenseCard";

const IncomeCardHolder = ({ data }) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  console.log(totalAmount);

  return (
    <div className="expense-card-holder">
      <h3>Monthly Income</h3>
      <div className="income-card-list">
        {data.map((income) => (
          <ExpenseCard
            key={income._id}
            title={income.title}
            amount={income.amount.toLocaleString("en-GB")}
            category={income.category}
            description={income.description}
            type="income"
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
