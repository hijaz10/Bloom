import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(null);

  async function handleLogin() {
    if (!password) return;
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );

      if (!res.ok) {
        setAuthError("Incorrect password.");
        setAuthLoading(false);
        return;
      }

      setAuthed(true);
      setAuthLoading(false);
      loadData();
    } catch (err) {
      setAuthError("Could not connect to server.");
      setAuthLoading(false);
    }
  }

  async function loadData() {
    setDataLoading(true);
    try {
      const [paymentsRes, statsRes, subscribersRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/payments`, {
          headers: { "x-admin-password": password },
        }),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/stats`, {
          headers: { "x-admin-password": password },
        }),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/newsletter/all`, {
          headers: { "x-admin-password": password },
        }),
      ]);

      const paymentsData = await paymentsRes.json();
      const statsData = await statsRes.json();
      const subscribersData = await subscribersRes.json();

      setPayments(paymentsData.payments || []);
      setStats(statsData);
      setSubscriberCount(subscribersData.total || 0);
    } catch (err) {
      console.error(err);
    }
    setDataLoading(false);
  }

  async function handleSendNewsletter() {
    if (!newsletterSubject || !newsletterMessage) {
      toast.error("Please fill in both subject and message.");
      return;
    }

    const confirmed = window.confirm(
      `Send this email to ${subscriberCount} subscriber${subscriberCount !== 1 ? "s" : ""}?`,
    );
    if (!confirmed) return;

    setNewsletterLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password,
          },
          body: JSON.stringify({
            subject: newsletterSubject,
            message: newsletterMessage,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send newsletter.");
        setNewsletterLoading(false);
        return;
      }

      toast.success(data.message);
      setNewsletterSubject("");
      setNewsletterMessage("");
    } catch (err) {
      toast.error("Could not connect to server.");
    }

    setNewsletterLoading(false);
  }

  const filtered = payments.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.reference?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <section
        className="bg-site w-full min-h-screen flex flex-col"
        style={{ padding: "96px 24px 80px" }}
      >
        <div
          className="max-w-5xl mx-auto w-full flex flex-col"
          style={{ gap: "48px" }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
            style={{ gap: "12px" }}
          >
            <p className="eyebrow">Restricted Access</p>
            <h1
              className="font-display font-light italic text-[var(--color-white)]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Admin Panel
            </h1>
            <div className="gold-line" style={{ width: "80px" }} />
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Login form */}
            {!authed && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card flex flex-col"
                style={{ padding: "40px", gap: "28px", maxWidth: "480px" }}
              >
                <p
                  className="text-[var(--color-muted)] font-light"
                  style={{ fontSize: "0.875rem" }}
                >
                  Enter your admin password to access all payment records.
                </p>

                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <label className="eyebrow text-[var(--color-muted)]">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setAuthError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="luxury-input"
                  />
                </div>

                {authError && (
                  <p
                    style={{ color: "var(--color-pink)", fontSize: "0.75rem" }}
                  >
                    {authError}
                  </p>
                )}

                <button
                  onClick={handleLogin}
                  disabled={authLoading}
                  className="btn-gold-fill"
                  style={{
                    alignSelf: "flex-start",
                    opacity: authLoading ? 0.6 : 1,
                    cursor: authLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {authLoading ? "Verifying..." : "Enter"}
                </button>
              </motion.div>
            )}

            {/* Dashboard */}
            {authed && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
                style={{ gap: "36px" }}
              >
                {dataLoading ? (
                  <p className="eyebrow text-[var(--color-muted)]">
                    Loading data...
                  </p>
                ) : (
                  <>
                    {/* Stats */}
                    {stats && (
                      <div
                        className="grid grid-cols-1 md:grid-cols-3"
                        style={{ gap: "12px" }}
                      >
                        {[
                          {
                            label: "Total Raised",
                            value: `₦${stats.totalAmount?.toLocaleString()}`,
                          },
                          {
                            label: "Total Payments",
                            value: stats.totalPayments,
                          },
                          { label: "Unique Donors", value: stats.uniqueDonors },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="glass-card flex flex-col"
                            style={{ padding: "24px 28px", gap: "6px" }}
                          >
                            <p
                              className="font-display font-light text-[var(--color-gold)]"
                              style={{ fontSize: "2rem" }}
                            >
                              {s.value}
                            </p>
                            <p
                              className="eyebrow text-[var(--color-muted)]"
                              style={{ fontSize: "0.55rem" }}
                            >
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Search */}
                    <div className="flex flex-col" style={{ gap: "4px" }}>
                      <label className="eyebrow text-[var(--color-muted)]">
                        Search by name, email or reference
                      </label>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="luxury-input"
                        style={{ maxWidth: "400px" }}
                      />
                    </div>

                    {/* Table — desktop */}
                    <div className="hidden md:block overflow-x-auto">
                      <table
                        className="w-full"
                        style={{ borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr
                            style={{
                              borderBottom: "1px solid rgba(201,168,124,0.2)",
                            }}
                          >
                            {[
                              "Name",
                              "Email",
                              "Amount",
                              "Channel",
                              "Date",
                              "Reference",
                            ].map((h) => (
                              <th
                                key={h}
                                className="eyebrow text-[var(--color-muted)] text-left"
                                style={{
                                  padding: "12px 16px",
                                  fontSize: "0.55rem",
                                }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((p, i) => (
                            <motion.tr
                              key={p._id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.04 }}
                              style={{
                                borderBottom:
                                  "1px solid rgba(201,168,124,0.08)",
                              }}
                            >
                              {[
                                p.name,
                                p.email,
                                `₦${p.amount?.toLocaleString()}`,
                                p.channel || "—",
                                p.paidAt
                                  ? new Date(p.paidAt).toLocaleDateString(
                                      "en-NG",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      },
                                    )
                                  : "—",
                                p.reference?.slice(0, 16) + "...",
                              ].map((val, j) => (
                                <td
                                  key={j}
                                  className="text-[var(--color-muted)] font-light"
                                  style={{
                                    padding: "14px 16px",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {val}
                                </td>
                              ))}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>

                      {filtered.length === 0 && (
                        <div
                          className="text-center"
                          style={{ padding: "40px" }}
                        >
                          <p className="eyebrow text-[var(--color-muted)]">
                            No results found.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Cards — mobile */}
                    <div
                      className="md:hidden flex flex-col"
                      style={{ gap: "12px" }}
                    >
                      {filtered.map((p, i) => (
                        <motion.div
                          key={p._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="glass-card flex flex-col"
                          style={{ padding: "20px", gap: "10px" }}
                        >
                          <div className="flex justify-between items-start">
                            <p
                              className="font-display italic text-[var(--color-white)] font-light"
                              style={{ fontSize: "1.25rem" }}
                            >
                              ₦{p.amount?.toLocaleString()}
                            </p>
                            <p
                              className="eyebrow text-[var(--color-gold)]"
                              style={{ fontSize: "0.55rem" }}
                            >
                              {p.channel || "card"}
                            </p>
                          </div>
                          <p
                            className="text-[var(--color-white)] font-light"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {p.name}
                          </p>
                          <p
                            className="text-[var(--color-muted)] font-light"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {p.email}
                          </p>
                          <p
                            className="text-[var(--color-muted)] font-light"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {p.paidAt
                              ? new Date(p.paidAt).toLocaleDateString("en-NG", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—"}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setAuthed(false);
                        setPassword("");
                        setPayments([]);
                        setStats(null);
                      }}
                      className="btn-gold"
                      style={{ alignSelf: "flex-start" }}
                    >
                      Logout
                    </button>
                  </>
                )}
                {/* Newsletter */}
                <div className="flex flex-col" style={{ gap: "24px" }}>
                  <div className="flex flex-col" style={{ gap: "8px" }}>
                    <p className="eyebrow">Send Newsletter</p>
                    <div className="gold-line" style={{ width: "60px" }} />
                  </div>

                  {/* Subscriber count */}
                  {subscriberCount !== null && (
                    <div
                      className="glass-card flex items-center"
                      style={{
                        padding: "16px 24px",
                        gap: "12px",
                        alignSelf: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--color-gold)",
                          flexShrink: 0,
                        }}
                      />
                      <p
                        className="eyebrow text-[var(--color-muted)]"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {subscriberCount} active subscriber
                        {subscriberCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  )}

                  <div
                    className="glass-card flex flex-col"
                    style={{ padding: "32px", gap: "24px", maxWidth: "600px" }}
                  >
                    <div className="flex flex-col" style={{ gap: "4px" }}>
                      <label className="eyebrow text-[var(--color-muted)]">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Email subject..."
                        value={newsletterSubject}
                        onChange={(e) => setNewsletterSubject(e.target.value)}
                        className="luxury-input"
                      />
                    </div>
                    <div className="flex flex-col" style={{ gap: "4px" }}>
                      <label className="eyebrow text-[var(--color-muted)]">
                        Message
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Write your message to subscribers..."
                        value={newsletterMessage}
                        onChange={(e) => setNewsletterMessage(e.target.value)}
                        className="luxury-input resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSendNewsletter}
                      disabled={newsletterLoading}
                      className="btn-gold-fill"
                      style={{
                        alignSelf: "flex-start",
                        opacity: newsletterLoading ? 0.6 : 1,
                        cursor: newsletterLoading ? "not-allowed" : "pointer",
                        pointerEvents: newsletterLoading ? "none" : "auto",
                      }}
                    >
                      {newsletterLoading
                        ? "Sending..."
                        : `Send to All Subscribers`}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
