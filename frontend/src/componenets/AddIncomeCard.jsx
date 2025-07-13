import React, { useEffect, useState } from "react";
import { useTransactionStore } from "../store/transactionStore";

const AddIncomeCard = () => {
  const {
    onEdit,
    isEditMode,
    editData,
    clearEditTransaction,
    closeIncomeForm,
    submitIncomeForm,
  } = useTransactionStore();

  const [transactionFormData, setTransactionFormData] = useState({
    amount: 0,
    type: "Income",
    category: "",
    description: "",
    date: Date.now(),
    recurring: "true",
    frequency: "Monthly",
  });

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      setTransactionFormData({
        amount: editData.amount,
        type: editData.type || "Income",
        category: editData.category || "",
        description: editData.description || "",
        date: editData.date || Date.now(),
        recurring: editData.recurring?.toString() || "false",
        frequency: editData.frequency || "None",
      });
    }
  }, [isEditMode, editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await onEdit(editData.id, transactionFormData);
      clearEditTransaction();
    } else {
      await submitIncomeForm(transactionFormData);
    }

    closeIncomeForm();
  };

  return (
    <div className="overlay">
      <div className="pop-card">
        <h2>{isEditMode ? "Edit Income" : "Add Income"}</h2>
        <form onSubmit={handleSubmit} className="add-goal-form-container">
          <div className="add-goal-form-input">
            <label>Category</label>
            <input
              type="text"
              value={transactionFormData.category}
              onChange={(e) =>
                setTransactionFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
          </div>
          <div className="add-goal-form-input">
            <label>Description</label>
            <textarea
              rows={4}
              value={transactionFormData.description}
              onChange={(e) =>
                setTransactionFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="add-goal-form-input">
            <label>Amount</label>
            <input
              type="number"
              value={transactionFormData.amount}
              onChange={(e) =>
                setTransactionFormData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="add-goal-form-input">
            <label>Recurring</label>
            <select
              value={transactionFormData.recurring}
              onChange={(e) =>
                setTransactionFormData((prev) => ({
                  ...prev,
                  recurring: e.target.value,
                }))
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {transactionFormData.recurring === "true" && (
            <div className="add-goal-form-input">
              <label>Frequency</label>
              <select
                value={transactionFormData.frequency}
                onChange={(e) =>
                  setTransactionFormData((prev) => ({
                    ...prev,
                    frequency: e.target.value,
                  }))
                }
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          )}

          <div className="form-btn-container">
            <button
              type="button"
              className="form-create-btn"
              onClick={() => {
                clearEditTransaction();
                closeIncomeForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="form-create-btn">
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeCard;
