import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const tiers = [
  {
    label: "Seed",
    amount: 1000,
    display: "₦1,000",
    desc: "Provides a meal for a child for a week.",
  },
  {
    label: "Bloom",
    amount: 5000,
    display: "₦5,000",
    desc: "Covers school supplies for one child.",
  },
  {
    label: "Harvest",
    amount: 20000,
    display: "₦20,000",
    desc: "Sponsors a child for an entire month.",
  },
];

export default function Donate() {
  const [form, setForm] = useState({ name: "", email: "", amount: "" });
  const [selectedTier, setSelectedTier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function selectTier(tier) {
    setSelectedTier(tier.label);
    setForm((prev) => ({ ...prev, amount: tier.amount }));
    setError("");
    toast.success("Selected, Please Continue Below");
  }

  async function handleDonate() {
    const { name, email, amount } = form;

    if (!name || !email || !amount) {
      setError("Please fill in your name, email and amount.");
      return;
    }

    if (isNaN(amount) || Number(amount) < 100) {
      setError("Minimum donation is ₦100.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/initialize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, amount: Number(amount) }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.authorization_url;
    } catch (err) {
      setError("Could not connect to server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <section
        className="bg-site w-full min-h-[60vh] flex flex-col justify-center"
        style={{ padding: "96px 32px 64px" }}
      >
        <div
          className="max-w-7xl mx-auto w-full flex flex-col"
          style={{ gap: "24px" }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Make a Difference
          </motion.p>
          <motion.h1
            className="font-display text-6xl md:text-8xl font-light italic text-[var(--color-white)] leading-tight"
            style={{ maxWidth: "672px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            A little can
            <br />
            move the world.
          </motion.h1>
          <motion.div
            className="gold-line"
            style={{ width: "80px", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-[var(--color-muted)] text-sm font-light leading-loose tracking-wide"
            style={{ maxWidth: "448px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Your generosity directly supports orphans in Nigeria. providing
            food, education, and the simple knowledge that someone cares.
          </motion.p>
        </div>
      </section>

      <section
        className="bg-[var(--color-footer)]"
        style={{ padding: "96px 32px" }}
      >
        <div
          className="max-w-7xl mx-auto flex flex-col"
          style={{ gap: "56px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center flex flex-col items-center"
            style={{ gap: "16px" }}
          >
            <p className="eyebrow">Choose Your Impact</p>
            <h2 className="font-display text-4xl font-light italic text-[var(--color-white)]">
              Giving Tiers
            </h2>
            <div className="gold-line" style={{ width: "80px" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(201,168,124,0.12)]">
            {tiers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ backgroundColor: "rgba(201,168,124,0.06)" }}
                onClick={() => selectTier(t)}
                className="glass-card flex flex-col transition-colors cursor-pointer"
                style={{
                  padding: "48px",
                  gap: "24px",
                  border:
                    selectedTier === t.label
                      ? "1px solid var(--color-gold)"
                      : "1px solid rgba(201,168,124,0.18)",
                }}
              >
                <p className="eyebrow text-[var(--color-gold)]">{t.label}</p>
                <p className="font-display text-5xl font-light text-[var(--color-white)]">
                  {t.display}
                </p>

                <span
                  className="btn-gold text-xs"
                  style={{ alignSelf: "flex-start" }}
                >
                  {selectedTier === t.label ? "Selected" : `Give ${t.label}`}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-site w-full" style={{ padding: "112px 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
          style={{ gap: "32px" }}
        >
          <p className="eyebrow">Custom Amount</p>
          <h2 className="font-display text-4xl md:text-5xl font-light italic text-[var(--color-white)] leading-snug">
            Every contribution big or small matters deeply.
          </h2>

          <div className="gold-line" style={{ width: "80px" }} />

          <div className="w-full flex flex-col" style={{ gap: "24px" }}>
            <div className="flex flex-col md:flex-row" style={{ gap: "24px" }}>
              <div
                className="flex-1 flex flex-col text-left"
                style={{ gap: "4px" }}
              >
                <label className="eyebrow text-[var(--color-muted)]">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="luxury-input"
                />
              </div>
              <div
                className="flex-1 flex flex-col text-left"
                style={{ gap: "4px" }}
              >
                <label className="eyebrow text-[var(--color-muted)]">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="luxury-input"
                />
              </div>
            </div>

            <div className="flex flex-col text-left" style={{ gap: "4px" }}>
              <label className="eyebrow text-[var(--color-muted)]">
                Amount (₦){" "}
                {selectedTier ? `— ${selectedTier} tier selected` : ""}
              </label>
              <input
                name="amount"
                type="number"
                placeholder="Enter amount e.g. 2500"
                value={form.amount}
                onChange={(e) => {
                  setSelectedTier(null);
                  handleChange(e);
                }}
                className="luxury-input"
              />
            </div>
          </div>

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

          <button
            onClick={handleDonate}
            disabled={loading}
            className="btn-gold-fill"
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Redirecting to Paystack..." : "Donate Now"}
          </button>

          <p
            className="text-[var(--color-muted)] font-light"
            style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
          >
            Secured by Paystack.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
