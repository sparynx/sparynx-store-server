const express = require('express');

const {createOrder, getOrderByEmail , sendOrderDetails} = require("./order.controller")

const router = express.Router();

//post request to create order
router.post("/", createOrder)

//get orders by users email address

router.get("/email/:email", getOrderByEmail)

//send order details tothe user

router.post("/send-email", sendOrderDetails)

module.exports = router;