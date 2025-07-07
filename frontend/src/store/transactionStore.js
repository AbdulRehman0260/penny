import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTransactionStore = create((set) => ({
  showExpenseForm: false,
  showIncomeForm: false,
  openExpenseForm: () => set({ showExpenseForm: true }),
  closeExpenseForm: () => set({ showExpenseForm: false }),
  openIncomeForm: () => set({ showIncomeForm: true }),
  closeIncomeForm: () => set({ showIncomeForm: false }),

  submitExpenseForm: async (data) => {
    try {
      const res = await axiosInstance.post(
        "/transaction/add-transaction",
        data
      );
      toast.success("Expense added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ showExpenseForm: false });
    }
  },
  submitIncomeForm: async (data) => {
    try {
      const res = await axiosInstance.post(
        "/transaction/add-transaction",
        data
      );
      toast.success("Income added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ openIncomeForm: false });
    }
  },

  getExpenseTransactions: async () => {
    try {
      const res = await axiosInstance.get("/transaction/get-transactions");
      return res;
    } catch (error) {
      console.log("Error:", error);
    }
  },
}));
