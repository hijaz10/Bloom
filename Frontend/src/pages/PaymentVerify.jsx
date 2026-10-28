import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | failed
  const [payment, setPayment] = useState(null);

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          `${import.meta.env.BACKEND_URL}/api/payment/verify/${reference}`,
        );
        const data = await res.json();
        setStatus(data.status);
        setPayment(data.payment);
      } catch (err) {
        setStatus("failed");
      }
    }

    verify();
  }, [reference]);

  return (
    <div>
      <section
        className="bg-site w-full min-h-screen flex flex-col justify-center"
        style={{ padding: "96px 24px 80px" }}
      >
        <div
          className="max-w-xl mx-auto flex flex-col items-center text-center"
          style={{ gap: "32px" }}
        >
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
              style={{ gap: "20px" }}
            >
              <div
                className="border-t border-[var(--color-gold)] rounded-full"
                style={{
                  width: "48px",
                  height: "48px",
                  animation: "spin 1s linear infinite",
                  border: "1px solid rgba(201,168,124,0.2)",
                  borderTop: "1px solid var(--color-gold)",
                }}
              />
              <p className="eyebrow text-[var(--color-muted)]">
                Verifying your payment...
              </p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
              style={{ gap: "24px" }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "72px",
                  height: "72px",
                  border: "1px solid var(--color-gold)",
                }}
              >
                <span
                  style={{ color: "var(--color-gold)", fontSize: "1.75rem" }}
                >
                  ✓
                </span>
              </div>

              <p className="eyebrow text-[var(--color-gold)]">
                Payment Successful
              </p>

              <h1
                className="font-display font-light italic text-[var(--color-white)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Thank you,
                <br />
                {payment?.name || "dear donor"}.
              </h1>

              <div className="gold-line" style={{ width: "80px" }} />

              <p
                className="text-[var(--color-muted)] font-light leading-relaxed"
                style={{ fontSize: "0.875rem" }}
              >
                Your donation of{" "}
                <span style={{ color: "var(--color-gold)" }}>
                  ₦{payment?.amount?.toLocaleString()}
                </span>{" "}
                has been received. You are helping a child bloom.
              </p>

              {/* Payment details */}
              <div
                className="glass-card w-full text-left flex flex-col"
                style={{ padding: "24px", gap: "12px" }}
              >
                {[
                  { label: "Reference", value: payment?.reference },
                  { label: "Email", value: payment?.email },
                  {
                    label: "Amount",
                    value: `₦${payment?.amount?.toLocaleString()}`,
                  },
                  { label: "Channel", value: payment?.channel },
                  {
                    label: "Date",
                    value: payment?.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between"
                    style={{
                      borderBottom: "1px solid rgba(201,168,124,0.1)",
                      paddingBottom: "10px",
                    }}
                  >
                    <span className="eyebrow text-[var(--color-muted)]">
                      {row.label}
                    </span>
                    <span
                      className="font-light text-[var(--color-white)]"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-wrap justify-center"
                style={{ gap: "12px" }}
              >
                <Link to="/payment/history">
                  <span className="btn-gold">View My History</span>
                </Link>
                <Link to="/">
                  <span className="btn-gold-fill">Back to Home</span>
                </Link>
              </div>
            </motion.div>
          )}

          {status === "failed" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
              style={{ gap: "24px" }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "72px",
                  height: "72px",
                  border: "1px solid var(--color-pink)",
                }}
              >
                <span
                  style={{ color: "var(--color-pink)", fontSize: "1.75rem" }}
                >
                  ✕
                </span>
              </div>

              <p className="eyebrow" style={{ color: "var(--color-pink)" }}>
                Payment Failed
              </p>

              <h1
                className="font-display font-light italic text-[var(--color-white)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                Something went wrong.
              </h1>

              <p
                className="text-[var(--color-muted)] font-light leading-relaxed"
                style={{ fontSize: "0.875rem" }}
              >
                Your payment could not be verified. No money has been deducted.
                Please try again.
              </p>

              <Link to="/donate">
                <span className="btn-gold-fill">Try Again</span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </div>
  );
}
