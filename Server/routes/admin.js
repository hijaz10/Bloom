import express from "express";
import Payment from "../models/payment.js";

const router = express.Router();

// Simple password check middleware
function adminAuth(req, res, next) {
  const password = req.headers["x-admin-password"];
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Admin login check
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Wrong password" });
  }
  res.json({ success: true });
});

// Get all payments
router.get("/payments", adminAuth, async (req, res) => {
  try {
    const payments = await Payment.find({ status: "success" }).sort({
      paidAt: -1,
    });

    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// Get summary stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const total = await Payment.countDocuments({ status: "success" });
    const aggregate = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalAmount = aggregate[0]?.totalAmount || 0;

    const uniqueDonors = await Payment.distinct("email", { status: "success" });

    res.json({
      totalPayments: total,
      totalAmount,
      uniqueDonors: uniqueDonors.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
