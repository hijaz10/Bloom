import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-footer)] text-[var(--color-muted)]">
      <div className="gold-line" />

      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3"
        style={{ padding: "80px 32px", gap: "64px" }}
      >
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col"
          style={{ gap: "20px" }}
        >
          <img
            src="/images/logo.png"
            alt="Bloom"
            className="object-contain opacity-70"
            style={{ width: "40px", height: "40px" }}
          />
          <p className="font-display text-2xl italic text-[var(--color-white)] font-light leading-snug">
            Bloom Charity
            <br />
            &#38; Fundraising Club
          </p>
          <p className="text-xs font-light leading-relaxed tracking-wide">
            A non-governmental organisation founded by seven sisters, dedicated
            to benefiting and assisting orphans across Nigeria.
          </p>
          <div className="flex" style={{ gap: "20px", marginTop: "8px" }}>
            <a
              href="https://instagram.com/bilkisuardo__"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-[var(--color-gold)] transition-colors text-base"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com/bilkisuardo__"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-[var(--color-gold)] transition-colors text-base"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col"
          style={{ gap: "24px" }}
        >
          <p className="eyebrow">Newsletter</p>
          <p className="text-xs font-light leading-relaxed tracking-wide">
            Stay informed about our campaigns, events, and the lives we are
            changing together.
          </p>
          <input
            type="email"
            placeholder="Your email address"
            className="luxury-input"
          />
          <button className="btn-gold" style={{ alignSelf: "flex-start" }}>
            Subscribe
          </button>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col"
          style={{ gap: "24px" }}
        >
          <p className="eyebrow">Quick Links</p>
          <div className="flex flex-col" style={{ gap: "12px" }}>
            {[
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Donate Now", to: "/donate" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs font-light tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="mailto:bilkeesuardo@gmail.com?subject=Enquiry"
              className="text-xs font-light tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
            >
              Email Us
            </a>
          </div>
          <p
            className="text-xs text-[var(--color-muted)]"
            style={{ marginTop: "16px" }}
          >
            Abuja, Nigeria
          </p>
        </motion.div>
      </div>

      <div className="gold-line" />
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between"
        style={{ padding: "20px 32px", gap: "8px" }}
      >
        <p className="text-xs font-light tracking-wider opacity-50">
          &copy; 2024 Bilkisu Ardo. All rights reserved.
        </p>
        <p className="eyebrow opacity-40">Bloom Charity Club</p>
      </div>
    </footer>
  );
}
