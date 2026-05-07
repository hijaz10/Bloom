import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div>
      <section
        className="bg-site w-full min-h-screen flex flex-col justify-center"
        style={{ padding: "96px 32px 80px" }}
      >
        <div
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-start w-full"
          style={{ gap: "80px" }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col"
            style={{ gap: "32px", paddingTop: "16px" }}
          >
            <p className="eyebrow">Reach Out</p>
            <h1 className="font-display text-6xl md:text-7xl font-light italic text-[var(--color-white)] leading-tight">
              Let's talk
              <br />
              about change.
            </h1>
            <div className="gold-line" style={{ width: "80px" }} />
            <p
              className="text-[var(--color-muted)] text-sm font-light leading-loose tracking-wide"
              style={{ maxWidth: "384px" }}
            >
              Whether you want to volunteer, partner with us, or simply learn
              more about what we do, we would love to hear from you.
            </p>
            <div
              className="flex flex-col"
              style={{ gap: "12px", marginTop: "16px" }}
            >
              <a
                href="mailto:bilkeesuardo@gmail.com"
                className="eyebrow text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
              >
                bilkeesuardo@gmail.com
              </a>
              <p className="eyebrow text-[var(--color-muted)]">
                Abuja, Nigeria
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 glass-card flex flex-col"
            style={{ padding: "48px", gap: "40px" }}
          >
            <div className="flex flex-col" style={{ gap: "32px" }}>
              {[
                { label: "Full Name", type: "text", placeholder: "Your name" },
                {
                  label: "Email",
                  type: "email",
                  placeholder: "your@email.com",
                },
                {
                  label: "Subject",
                  type: "text",
                  placeholder: "How can we help?",
                },
              ].map((field) => (
                <div
                  key={field.label}
                  className="flex flex-col"
                  style={{ gap: "4px" }}
                >
                  <label className="eyebrow text-[var(--color-muted)]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="luxury-input"
                  />
                </div>
              ))}
              <div className="flex flex-col" style={{ gap: "4px" }}>
                <label className="eyebrow text-[var(--color-muted)]">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="luxury-input resize-none"
                />
              </div>
            </div>
            <button
              className="btn-gold-fill"
              style={{ alignSelf: "flex-start" }}
            >
              Send Message
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
