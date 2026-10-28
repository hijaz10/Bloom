import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Footer from "../components/Footer";

const projects = [
  {
    id: 1,
    title: "Feeding the Future",
    category: "Nutrition",
    year: "2022",
    location: "Abuja, FCT",
    description:
      "Our first initiative as an organisation. We provided over 300 hot meals to orphans across three shelters in Abuja during the Eid celebration, ensuring no child went hungry on a day of joy.",
    impact: "300+ children fed",
    image: "/images/girl.jpg",
    color: "#c9a87c",
  },
  {
    id: 2,
    title: "Back to School Drive",
    category: "Education",
    year: "2022",
    location: "Karu, Abuja",
    description:
      "We raised funds to purchase school bags, notebooks, pens, and uniforms for 80 orphaned children ahead of the new school term. Education is the most powerful gift we can give.",
    impact: "80 children equipped",
    image: "/images/image-10.jpg",
    color: "#a87c9a",
  },
  {
    id: 3,
    title: "Smiles for Every Child",
    category: "Welfare",
    year: "2023",
    location: "Lugbe, Abuja",
    description:
      "A full day of activities, gifts, and celebration organised entirely for the children at a local orphanage. Sometimes the greatest charity is simply showing up and making a child feel seen.",
    impact: "150+ children celebrated",
    image: "/images/smile.jpg",
    color: "#7c9aa8",
  },
  {
    id: 4,
    title: "Clean Water Initiative",
    category: "Health",
    year: "2023",
    location: "Gwagwalada, Abuja",
    description:
      "We partnered with a local NGO to install water filtration systems in two orphanages that had been relying on unsafe water sources. Clean water is a right, not a privilege.",
    impact: "2 orphanages served",
    image: "/images/image-15.jpg",
    color: "#8aa87c",
  },
  {
    id: 5,
    title: "Bloom Clothing Drive",
    category: "Welfare",
    year: "2024",
    location: "Citywide, Abuja",
    description:
      "We collected over 500 clothing items from donors across Abuja and distributed them to children in need before the harmattan season. Warmth is love made visible.",
    impact: "500+ items donated",
    image: "/images/girl.jpg",
    color: "#c9a87c",
  },
];

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Parallax bg */}
      <motion.div
        className="absolute inset-0 bg-site"
        style={{ y, scale: 1.1 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,6,5,0.4) 0%, rgba(8,6,5,0.85) 100%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ padding: "0 32px 80px", opacity }}
      >
        <div
          className="max-w-7xl mx-auto w-full flex flex-col"
          style={{ gap: "24px" }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Work
          </motion.p>

          <motion.h1
            className="font-display font-light italic text-[var(--color-white)]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Projects that
            <br />
            changed lives.
          </motion.h1>

          <motion.div
            className="gold-line"
            style={{ width: "120px", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-[var(--color-muted)] font-light leading-relaxed"
            style={{ fontSize: "0.9rem", maxWidth: "480px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Every project begins with a question — how can we help? These are
            the stories of what happened when seven sisters decided to act.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            className="flex items-center"
            style={{ gap: "16px", marginTop: "16px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div
              className="scroll-indicator bg-[var(--color-gold)]"
              style={{ width: "1px", height: "48px" }}
            />
            <p className="eyebrow text-[var(--color-muted)]">
              Scroll to explore
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
      style={{ padding: "0 32px" }}
    >
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center"
        style={{
          gap: "64px",
          flexDirection: isEven ? "row" : "row-reverse",
        }}
      >
        {/* Image */}
        <motion.div
          className="flex-1 relative overflow-hidden"
          style={{ aspectRatio: "4/3" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Image overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}33, rgba(0,0,0,0.4))`,
            }}
            animate={{ opacity: hovered ? 0.7 : 0.4 }}
            transition={{ duration: 0.5 }}
          />

          {/* Category badge */}
          <div className="absolute" style={{ top: "24px", left: "24px" }}>
            <span
              className="eyebrow"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                padding: "6px 16px",
                border: `1px solid ${project.color}44`,
                color: project.color,
                fontSize: "0.6rem",
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Impact badge */}
          <motion.div
            className="absolute"
            style={{ bottom: "24px", right: "24px" }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-card" style={{ padding: "12px 20px" }}>
              <p
                className="eyebrow"
                style={{ color: project.color, fontSize: "0.6rem" }}
              >
                Impact
              </p>
              <p
                className="font-display italic text-[var(--color-white)] font-light"
                style={{ fontSize: "1rem" }}
              >
                {project.impact}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="flex-1 flex flex-col" style={{ gap: "24px" }}>
          <div className="flex items-center" style={{ gap: "16px" }}>
            <span className="eyebrow text-[var(--color-muted)]">
              {project.year}
            </span>
            <div
              style={{
                width: "1px",
                height: "16px",
                background: "rgba(201,168,124,0.3)",
              }}
            />
            <span className="eyebrow text-[var(--color-muted)]">
              {project.location}
            </span>
          </div>

          <div className="flex items-start" style={{ gap: "16px" }}>
            <span
              className="font-display font-light"
              style={{
                fontSize: "4rem",
                lineHeight: 1,
                color: "rgba(201,168,124,0.15)",
                marginTop: "-8px",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2
              className="font-display font-light italic text-[var(--color-white)]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              {project.title}
            </h2>
          </div>

          <div className="gold-line" style={{ width: "60px" }} />

          <p
            className="text-[var(--color-muted)] font-light leading-loose"
            style={{ fontSize: "0.875rem" }}
          >
            {project.description}
          </p>

          <div
            className="glass-card flex items-center"
            style={{
              padding: "16px 24px",
              gap: "16px",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: project.color,
                flexShrink: 0,
              }}
            />
            <p
              className="eyebrow"
              style={{ color: project.color, fontSize: "0.6rem" }}
            >
              {project.impact}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CounterSection() {
  const counters = [
    { value: "1,000+", label: "Lives Touched" },
    { value: "5", label: "Projects Completed" },
    { value: "3", label: "Years Active" },
    { value: "₦2M+", label: "Worth of Aid Given" },
  ];

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ padding: "120px 32px" }}
    >
      <div
        className="absolute inset-0 bg-site"
        style={{ filter: "brightness(0.3)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(8,6,5,0.6), rgba(8,6,5,0.6))",
        }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto flex flex-col items-center"
        style={{ gap: "64px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center flex flex-col items-center"
          style={{ gap: "16px" }}
        >
          <p className="eyebrow">The Numbers</p>
          <h2
            className="font-display font-light italic text-[var(--color-white)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Our impact, in figures.
          </h2>
          <div className="gold-line" style={{ width: "80px" }} />
        </motion.div>

        <div
          className="w-full grid grid-cols-2 md:grid-cols-4"
          style={{ gap: "1px", background: "rgba(201,168,124,0.15)" }}
        >
          {counters.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
              style={{
                padding: "48px 24px",
                gap: "10px",
                background: "rgba(8,6,5,0.5)",
              }}
            >
              <p
                className="font-display font-light text-[var(--color-gold)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {c.value}
              </p>
              <p
                className="eyebrow text-[var(--color-muted)]"
                style={{ fontSize: "0.55rem" }}
              >
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="bg-[var(--color-footer)] w-full"
      style={{ padding: "120px 32px" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col" style={{ gap: "64px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
          style={{ gap: "16px" }}
        >
          <p className="eyebrow">Journey</p>
          <h2
            className="font-display font-light italic text-[var(--color-white)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Our story, year by year.
          </h2>
          <div className="gold-line" style={{ width: "80px" }} />
        </motion.div>

        <div className="flex flex-col md:flex-row" style={{ gap: "0" }}>
          {/* Timeline nav */}
          <div
            className="flex md:flex-col"
            style={{ gap: "0", minWidth: "200px" }}
          >
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="text-left transition-all"
                style={{
                  padding: "20px 24px",
                  borderLeft: `2px solid ${active === i ? "var(--color-gold)" : "rgba(201,168,124,0.15)"}`,
                  background:
                    active === i ? "rgba(201,168,124,0.05)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <p
                  className="eyebrow"
                  style={{
                    color:
                      active === i ? "var(--color-gold)" : "var(--color-muted)",
                    fontSize: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {p.year}
                </p>
                <p
                  className="font-display italic font-light"
                  style={{
                    color:
                      active === i
                        ? "var(--color-white)"
                        : "var(--color-muted)",
                    fontSize: "1rem",
                    marginTop: "4px",
                    transition: "color 0.3s",
                  }}
                >
                  {p.title}
                </p>
              </button>
            ))}
          </div>

          {/* Timeline content */}
          <div
            className="flex-1"
            style={{
              borderLeft: "1px solid rgba(201,168,124,0.1)",
              padding: "0 0 0 48px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
                style={{ gap: "28px" }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/7" }}
                >
                  <img
                    src={projects[active].image}
                    alt={projects[active].title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(8,6,5,0.8), transparent)",
                    }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ padding: "32px" }}
                  >
                    <p
                      className="eyebrow"
                      style={{ color: projects[active].color }}
                    >
                      {projects[active].category}
                    </p>
                    <h3
                      className="font-display font-light italic text-[var(--color-white)]"
                      style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                    >
                      {projects[active].title}
                    </h3>
                  </div>
                </div>

                <p
                  className="text-[var(--color-muted)] font-light leading-loose"
                  style={{ fontSize: "0.875rem" }}
                >
                  {projects[active].description}
                </p>

                <div className="flex items-center" style={{ gap: "24px" }}>
                  <div
                    className="glass-card flex items-center"
                    style={{ padding: "12px 20px", gap: "10px" }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: projects[active].color,
                      }}
                    />
                    <p
                      className="eyebrow"
                      style={{
                        color: projects[active].color,
                        fontSize: "0.6rem",
                      }}
                    >
                      {projects[active].impact}
                    </p>
                  </div>
                  <p className="eyebrow text-[var(--color-muted)]">
                    {projects[active].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section
      className="bg-site w-full relative overflow-hidden"
      style={{ padding: "160px 32px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(8,6,5,0.7), rgba(8,6,5,0.7))",
        }}
      />

      {/* Decorative large text */}
      <div
        className="absolute font-display italic text-[var(--color-white)] select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 20vw, 16rem)",
          opacity: 0.03,
          bottom: "-20px",
          right: "-20px",
          lineHeight: 1,
          fontWeight: 300,
        }}
      >
        Bloom
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
        style={{ gap: "36px" }}
      >
        <p className="eyebrow">Be Part of the Story</p>

        <h2
          className="font-display font-light italic text-[var(--color-white)]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.1 }}
        >
          The next project begins
          <br />
          with your generosity.
        </h2>

        <div className="gold-line" style={{ width: "100px" }} />

        <p
          className="text-[var(--color-muted)] font-light leading-loose"
          style={{ fontSize: "0.9rem", maxWidth: "480px" }}
        >
          Every naira donated writes a new chapter in a child's life. Help us
          keep going.
        </p>

        <div className="flex flex-wrap justify-center" style={{ gap: "16px" }}>
          <a href="/donate">
            <span className="btn-gold-fill">Donate Now</span>
          </a>
          <a href="/contact">
            <span className="btn-gold">Get Involved</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function Projects() {
  return (
    <div>
      <HeroSection />

      {/* Projects list */}
      <section
        className="bg-[var(--color-bg)] w-full"
        style={{
          padding: "120px 0",
          display: "flex",
          flexDirection: "column",
          gap: "120px",
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>

      <CounterSection />
      <TimelineSection />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
