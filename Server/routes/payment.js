import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import Payment from "../models/payment.js";

const router = express.Router();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
// Initialize payment
router.post("/initialize", async (req, res) => {
  const { name, email, amount } = req.body;

  if (!name || !email || !amount) {
    return res
      .status(400)
      .json({ error: "Name, email and amount are required" });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, //  kobo
        metadata: { name, email },
        callback_url: `${process.env.CLIENT_URL}/payment/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      },
    );

    const { authorization_url, reference } = response.data.data;

    await Payment.create({
      name,
      email,
      amount,
      reference,
      status: "pending",
    });

    res.json({ authorization_url, reference });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to initialize payment" });
  }
});

// Verify payment
router.get("/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      },
    );

    const data = response.data.data;
    const status = data.status === "success" ? "success" : "failed";

    const payment = await Payment.findOneAndUpdate(
      { reference },
      {
        status,
        channel: data.channel,
        paidAt: data.paid_at ? new Date(data.paid_at) : null,
      },
      { new: true },
    );

    res.json({ status, payment });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

// Get payments by email
router.get("/history/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const payments = await Payment.find({
      email: email.toLowerCase(),
      status: "success",
    }).sort({ paidAt: -1 });

    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

export default router;
