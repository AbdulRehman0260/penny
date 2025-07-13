import mongoose from "mongoose";
import Transaction from "../models/transactions.models.js";

export const addTransaction = async (req, res) => {
  const loggedInUserId = req.user._id;

  const { amount, type, category, description, recurring, frequency } =
    req.body;

  try {
    //amount cant be negative, amount has to be only numeric or float type. Cannot be string or character

    if (!amount || !type || !category) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid amount entered" });
    }

    if (typeof type !== "string") {
      return res.status(400).json({ message: "Invalid type input" });
    }

    if (typeof category !== "string") {
      return res.status(400).json({ message: "Invalid category input" });
    }
    const allowedTypes = ["income", "expense"];
    if (!allowedTypes.includes(type.toLowerCase())) {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    if (category.length < 1 || category.length > 30) {
      return res
        .status(400)
        .json({ message: "Category length criteria not met" });
    }

    if (description.length > 200) {
      return res.status(400).json({ message: "Description is too long" });
    }

    if (typeof description !== "string") {
      return res.status(400).json({ message: "Invalid description" });
    }

    const validFrequencies = ["daily", "weekly", "monthly", "yearly"];

    //save the transaction into the mongoose database
    const transactionData = {
      userId: loggedInUserId,
      amount,
      type,
      category,
      description,
      recurring,
      frequency,
    };

    const newTransaction = new Transaction(transactionData);
    //save the database
    await newTransaction.save();

    res.status(201).json({
      amount,
      type,
      category,
      description,
      recurring,
      frequency,
    });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const userTransactions = await Transaction.find({
      userId: { $eq: loggedInUserId },
    });
    res.status(200).json(userTransactions);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch transactions" });
  }
};

export const getMonthlyTransactions = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const userTransactions = await Transaction.find({
      userId: { $eq: loggedInUserId },
      recurring: true,
      frequency: "Monthly",
      type: "Expense",
    }).sort({ amount: -1 }); // largest first

    res.status(200).json(userTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Could not fetch transactions" });
  }
};

export const getMonthlyIncomeTransactions = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const userTransactions = await Transaction.find({
      userId: { $eq: loggedInUserId },
      recurring: true,
      frequency: "Monthly",
      type: "Income",
    }).sort({ amount: -1 }); // largest first

    res.status(200).json(userTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Could not fetch transactions" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    await Transaction.findByIdAndDelete(transactionId);
    res.status(200).json({ message: "Deleted transaction successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch transactions" });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { category, type, amount, description, recurring, frequency } =
    req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid transaction id" });
  }

  const updateFields = {};
  if (category !== undefined) updateFields.category = category;
  if (type !== undefined) updateFields.type = type;
  if (amount !== undefined) updateFields.amount = amount;
  if (description !== undefined) updateFields.description = description;
  if (recurring !== undefined) updateFields.recurring = recurring;

  if (recurring === "Yes") {
    if (frequency !== undefined) updateFields.frequency = frequency;
    const validFrequencies = ["daily", "weekly", "monthly", "yearly"];
    if (!validFrequencies.includes(frequency.toLowerCase())) {
      return res.status(400).json({
        error: `Frequency must be one of: ${validFrequencies.join(", ")}`,
      });
    }
    updateFields.frequency = frequency;
  }

  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction updated successfully", updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
};
