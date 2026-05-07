import { motion } from "framer-motion";
import Footer from "../components/Footer";

const tiers = [
  {
    label: "Seed",
    amount: "₦1,000",
    desc: "Provides a meal for a child for a week.",
  },
  {
    label: "Bloom",
    amount: "₦5,000",
    desc: "Covers school supplies for one child.",
  },
  {
    label: "Harvest",
    amount: "₦20,000",
    desc: "Sponsors a child for an entire month.",
  },
];

export default function Donate() {
  return (
    <div>
      {/* Hero */}
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

      {/* Tiers */}
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
                className="glass-card flex flex-col transition-colors"
                style={{ padding: "48px", gap: "24px" }}
              >
                <p className="eyebrow text-[var(--color-gold)]">{t.label}</p>
                <p className="font-display text-5xl font-light text-[var(--color-white)]">
                  {t.amount}
                </p>

                <a
                  href="https://paystack.shop/pay/5izxw1p9jo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="btn-gold text-xs">Give {t.label}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <a
            href="https://paystack.shop/pay/5izxw1p9jo"
            target="_blank"
            rel="noreferrer"
          >
            <span className="btn-gold-fill">Donate Any Amount</span>
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
