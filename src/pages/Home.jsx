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
      <section
        className="bg-site w-full min-h-screen flex flex-col justify-center"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div
          className="max-w-7xl mx-auto w-full flex flex-col"
          style={{ padding: "0 32px", gap: "64px" }}
        >
          <div
            className="flex flex-col md:flex-row items-center"
            style={{ gap: "80px" }}
          >
            {/* Left */}
            <div className="flex-1 flex flex-col" style={{ gap: "32px" }}>
              <motion.h1
                className="font-display text-6xl md:text-8xl text-[var(--color-white)] font-light leading-[1.05] italic"
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
                style={{ width: "96px", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />

              <motion.p
                className="text-[var(--color-muted)] text-sm font-light leading-relaxed tracking-wide"
                style={{ maxWidth: "384px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Now more than ever, children need your help to survive and
                thrive. Bloom Charity exists to turn compassion into action, one
                child at a time.
              </motion.p>

              <motion.div
                className="flex flex-wrap"
                style={{ gap: "16px" }}
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
            <div
              className="flex-1 flex flex-wrap justify-center"
              style={{ gap: "16px" }}
            >
              {quotes.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="overflow-hidden relative cursor-pointer"
                  style={{
                    width: "176px",
                    height: "240px",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${q.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "1px solid rgba(201,168,124,0.15)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ padding: "20px" }}
                  >
                    <p className="font-display text-sm italic text-[var(--color-white)] leading-snug">
                      {q.text}
                    </p>
                    {q.author && (
                      <p
                        className="eyebrow text-[var(--color-gold)]"
                        style={{ marginTop: "12px" }}
                      >
                        {q.author}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center"
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
        style={{ padding: "80px 32px" }}
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
              style={{ padding: "32px 40px", gap: "8px" }}
            >
              <p className="font-display text-5xl text-[var(--color-gold)] font-light">
                {s.value}
              </p>
              <p className="eyebrow text-[var(--color-muted)]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-site w-full" style={{ padding: "112px 32px" }}>
        <div
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          style={{ gap: "32px" }}
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
            className="font-display text-4xl md:text-6xl font-light italic text-[var(--color-white)] leading-snug"
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
            style={{ width: "128px", transformOrigin: "center" }}
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
