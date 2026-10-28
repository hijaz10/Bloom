import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  async function sendEmail(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );

      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.");
    }

    setLoading(false);
  }

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
            style={{ padding: "32px", gap: "28px" }}
          >
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="flex flex-col"
              style={{ gap: "20px" }}
            >
              <div className="flex flex-col" style={{ gap: "4px" }}>
                <label className="eyebrow text-[var(--color-muted)]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your name"
                  className="luxury-input"
                  required
                />
              </div>

              <div className="flex flex-col" style={{ gap: "4px" }}>
                <label className="eyebrow text-[var(--color-muted)]">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="your@email.com"
                  className="luxury-input"
                  required
                />
              </div>

              <div className="flex flex-col" style={{ gap: "4px" }}>
                <label className="eyebrow text-[var(--color-muted)]">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  className="luxury-input"
                  required
                />
              </div>

              <div className="flex flex-col" style={{ gap: "4px" }}>
                <label className="eyebrow text-[var(--color-muted)]">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Tell us more..."
                  className="luxury-input resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold-fill"
                style={{
                  alignSelf: "flex-start",
                  marginTop: "4px",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                  pointerEvents: loading ? "none" : "auto",
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
