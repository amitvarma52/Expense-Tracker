/** @format */

const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controller/transactionController.js");
const router = express.Router();
// add transaction
router.post("/add-transection", addTransaction);
// edit transaction
router.post("/edit-transection", editTransaction);
// delete transaction
router.post("/delete-transection", deleteTransaction);
//get transaction by id
router.post("/get-transection", getAllTransaction);

module.exports = router;
