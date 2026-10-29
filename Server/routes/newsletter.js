import dotenv from "dotenv";
dotenv.config();
import express from "express";
import nodemailer from "nodemailer";
import Subscriber from "../models/Subscriber.js";
import adminAuth from "../Auth/adminAuth.js";

const router = express.Router();

// Admin auth middleware

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Subscribe
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  try {
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res
        .status(409)
        .json({ error: "This email is already subscribed." });
    }

    await Subscriber.create({ email });
    res.json({ message: "Subscribed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// Get all subscribers — admin only
router.get("/all", adminAuth, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ subscribers, total: subscribers.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscribers." });
  }
});

// Send email to all subscribers — admin only
router.post("/send", adminAuth, async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ error: "Subject and message are required." });
  }

  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });

    if (subscribers.length === 0) {
      return res.status(400).json({ error: "No subscribers found." });
    }

    const transporter = createTransporter();

    await transporter.verify();

    const emails = subscribers.map((s) => s.email);

    // HTML email template
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#0c0a09;font-family:'Helvetica Neue',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0a09;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#100e0d;border:1px solid rgba(201,168,124,0.2);max-width:600px;width:100%;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding:40px 48px 32px;border-bottom:1px solid rgba(201,168,124,0.15);">
                      <p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a87c;font-weight:300;">
                        Bloom Charity &amp; Fundraising Club
                      </p>
                    </td>
                  </tr>

                  <!-- Subject -->
                  <tr>
                    <td style="padding:40px 48px 0;">
                      <h1 style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;font-style:italic;color:#faf8f5;line-height:1.2;">
                        ${subject}
                      </h1>
                    </td>
                  </tr>

                  <!-- Gold line -->
                  <tr>
                    <td style="padding:24px 48px;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,#c9a87c,transparent);"></div>
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td style="padding:0 48px 40px;">
                      <p style="margin:0;font-size:14px;font-weight:300;color:#a89f96;line-height:1.9;letter-spacing:0.03em;white-space:pre-line;">
                        ${message}
                      </p>
                    </td>
                  </tr>


                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 48px;border-top:1px solid rgba(201,168,124,0.1);">
                      <p style="margin:0;font-size:10px;color:#a89f96;letter-spacing:0.05em;opacity:0.6;">
                        &copy; 2024 Bilkisu Ardo. All rights reserved. &nbsp;|&nbsp; Abuja, Nigeria
                      </p>
                      <p style="margin:8px 0 0;font-size:10px;color:#a89f96;letter-spacing:0.05em;opacity:0.4;">
                        You are receiving this because you subscribed to Bloom Charity newsletter.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send to all subscribers using BCC to protect privacy
    await transporter.sendMail({
      from: `"Bloom Charity" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      bcc: emails,
      subject,
      html,
    });

    res.json({
      message: `Email sent successfully to ${emails.length} subscriber${emails.length !== 1 ? "s" : ""}.`,
      count: emails.length,
    });
  } catch (err) {
    console.error("Email send error:", err.message);
    res
      .status(500)
      .json({ error: "Failed to send emails. Check your email credentials." });
  }
});

export default router;
