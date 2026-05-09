import React, {
  useEffect, useRef, useState, useCallback,
} from "react";
import { motion, useScroll, useSpring, useTransform,
         AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import {
  Bot, LayoutDashboard, Database, Globe,
  MessageSquare, Zap, CheckCircle2, Menu, X,
  ChevronLeft, Video, Phone, Smile, Plus, Camera,
  Mic, MoreVertical, ArrowRight, Mail, Send,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   HEAD / SEO
═══════════════════════════════════════════════════════════════════════ */
// export const Route = createFileRoute("/")({ ... }) — TanStack wire-up assumed.
// head meta is set here as constants for portable use:
export const pageMeta = {
  title: "Flowgent — WhatsApp AI Booking for Service Businesses",
  description:
    "Flowgent turns WhatsApp into your smartest booking agent. AI-powered quotes, live pricing, and instant confirmations for AC installation, PPF, water delivery & more.",
};

/* ═══════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 3,
        zIndex: 9999,
        background: "var(--gradient-primary)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CURSOR BLOB
═══════════════════════════════════════════════════════════════════════ */
function CursorBlob() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        left: springX, top: springY,
        position: "fixed",
        width: 500, height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, oklch(0.62 0.22 275 / 0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   TILT WRAPPER
═══════════════════════════════════════════════════════════════════════ */
function Tilt({ children, intensity = 10, className = "" }: {
  children: React.ReactNode; intensity?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRot({ x: -dy * intensity, y: dx * intensity });
  }, [intensity]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FADE-IN ON SCROLL
═══════════════════════════════════════════════════════════════════════ */
function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════════ */
const NAV_LINKS = ["Features", "How It Works", "Stats"];

function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(/\s+/g, "-"))
      ?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 16, left: "50%",
        zIndex: 1000,
        width: "min(calc(100% - 32px), 900px)",
      }}
      animate={{ x: "-50%" }}
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "oklch(0.97 0.010 255 / 0.88)"
            : "transparent",
          boxShadow: scrolled ? "var(--neu)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
        transition={{ duration: 0.35 }}
        style={{
          borderRadius: 999,
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "var(--gradient-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--neu-sm)",
          }}>
            <Zap size={16} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "var(--text)" }}>
            flowgent
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 4 }}>
          {NAV_LINKS.map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 14px", borderRadius: 999,
                fontSize: 14, fontWeight: 500,
                color: "var(--text-muted)",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("cta")}
            style={{
              background: "var(--gradient-primary)",
              color: "white", border: "none", cursor: "pointer",
              padding: "8px 20px", borderRadius: 999,
              fontSize: 14, fontWeight: 600,
              boxShadow: "var(--neu-sm)",
            }}
          >
            Get access
          </motion.button>
          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(o => !o)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 4, color: "var(--text)",
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              marginTop: 8,
              background: "oklch(0.97 0.010 255 / 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: 20,
              boxShadow: "var(--neu)",
              padding: 16,
              display: "flex", flexDirection: "column", gap: 4,
            }}
          >
            {NAV_LINKS.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "10px 14px", borderRadius: 12,
                  fontSize: 15, fontWeight: 500, textAlign: "left",
                  color: "var(--text-muted)",
                }}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WHATSAPP CHAT MOCKUP
═══════════════════════════════════════════════════════════════════════ */
const MESSAGES = [
  {
    role: "user",
    text: "Hi! Need a quote for 1.5 ton split AC installation in a 2BHK, Kondapur.",
    time: "10:02",
  },
  {
    role: "bot",
    text: "Hi Aarav 👋 Standard 1.5T split AC install is ₹1,899 (copper up to 3m, drilling, gas top-up, demo). Extra copper: ₹450/m. Want to book?",
    time: "10:02",
  },
  {
    role: "user",
    text: "Yes — also full body PPF for my Creta. What's the price?",
    time: "10:03",
  },
  {
    role: "bot",
    text: "🚗 PPF (TPU, 10yr warranty) for Hyundai Creta — Full body: ₹64,999. Front PPF only: ₹19,999. Free pickup & drop in Kondapur.",
    time: "10:03",
  },
  {
    role: "user",
    text: "Book the AC install for tomorrow morning + full body PPF this Saturday.",
    time: "10:04",
  },
  {
    role: "bot",
    text: "✅ Booked!\n• AC install — Tue 10AM, tech Ravi\n• PPF Full body — Sat, pickup 9AM\nTotal ₹66,898. Ref #FG-2841",
    time: "10:04",
  },
];

