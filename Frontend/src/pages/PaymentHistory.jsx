import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PaymentHistory() {
  const [email, setEmail] = useState("");
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");
    setPayments([]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/history/${encodeURIComponent(email)}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch history.");
        setStatus("error");
        return;
      }

      setPayments(data.payments);
      setStatus("done");
    } catch (err) {
      setError("Could not connect to server.");
      setStatus("error");
    }
  }

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <section
        className="bg-site w-full min-h-screen flex flex-col"
        style={{ padding: "96px 24px 80px" }}
      >
        <div
          className="max-w-3xl mx-auto w-full flex flex-col"
          style={{ gap: "48px" }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
            style={{ gap: "16px" }}
          >
            <p className="eyebrow">Donor Portal</p>
            <h1
              className="font-display font-light italic text-[var(--color-white)]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Your giving
              <br />
              history.
            </h1>
            <div className="gold-line" style={{ width: "80px" }} />
            <p
              className="text-[var(--color-muted)] font-light"
              style={{ fontSize: "0.875rem" }}
            >
              Enter the email address you used when donating to view your
              history.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card flex flex-col md:flex-row items-end"
            style={{ padding: "32px", gap: "20px" }}
          >
            <div className="flex-1 flex flex-col w-full" style={{ gap: "4px" }}>
              <label className="eyebrow text-[var(--color-muted)]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="luxury-input"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={status === "loading"}
              className="btn-gold-fill"
              style={{
                whiteSpace: "nowrap",
                opacity: status === "loading" ? 0.6 : 1,
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? "Searching..." : "View History"}
            </button>
          </motion.div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: "var(--color-pink)",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
              }}
            >
              {error}
            </p>
          )}

          {/* Results */}
          <AnimatePresence>
            {status === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
                style={{ gap: "24px" }}
              >
                {payments.length === 0 ? (
                  <div
                    className="glass-card text-center"
                    style={{ padding: "48px" }}
                  >
                    <p className="eyebrow text-[var(--color-muted)]">
                      No donations found for this email.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Summary */}
                    <div
                      className="grid grid-cols-2 md:grid-cols-3"
                      style={{ gap: "12px" }}
                    >
                      {[
                        {
                          label: "Total Donated",
                          value: `₦${total.toLocaleString()}`,
                        },
                        { label: "Donations Made", value: payments.length },
                        {
                          label: "Last Donation",
                          value: new Date(
                            payments[0].paidAt,
                          ).toLocaleDateString("en-NG", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }),
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="glass-card flex flex-col"
                          style={{ padding: "20px 24px", gap: "6px" }}
                        >
                          <p
                            className="font-display font-light text-[var(--color-gold)]"
                            style={{ fontSize: "1.75rem" }}
                          >
                            {s.value}
                          </p>
                          <p
                            className="eyebrow text-[var(--color-muted)]"
                            style={{ fontSize: "0.55rem" }}
                          >
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Payment list */}
                    <div className="flex flex-col" style={{ gap: "12px" }}>
                      {payments.map((p, i) => (
                        <motion.div
                          key={p._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="glass-card flex flex-col md:flex-row md:items-center justify-between"
                          style={{ padding: "20px 24px", gap: "12px" }}
                        >
                          <div className="flex flex-col" style={{ gap: "4px" }}>
                            <p
                              className="font-display font-light italic text-[var(--color-white)]"
                              style={{ fontSize: "1.25rem" }}
                            >
                              ₦{p.amount.toLocaleString()}
                            </p>
                            <p
                              className="eyebrow text-[var(--color-muted)]"
                              style={{ fontSize: "0.55rem" }}
                            >
                              {p.reference}
                            </p>
                          </div>
                          <div
                            className="flex flex-col md:items-end"
                            style={{ gap: "4px" }}
                          >
                            <p
                              className="text-[var(--color-muted)] font-light"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {new Date(p.paidAt).toLocaleDateString("en-NG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <p
                              className="eyebrow"
                              style={{
                                fontSize: "0.55rem",
                                color: "var(--color-gold)",
                                textTransform: "capitalize",
                              }}
                            >
                              {p.channel || "card"}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginTop: "16px" }}>
            <Link to="/donate">
              <span className="btn-gold">Make Another Donation</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
