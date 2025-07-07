import React from "react";

const ExpenseCard = ({ amount, category, description, type }) => {
  const amountStyle = {
    color: type === "income" ? "green" : "red",
    fontWeight: "bold",
    textAlign: "right",
  };

  return (
    <div className="expense-card">
      <p className="card-category">
        <strong>{category}</strong>
      </p>
      <p>{description}</p>
      <div className="expense-amount" style={amountStyle}>
        £{amount}
      </div>
    </div>
  );
};

export default ExpenseCard;
