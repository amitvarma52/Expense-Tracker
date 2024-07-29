/** @format */

const transactionModel = require("../model/transactionModel.js");
const addTransaction = async (req,res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(200).json({
      success: true,
      newTransaction,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};
const getAllTransaction = async (req,res) => {
  try {
    const allTransaction = await transactionModel.find({userid:req.body.userid});
    res.status(200).json(allTransaction);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
module.exports={ getAllTransaction, addTransaction }