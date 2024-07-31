/** @format */

const transactionModel = require("../model/transactionModel.js");
const moment=require('moment')
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(200).json({
      success: true,
      newTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate,type } = req.body;

    const allTransaction = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      ...(type !== "all" && { type }),
      userid: req.body.userid,
    });

    res.status(200).json(allTransaction);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
module.exports = { getAllTransaction, addTransaction };
