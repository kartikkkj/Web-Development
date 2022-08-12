const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");
const app = express();
const crypto = require("crypto");
const path = require("path");
const port = process.env.PORT ||5000;

app.use(express.json({ extended: false }));
app.use(
  cors({
    // origin: `http://localhost:5000`,
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: true }));

app.post("/api/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: 20000,
      currency: "INR",
      receipt: "receipt_order_74394",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/api/success", async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === 'staging') {
  app.use(express.static("build"));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
app.listen(port, () => console.log(`server started on port ${port}`));
