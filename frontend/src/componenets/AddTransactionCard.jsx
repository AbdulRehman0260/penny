import React, { useState } from "react";
import { useTransactionStore } from "../store/transactionStore.js";

const AddTransactionCard = () => {
  const {
    closeExpenseForm,
    closeIncomeForm,
    submitExpenseForm,
    submitIncomeForm,
  } = useTransactionStore();

  const [transactionFormData, setTransactionFormData] = useState({
    amount: 0,
    type: "Expense",
    category: "",
    description: "",
    date: Date.now,
    recurring: "false",
    frequency: "None",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitExpenseForm(transactionFormData);
  };

  return (
    <div className="overlay">
      <div className="pop-card">
        <h2>Add Expense</h2>
        <br />
        <form onSubmit={handleSubmit} className="add-goal-form-container">
          <div className="add-goal-form-input">
            <label htmlFor="">Category</label>
            <input
              type="text"
              placeholder="Enter you category title here"
              value={transactionFormData.category}
              onChange={(e) =>
                setTransactionFormData({
                  ...transactionFormData,
                  category: e.target.value,
                })
              }
            />
          </div>
          <div className="add-goal-form-input">
            <label htmlFor="">Description</label>
            <textarea
              rows={4}
              placeholder="..."
              value={transactionFormData.description}
              onChange={(e) =>
                setTransactionFormData({
                  ...transactionFormData,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="add-goal-form-input">
            <label htmlFor="">Amount</label>
            <input
              type="number"
              placeholder=""
              value={transactionFormData.amount}
              onChange={(e) =>
                setTransactionFormData({
                  ...transactionFormData,
                  amount: e.target.value,
                })
              }
            />
          </div>
          <div className="add-goal-form-input">
            <label htmlFor="">Recurring</label>
            <select
              placeholder=""
              value={transactionFormData.recurring}
              onChange={(e) =>
                setTransactionFormData({
                  ...transactionFormData,
                  recurring: e.target.value,
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {transactionFormData.recurring == "true" ? (
            <div className="add-goal-form-input">
              <label htmlFor="">Frequency</label>
              <select
                placeholder=""
                value={transactionFormData.frequency}
                onChange={(e) =>
                  setTransactionFormData({
                    ...transactionFormData,
                    frequency: e.target.value,
                  })
                }
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          ) : (
            ""
          )}

          <div className="form-btn-container">
            <button
              type="button"
              className="form-create-btn"
              onClick={closeExpenseForm}
            >
              {" "}
              Cancel
            </button>
            <button type="submit" className="form-create-btn">
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddTransactionCard;
