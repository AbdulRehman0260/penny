import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTransactionStore = create((set) => ({
  transactions: [],
  income: [],
  showExpenseForm: false,
  showIncomeForm: false,
  openExpenseForm: () => set({ showExpenseForm: true }),
  closeExpenseForm: () => set({ showExpenseForm: false }),
  openIncomeForm: () => set({ showIncomeForm: true }),
  closeIncomeForm: () => set({ showIncomeForm: false }),

  submitExpenseForm: async (data) => {
    try {
      await axiosInstance.post("/transaction/add-transaction", data);
      toast.success("Expense added successfully");
      const res = await axiosInstance.get(
        "/transaction/get-transactions/monthly"
      );
      set({ transactions: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ showExpenseForm: false });
    }
  },
  submitIncomeForm: async (data) => {
    try {
      await axiosInstance.post("/transaction/add-transaction", data);
      toast.success("Income added successfully");
      const res = await axiosInstance.get(
        "transaction/get-transactions/income-monthly"
      );
      set({ income: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ showIncomeForm: false });
    }
  },

  getMonthlyIncomeTransactions: async () => {
    try {
      const res = await axiosInstance.get(
        "/transaction/get-transactions/income-monthly"
      );
      set({ income: res.data });
    } catch (error) {
      console.log("Error:", error);
    }
  },

  getMonthlyExpenseTransactions: async () => {
    try {
      const res = await axiosInstance.get(
        "/transaction/get-transactions/monthly"
      );
      set({ transactions: res.data });
    } catch (error) {
      console.log("Error:", error);
    }
  },
}));
