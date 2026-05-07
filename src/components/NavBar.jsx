import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/donate", label: "Donate" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ padding: scrolled ? "12px 0" : "20px 0" }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Bloom"
            className="w-10 h-10 object-contain opacity-90 hover:opacity-100 transition-opacity"
            style={{ marginLeft: "12px" }}
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-12">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `eyebrow transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-white)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Donate CTA — desktop */}
        <Link to="/donate" className="hidden md:block">
          <span className="btn-gold text-xs">Give Now</span>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px bg-[var(--color-gold)] transition-all duration-300 ${open ? "w-6 rotate-45 translate-y-2" : "w-6"}`}
          />
          <span
            className={`block h-px bg-[var(--color-gold)] transition-all duration-300 ${open ? "opacity-0 w-6" : "w-4"}`}
          />
          <span
            className={`block h-px bg-[var(--color-gold)] transition-all duration-300 ${open ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-[#0c0a09]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="gold-line" />
            <div className="flex flex-col items-center gap-8 py-10">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="eyebrow text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/donate" onClick={() => setOpen(false)}>
                <span className="btn-gold text-xs">Give Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