function TypingDots() {
  return (
    <div style={{
      display: "flex", gap: 4, alignItems: "center",
      background: "white",
      borderRadius: "16px 16px 16px 4px",
      padding: "10px 14px",
      maxWidth: 72,
      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
    }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="typing-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

function DoubleTick() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
      <path d="M1 5l3 3 5-6" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 5l3 3 5-6" stroke="#53bdeb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatBubble({ msg, visible }: { msg: typeof MESSAGES[0]; visible: boolean }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        paddingInline: 10,
        marginBottom: 4,
      }}
    >
      <div style={{
        maxWidth: "78%",
        background: isUser ? "#DCF8C6" : "white",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        padding: "7px 10px 5px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        fontSize: 13,
        lineHeight: 1.5,
        color: "#111",
        whiteSpace: "pre-line",
      }}>
        {msg.text}
        <div style={{
          display: "flex", justifyContent: "flex-end",
          alignItems: "center", gap: 3,
          marginTop: 2,
        }}>
          <span style={{ fontSize: 10, color: "#8696a0" }}>{msg.time}</span>
          {isUser && <DoubleTick />}
        </div>
      </div>
    </motion.div>
  );
}

function ChatMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const runSequence = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    for (let i = 0; i < MESSAGES.length; i++) {
      if (MESSAGES[i].role === "bot") {
        setShowTyping(true);
        await new Promise(r => setTimeout(r, 1100));
        setShowTyping(false);
      }
      setVisibleCount(i + 1);
      await new Promise(r => setTimeout(r, i < MESSAGES.length - 1 ? 1400 : 0));
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runSequence(); },
      { threshold: 0.4 }
    );
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, [runSequence]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleCount, showTyping]);

  return (
    <div style={{
      width: "100%", maxWidth: 300,
      background: "var(--bg-card)",
      borderRadius: "3rem",
      boxShadow: "var(--neu)",
      overflow: "hidden",
      fontFamily: "'SF Pro Text', -apple-system, sans-serif",
      userSelect: "none",
      border: "8px solid oklch(0.94 0.012 255)",
    }}>
      {/* Dynamic Island */}
      <div style={{
        display: "flex", justifyContent: "center",
        paddingTop: 10, paddingBottom: 4,
        background: "oklch(0.97 0.010 255)",
      }}>
        <div style={{
          width: 110, height: 30,
          background: "#0a0a0a",
          borderRadius: 20,
        }} />
      </div>

      {/* iOS Status Bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "4px 18px 2px",
        background: "#075E54",
        fontSize: 11, fontWeight: 600, color: "white",
      }}>
        <span>10:04</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {/* Signal */}
          <svg width="17" height="12" viewBox="0 0 17 12">
            <rect x="0" y="7" width="3" height="5" rx="0.7" fill="white" />
            <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.7" fill="white" />
            <rect x="9" y="2" width="3" height="10" rx="0.7" fill="white" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.7" fill="white" opacity="0.4" />
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12">
            <path d="M8 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="white"/>
            <path d="M4.5 7.5C5.5 6.2 6.7 5.5 8 5.5s2.5.7 3.5 2" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            <path d="M1.5 5C3.2 2.8 5.5 1.5 8 1.5s4.8 1.3 6.5 3.5" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6"/>
          </svg>
          {/* Battery */}
          <svg width="24" height="12" viewBox="0 0 24 12">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="white" strokeWidth="1" fill="none"/>
            <rect x="20.5" y="3.5" width="3" height="5" rx="1.2" fill="white" opacity="0.6"/>
            <rect x="2" y="2" width="15" height="8" rx="1.5" fill="white"/>
          </svg>
        </div>
      </div>

      {/* WhatsApp Header */}
      <div style={{
        background: "#075E54",
        padding: "8px 12px 10px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <ChevronLeft size={20} color="white" />
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Zap size={18} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>Flowgent AI</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>online</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <Video size={18} color="white" />
          <Phone size={18} color="white" />
          <MoreVertical size={18} color="white" />
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={chatRef}
        style={{
          background: "#ECE5DD",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='1' fill='rgba(0,0,0,0.06)'/%3E%3C/svg%3E")`,
          minHeight: 320,
          maxHeight: 340,
          overflowY: "auto",
          paddingTop: 10,
          paddingBottom: 6,
          scrollbarWidth: "none",
        }}
      >
        {/* Date stamp */}
        <div style={{
          textAlign: "center", fontSize: 11,
          color: "#667781",
          background: "rgba(255,255,255,0.72)",
          borderRadius: 8, padding: "3px 10px",
          width: "fit-content", margin: "0 auto 10px",
        }}>
          Today
        </div>

        {MESSAGES.map((msg, i) => (
          <React.Fragment key={i}>
            <ChatBubble msg={msg} visible={visibleCount > i} />
            {showTyping && i === visibleCount - 1 && msg.role === "user" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ paddingInline: 10, marginBottom: 4 }}
              >
                <TypingDots />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Input Bar */}
      <div style={{
        background: "#F0F0F0",
        padding: "8px 10px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{
          flex: 1,
          background: "white",
          borderRadius: 20,
          padding: "7px 12px",
          display: "flex", alignItems: "center",
          gap: 8,
        }}>
          <Smile size={20} color="#8696a0" />
          <span style={{ flex: 1, fontSize: 13, color: "#8696a0" }}>Message</span>
          <Plus size={18} color="#8696a0" />
          <Camera size={18} color="#8696a0" />
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Mic size={18} color="white" />
        </div>
      </div>

      {/* Home Indicator */}
      <div style={{
        display: "flex", justifyContent: "center",
        padding: "6px 0 8px",
        background: "#F0F0F0",
      }}>
        <div style={{
          width: 100, height: 4,
          background: "oklch(0.4 0 0 / 0.3)",
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════ */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parallax blobs */}
      <motion.div style={{ y: blobY, position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "oklch(0.72 0.16 275 / 0.12)",
          filter: "blur(60px)",
        }} className="animate-float" />
        <div style={{
          position: "absolute", bottom: "5%", right: "3%",
          width: 320, height: 320, borderRadius: "50%",
          background: "oklch(0.78 0.14 85 / 0.10)",
          filter: "blur(50px)",
          animationDelay: "2s",
        }} className="animate-float" />
        <div style={{
          position: "absolute", top: "40%", right: "35%",
          width: 200, height: 200, borderRadius: "50%",
          background: "oklch(0.68 0.18 290 / 0.09)",
          filter: "blur(40px)",
          animationDelay: "1s",
        }} className="animate-float" />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "var(--grid-pattern)",
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }} />
      </motion.div>

      <div style={{
        maxWidth: 1100, margin: "0 auto", width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 48,
        alignItems: "center",
        position: "relative", zIndex: 1,
      }}
      className="flex-col-mobile"
      >
        {/* Left */}
        <div>
          {/* Badge */}
          <FadeIn>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--bg-card)",
              boxShadow: "var(--neu-sm)",
              borderRadius: 999, padding: "6px 14px 6px 8px",
              marginBottom: 28,
            }}>
              <span style={{ position: "relative", display: "flex", width: 10, height: 10 }}>
                <span style={{
                  position: "absolute", inset: 0,
                  borderRadius: "50%",
                  background: "#25D366",
                  animation: "ping-dot 1.4s ease-in-out infinite",
                }} />
                <span style={{
                  position: "relative", width: 10, height: 10,
                  borderRadius: "50%", background: "#25D366",
                  display: "block",
                }} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)" }}>
                Now live on WhatsApp Cloud API
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.08}>
            <h1 style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.04em",
              marginBottom: 20,
              color: "var(--text)",
            }}>
              Your WhatsApp just became{" "}
              <span className="gradient-text">
                your best booking agent.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p style={{
              fontSize: "1.12rem",
              color: "var(--text-muted)",
              lineHeight: 1.65,
              maxWidth: 480,
              marginBottom: 32,
            }}>
              Flowgent's AI handles quotes, live pricing, and instant confirmations on the app your customers already have — zero apps, zero friction.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "var(--gradient-primary)",
                  color: "white", border: "none", cursor: "pointer",
                  padding: "14px 28px", borderRadius: 999,
                  fontSize: 15, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8,
                }}
                className="animate-pulse-glow"
              >
                Get early access <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "var(--bg-card)",
                  boxShadow: "var(--neu)",
                  color: "var(--text-muted)", border: "none", cursor: "pointer",
                  padding: "14px 28px", borderRadius: 999,
                  fontSize: 15, fontWeight: 600,
                }}
              >
                See how it works
              </motion.button>
            </div>
          </FadeIn>

          {/* Trust row */}
          <FadeIn delay={0.26}>
            <div style={{
              display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
            }}>
              {[
                "✓ No code needed",
                "✓ Works on existing WhatsApp",
                "✓ Live in 48 hours",
              ].map(t => (
                <span key={t} style={{ fontSize: 13, color: "var(--text-subtle)", fontWeight: 500 }}>
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right — iPhone */}
        <FadeIn delay={0.1} className="mx-auto">
          <Tilt intensity={7}>
            <ChatMockup />
          </Tilt>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: Bot,
    title: "Conversational AI booking",
    desc: "Powered by Llama-3.1-70B, Flowgent understands natural language, handles follow-up questions, and converts chats to confirmed bookings — automatically.",
    accent: "oklch(0.62 0.22 275)",
  },
  {
    icon: LayoutDashboard,
    title: "Modern admin dashboard",
    desc: "A clean, real-time operations view. Track bookings, manage technicians, view revenue, and update services — all from one place.",
    accent: "oklch(0.60 0.20 240)",
  },
  {
    icon: Database,
    title: "Live pricing & catalog",
    desc: "Update your service catalog, pricing tiers, and availability in real time. AI always quotes the right price, every time.",
    accent: "oklch(0.78 0.14 85)",
  },
  {
    icon: Globe,
    title: "Apps customers already use",
    desc: "WhatsApp has 2B+ users. No extra apps, no sign-ups, no friction. Your customers just message you — like they already do.",
    accent: "oklch(0.58 0.18 155)",
  },
];

