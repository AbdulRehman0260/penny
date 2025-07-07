import React from "react";

const ExpenseCard = ({ title, amount, category, description }) => {
  return (
    <div className="expense-card">
      <div className="expense-header">
        <h3>{title}</h3>
        <div className="expense-amount">{amount}</div>
      </div>
      <div className="expense-details">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
