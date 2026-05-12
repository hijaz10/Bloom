import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const values = [
  {
    title: "Compassion",
    desc: "Every action we take is rooted in genuine love for the children we serve.",
  },
  {
    title: "Integrity",
    desc: "We are transparent with every naira donated and every life impacted.",
  },
  {
    title: "Community",
    desc: "Founded by seven sisters, family is at the heart of everything we do.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section
        className="bg-site w-full min-h-[70vh] flex flex-col justify-center"
        style={{ padding: "96px 32px 64px" }}
      >
        <div
          className="max-w-7xl mx-auto w-full flex flex-col"
          style={{ gap: "24px", maxWidth: "672px" }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Who We Are
          </motion.p>
          <motion.h1
            className="font-display text-6xl md:text-8xl font-light italic text-[var(--color-white)] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            About Us
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
            style={{ maxWidth: "512px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Bloom Charity And Fundraising Club is a non-governmental
            organisation founded by seven sisters, designed to benefit and
            assist orphans across Nigeria. Since 2022, we have been turning
            heartfelt compassion into meaningful, lasting change.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section
        className="bg-[var(--color-footer)]"
        style={{ padding: "96px 32px" }}
      >
        <div
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center"
          style={{ gap: "64px" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img
              src="/images/logo.png"
              alt="Bloom Charity"
              className="object-contain opacity-80 mx-auto md:mx-0"
              style={{ width: "192px", height: "192px" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex-1 flex flex-col"
            style={{ gap: "24px" }}
          >
            <p className="eyebrow">Our Story</p>
            <h2 className="font-display text-4xl font-light italic text-[var(--color-white)]">
              Born from sisterhood,
              <br />
              driven by love.
            </h2>
            <p className="text-[var(--color-muted)] text-sm font-light leading-loose tracking-wide">
              Seven sisters sat around a table one evening and asked themselves
              a simple question: what can we do that actually matters? The
              answer was Bloom — a club where every member gives not just money,
              but time, presence, and genuine care to orphans who deserve to
              know they are loved.
            </p>
            <p className="text-[var(--color-muted)] text-sm font-light leading-loose tracking-wide">
              What started as a small initiative in Abuja has grown into a
              movement that has touched hundreds of lives. We believe every
              child deserves the chance to bloom.
            </p>
            <Link to="/contact">
              <span className="btn-gold">Get in Touch</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-site w-full" style={{ padding: "96px 32px" }}>
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
            <p className="eyebrow">What We Stand For</p>
            <h2 className="font-display text-4xl font-light italic text-[var(--color-white)]">
              Our Values
            </h2>
            <div className="gold-line" style={{ width: "80px" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(201,168,124,0.15)]">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card flex flex-col"
                style={{ padding: "40px", gap: "16px" }}
              >
                <p className="eyebrow text-[var(--color-gold)]">0{i + 1}</p>
                <h3 className="font-display text-2xl font-light italic text-[var(--color-white)]">
                  {v.title}
                </h3>
                <p className="text-[var(--color-muted)] text-xs font-light leading-relaxed tracking-wide">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