function Features() {
  return (
    <section id="features" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--primary)", marginBottom: 10 }}>
            Why Flowgent
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
            Built for real service businesses
          </h2>
        </div>
      </FadeIn>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 24,
      }}>
        {FEATURES.map((f, i) => (
          <FadeIn key={f.title} delay={i * 0.07}>
            <Tilt intensity={8}>
              <div
                className="neu-hover"
                style={{
                  background: "var(--bg-card)",
                  boxShadow: "var(--neu)",
                  borderRadius: 24,
                  padding: 28,
                  height: "100%",
                  transition: "box-shadow 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${f.accent}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18,
                  boxShadow: "var(--neu-sm)",
                }}>
                  <f.icon size={22} color={f.accent} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "var(--text)", lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            </Tilt>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════════════════════ */
const STEPS = [
  { icon: MessageSquare, label: "Customer messages WhatsApp", desc: "They ask for a quote, service, or booking — just like texting a friend." },
  { icon: Bot, label: "AI parses & prices instantly", desc: "Flowgent understands the request, fetches live pricing, and replies in seconds." },
  { icon: CheckCircle2, label: "Booking created", desc: "Confirmed, logged, assigned — your team gets notified. Customer gets a ref number." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--primary)", marginBottom: 10 }}>
              How it works
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
              Three steps. Zero friction.
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          position: "relative",
        }}>
          {STEPS.map((step, i) => (
            <FadeIn key={step.label} delay={i * 0.1}>
              <div style={{
                background: "var(--bg-card)",
                boxShadow: "var(--neu)",
                borderRadius: 24, padding: "28px 24px",
                textAlign: "center",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  width: 28, height: 28, borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "white",
                }}>
                  {i + 1}
                </div>
                <div style={{
                  width: 56, height: 56, borderRadius: 18,
                  background: "var(--bg-deep)",
                  boxShadow: "var(--neu-inset)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "8px auto 18px",
                }}>
                  <step.icon size={24} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>
                  {step.label}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════════════════════════ */
const STATS = [
  { value: "10×", label: "Faster bookings", sub: "vs phone & form" },
  { value: "24/7", label: "AI availability", sub: "no staff needed" },
  { value: "99.9%", label: "Uptime SLA", sub: "WhatsApp-native" },
  { value: "0", label: "Apps to install", sub: "for customers" },
];

function Stats() {
  return (
    <section id="stats" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
        }}>
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.07}>
              <div style={{
                background: "var(--bg-card)",
                boxShadow: "var(--neu)",
                borderRadius: 24, padding: "28px 20px",
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: "2.6rem", fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 6,
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>
                  {s.sub}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <div
            className="animate-pulse-glow"
            style={{
              background: "var(--bg-card)",
              boxShadow: "var(--neu)",
              borderRadius: 32, padding: "48px 36px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background accent */}
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              background: "var(--gradient-primary)", opacity: 0.06,
              filter: "blur(30px)",
            }} />

            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: "var(--gradient-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "var(--neu-sm)",
            }}>
              <Mail size={24} color="white" />
            </div>

            <h2 style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800, letterSpacing: "-0.03em",
              marginBottom: 12, color: "var(--text)",
            }}>
              Stop typing. Start delivering.
            </h2>
            <p style={{
              fontSize: 15, color: "var(--text-muted)",
              lineHeight: 1.6, marginBottom: 32, maxWidth: 400, margin: "0 auto 32px",
            }}>
              Join service businesses already using Flowgent to automate bookings on WhatsApp. Early access, free onboarding.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: "flex", gap: 10,
                    background: "var(--bg-deep)",
                    boxShadow: "var(--neu-inset)",
                    borderRadius: 999, padding: 6,
                    maxWidth: 440, margin: "0 auto",
                  }}
                >
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    style={{
                      flex: 1, background: "none", border: "none",
                      outline: "none", padding: "8px 16px",
                      fontSize: 14, color: "var(--text)",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    style={{
                      background: "var(--gradient-primary)",
                      color: "white", border: "none", cursor: "pointer",
                      padding: "10px 22px", borderRadius: 999,
                      fontSize: 14, fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Get access <Send size={14} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    color: "var(--primary)", fontWeight: 600, fontSize: 15,
                  }}
                >
                  <CheckCircle2 size={20} color="#25D366" />
                  You're on the list — we'll be in touch soon!
                </motion.div>
              )}
            </AnimatePresence>

            <p style={{ fontSize: 12, color: "var(--text-subtle)", marginTop: 16 }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      padding: "32px 24px",
      borderTop: "1px solid oklch(0.88 0.015 255 / 0.8)",
      maxWidth: 1100, margin: "0 auto",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: "var(--gradient-primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Zap size={14} color="white" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>flowgent</span>
        <span style={{ fontSize: 13, color: "var(--text-subtle)" }}>© 2026</span>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {["Privacy", "Terms", "Docs"].map(l => (
          <a key={l} href="#" style={{
            fontSize: 13, color: "var(--text-subtle)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-subtle)")}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ROOT PAGE
═══════════════════════════════════════════════════════════════════════ */
export default function Page() {
  return (
    <>
      {/* SEO */}
      <title>{pageMeta.title}</title>
      <meta name="description" content={pageMeta.description} />

      <ScrollBar />
      <CursorBlob />
      <Nav />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <CTASection />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 720px) {
          [style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
          .flex-col-mobile {
            display: flex !important;
            flex-direction: column !important;
          }
        }
        .hidden { display: none !important; }
        @media (min-width: 768px) {
          .hidden.md\\:flex { display: flex !important; }
        }
        .md\\:hidden { display: block; }
        @media (min-width: 768px) {
          .md\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );

}
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)