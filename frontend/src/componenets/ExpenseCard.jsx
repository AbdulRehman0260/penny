import React from "react";
import { Pencil, Trash } from "lucide-react";
import { useTransactionStore } from "../store/transactionStore";

const ExpenseCard = ({
  amount,
  category,
  description,
  recurring,
  frequency,
  type,
  id,
}) => {
  const amountStyle = {
    color: type === "income" ? "green" : "red",
    fontWeight: "bold",
    textAlign: "right",
  };

  const { onDelete, setEditData, openExpenseForm, openIncomeForm } =
    useTransactionStore();

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="expense-card">
      <p className="card-category">
        <strong>{category}</strong>
      </p>
      <p className="expense-description">{description}</p>
      <div className="expense-amount" style={amountStyle}>
        £{amount}
      </div>
      <Trash className="card-btn" onClick={handleDelete} />
      <Pencil
        className="card-btn"
        onClick={() => {
          setEditData({
            id,
            amount: Number(String(amount).replace(/,/g, "")),
            category,
            description,
            recurring,
            frequency,
          }); // full object
          if (type === "Expense") {
            openExpenseForm();
          } else {
            openIncomeForm();
          }
        }}
      />
    </div>
  );
};

export default ExpenseCard;
