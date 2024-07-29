/** @format */

const express = require("express");
const {
  addTransaction,
  getAllTransaction,
} = require("../controller/transactionController.js");
const router = express.Router();
// add transaction
router.post("/add-transection", addTransaction);
//get transaction by id
router.post("/get-transection", getAllTransaction);

module.exports = router;
