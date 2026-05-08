import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const stats = [
  { value: "500+", label: "Children Supported" },
  { value: "7", label: "Founding Sisters" },
  { value: "3+", label: "Years of Impact" },
  { value: "100%", label: "Volunteer Driven" },
];

const quotes = [
  {
    text: '"When we give cheerfully and accept gratefully, everyone is blessed."',
    author: "Maya Angelou",
    bg: "/images/girl.jpg",
  },
  {
    text: '"It\'s not how much we give but how much love we put into giving."',
    author: "Mother Theresa",
    bg: "/images/image-10.jpg",
  },
  {
    text: '"No one has ever become poor by giving."',
    author: "Anne Frank",
    bg: "/images/image-15.jpg",
  },
  {
    text: '"Even a smile is charity. Smile is counted as an act of voluntary charity."',
    author: "Prophet Muhammad (SAW)",
    bg: "/images/smile.jpg",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="bg-site w-full min-h-screen flex flex-col justify-center"
        style={{ paddingTop: "96px", paddingBottom: "64px" }}
      >
        <div
          className="max-w-7xl mx-auto w-full flex flex-col"
          style={{ padding: "0 24px", gap: "48px" }}
        >
          <div
            className="flex flex-col md:flex-row md:items-center"
            style={{ gap: "48px" }}
          >
            {/* Left — text */}
            <div className="flex-1 flex flex-col" style={{ gap: "28px" }}>
              <motion.h1
                className="font-display font-light italic text-[var(--color-white)] leading-[1.05]"
                style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                Charity is a<br />
                virtue of
                <br />
                the heart.
              </motion.h1>

              <motion.div
                className="gold-line"
                style={{ width: "80px", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />

              <motion.p
                className="text-[var(--color-muted)] font-light leading-relaxed tracking-wide"
                style={{
                  fontSize: "clamp(0.8rem, 2vw, 0.875rem)",
                  maxWidth: "380px",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Now more than ever, children need your help to survive and
                thrive. Bloom Charity exists to turn compassion into action —
                one child at a time.
              </motion.p>

              <motion.div
                className="flex flex-wrap"
                style={{ gap: "12px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
              >
                <Link to="/donate">
                  <span className="btn-gold-fill">Donate Now</span>
                </Link>
                <Link to="/about">
                  <span className="btn-gold">Our Story</span>
                </Link>
              </motion.div>
            </div>

            {/* Right — quote cards */}
            {/* On mobile: 2 columns, smaller cards. On desktop: full size */}
            <div className="flex-1 grid grid-cols-2" style={{ gap: "12px" }}>
              {quotes.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="overflow-hidden relative cursor-pointer"
                  style={{
                    height: "clamp(160px, 25vw, 240px)",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.65)), url(${q.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "1px solid rgba(201,168,124,0.15)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ padding: "14px" }}
                  >
                    <p
                      className="font-display italic text-[var(--color-white)] leading-snug"
                      style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.875rem)" }}
                    >
                      {q.text}
                    </p>
                    {q.author && (
                      <p
                        className="eyebrow text-[var(--color-gold)]"
                        style={{ marginTop: "8px", fontSize: "0.55rem" }}
                      >
                        {q.author}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll indicator — hide on mobile */}
          <motion.div
            className="hidden md:flex flex-col items-center"
            style={{ gap: "8px", opacity: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="eyebrow">Scroll</p>
            <div
              className="scroll-indicator bg-[var(--color-gold)]"
              style={{ width: "1px", height: "32px" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="bg-[var(--color-footer)]"
        style={{ padding: "60px 24px" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="stat-block flex flex-col"
              style={{ padding: "24px 20px", gap: "6px" }}
            >
              <p
                className="font-display text-[var(--color-gold)] font-light"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                {s.value}
              </p>
              <p
                className="eyebrow text-[var(--color-muted)]"
                style={{ fontSize: "0.55rem" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-site w-full" style={{ padding: "80px 24px" }}>
        <div
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          style={{ gap: "28px" }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Mission
          </motion.p>

          <motion.h2
            className="font-display font-light italic text-[var(--color-white)] leading-snug"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            "To empower the vulnerable, uplift the forgotten, and give every
            child a reason to bloom."
          </motion.h2>

          <motion.div
            className="gold-line"
            style={{ width: "100px", transformOrigin: "center" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/donate">
              <span className="btn-gold">Support the Mission</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
