import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MessageCircle, Bot, LayoutDashboard,
  Sparkles, ArrowRight, Check, Zap, Globe, Database, Menu, X,
  Phone, Video, Plus, Mic, Smile, Camera, ChevronLeft
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zevio — WhatsApp AI Booking for Service Businesses" },
      { name: "description", content: "Multi-tenant SaaS that turns WhatsApp into your booking engine. AI handles customers, your team runs the dashboard." },
    ],
  }),
  component: Landing,
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ---------- Cursor follower ---------- */
function CursorBlob() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 250); y.set(e.clientY - 250); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
      style={{
        x: sx, y: sy,
        background: "radial-gradient(circle, oklch(0.7 0.22 290 / 0.55), transparent 60%)",
      }}
    />
  );
}

/* ---------- Scroll progress bar ---------- */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-primary z-[60]" />
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#flow", label: "How it works" },
  ];
  const routeLinks = [
    { to: "/privacy", label: "Privacy" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-6xl px-4 transition-all`}>
        <div className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all ${scrolled ? "neu" : "bg-transparent"}`}>
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl neu-sm">
              <Zap className="h-4 w-4 text-primary" />
            </span>
            Zevio
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map(l => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
            {routeLinks.map(l => (
              <Link key={l.to} to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#cta" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-glow hover:scale-105 transition-transform">
              Get access <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="md:hidden mx-4 mt-2 rounded-2xl neu overflow-hidden">
          <div className="px-5 py-4 flex flex-col gap-4">
            {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">{l.label}</a>)}
            {routeLinks.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">{l.label}</Link>)}
            <a href="#cta" onClick={() => setOpen(false)} className="rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold text-center">Get access</a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

/* ---------- Tilt wrapper for hover interaction ---------- */
function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10); rx.set(-py * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-32 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </motion.div>
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center w-full py-12">
        <div>
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full neu-sm px-4 py-2 text-xs text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>
            Now live on WhatsApp Cloud API
          </motion.div>
          <motion.h1 {...fade(0.1)} className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            Your <span className="text-gradient">WhatsApp</span> just became your best booking agent.
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-6 text-lg text-muted-foreground max-w-xl">
            Zevio is a multi-tenant SaaS where an AI chatbot quotes prices, takes orders and confirms deliveries on WhatsApp — while your team runs everything from one modern dashboard.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-4">
            <a href="#cta" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-glow hover:scale-105 transition-transform">
              Get access <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#flow" className="inline-flex items-center gap-2 rounded-full neu px-7 py-3.5 font-semibold neu-hover">
              See how it works
            </a>
          </motion.div>
          <motion.div {...fade(0.4)} className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            {["Multi-tenant", "JWT secured", "Real-time"].map(t => (
              <div key={t} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />{t}</div>
            ))}
          </motion.div>
        </div>
        <motion.div {...fade(0.3)} className="relative">
          <Tilt><ChatMockup /></Tilt>
        </motion.div>
      </div>
    </section>
  );
}

function ChatMockup() {
  const messages: Array<{ from: "user" | "bot"; text: string; time: string }> = [
    { from: "user", text: "Hi! Need a quote for 1.5 ton split AC installation in a 2BHK, Kondapur.", time: "10:24 AM" },
    { from: "bot", text: "Hi Aarav 👋 Standard 1.5T split AC install is ₹1,899 (copper up to 3m, drilling, gas top-up, demo). Extra copper: ₹450/m. Want to book?", time: "10:24 AM" },
    { from: "user", text: "Yes — also full body PPF for my Creta. What's the price?", time: "10:25 AM" },
    { from: "bot", text: "🚗 PPF (TPU, 10yr warranty) for Hyundai Creta — Full body: ₹64,999. Front PPF only: ₹19,999. Free pickup & drop in Kondapur.", time: "10:25 AM" },
    { from: "user", text: "Book the AC install for tomorrow morning + full body PPF this Saturday.", time: "10:26 AM" },
    { from: "bot", text: "✅ Booked!\n• AC install — Tue 10AM, tech Ravi\n• PPF Full body — Sat, pickup 9AM\nTotal ₹66,898. Ref #FG-2841", time: "10:26 AM" },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= messages.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 1100);
    return () => clearTimeout(t);
  }, [shown]);
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="relative mx-auto" style={{ maxWidth: 360 }}>
      {/* iPhone frame */}
      <div
        className="relative rounded-[3rem] p-[10px] neu"
        style={{ background: "linear-gradient(145deg, oklch(0.97 0.005 250), oklch(0.86 0.02 250))" }}
      >
        <div className="rounded-[2.5rem] overflow-hidden bg-[#E5DDD5] relative" style={{ aspectRatio: "9 / 19.5" }}>
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-7 w-28 rounded-full bg-black" />
          {/* iOS status bar */}
          <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-2 text-black text-[11px] font-semibold bg-[#075E54]">
            <span className="text-white">{time}</span>
            <span className="opacity-0">.</span>
            <span className="flex items-center gap-1 text-white">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M1 9h2V6H1v3zm4 0h2V4H5v5zm4 0h2V2H9v7zm4 0h2V0h-2v9z"/></svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 1.5C4.5 1.5 2.3 2.5.7 4l1 1.2C3.1 3.9 5 3 7 3s3.9.9 5.3 2.2l1-1.2C11.7 2.5 9.5 1.5 7 1.5zM7 4.5c-1.7 0-3.2.6-4.4 1.6l1 1.2C4.5 6.5 5.7 6 7 6s2.5.5 3.4 1.3l1-1.2C10.2 5.1 8.7 4.5 7 4.5zM7 7.5c-.8 0-1.6.3-2.2.8L7 10l2.2-1.7c-.6-.5-1.4-.8-2.2-.8z"/></svg>
              <span className="ml-1 inline-block w-6 h-2.5 rounded-sm border border-white/80 relative">
                <span className="absolute inset-0.5 bg-white rounded-[1px]" />
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white/80 rounded-r" />
              </span>
            </span>
          </div>
          {/* WhatsApp header */}
          <div className="bg-[#075E54] text-white px-3 pb-3 pt-1 flex items-center gap-3">
            <ChevronLeft className="h-5 w-5" />
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold leading-tight">Zevio AI</div>
              <div className="text-[10px] opacity-80">online</div>
            </div>
            <Video className="h-4 w-4" />
            <Phone className="h-4 w-4" />
          </div>
          {/* Chat area */}
          <div
            className="px-3 py-3 space-y-2 overflow-hidden"
            style={{
              minHeight: 460,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='%23d9cfc1' fill-opacity='0.4'><circle cx='10' cy='10' r='1'/><circle cx='40' cy='25' r='1'/><circle cx='65' cy='55' r='1'/><circle cx='20' cy='60' r='1'/></g></svg>\")",
              backgroundColor: "#ECE5DD",
            }}
          >
            {messages.slice(0, shown).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[78%] px-2.5 py-1.5 text-[12px] leading-snug whitespace-pre-line shadow-sm ${
                    m.from === "user"
                      ? "bg-[#DCF8C6] text-gray-900 rounded-lg rounded-br-none"
                      : "bg-white text-gray-900 rounded-lg rounded-bl-none"
                  }`}
                >
                  {m.text}
                  <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5">
                    <span className="text-[9px] text-gray-500">{m.time}</span>
                    {m.from === "user" && (
                      <svg width="14" height="8" viewBox="0 0 16 8" className="text-[#34B7F1]" fill="currentColor">
                        <path d="M11.071.653a.5.5 0 0 0-.7.097l-5.2 6.5L2.4 4.5a.5.5 0 1 0-.8.6l3.2 4.267a.5.5 0 0 0 .8 0l5.6-7a.5.5 0 0 0-.129-.714zm4 0a.5.5 0 0 0-.7.097l-5.2 6.5-1.057-1.41-.625.781 1.282 1.71a.5.5 0 0 0 .8 0l5.6-7a.5.5 0 0 0-.1-.678z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {shown < messages.length && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-bl-none px-3 py-2 shadow-sm flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
          {/* Input bar */}
          <div className="absolute bottom-0 inset-x-0 bg-[#ECE5DD] px-2 py-2 flex items-center gap-1.5">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2 text-[11px] text-gray-500">
              <Smile className="h-3.5 w-3.5" />
              <span className="flex-1">Message</span>
              <Plus className="h-3.5 w-3.5" />
              <Camera className="h-3.5 w-3.5" />
            </div>
            <button className="h-8 w-8 rounded-full bg-[#075E54] flex items-center justify-center text-white">
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: Bot, title: "Conversational AI booking", desc: "Llama-3.1-70B understands natural language orders and quotes accurate prices in real time." },
  { icon: LayoutDashboard, title: "Modern admin dashboard", desc: "Bookings, fleet, customers and revenue — all in a fast React 18 + TanStack Query interface." },
  { icon: Database, title: "Live pricing & service catalog", desc: "Edit your services, packages and prices from the dashboard — the AI quotes the new rate on the very next message." },
  { icon: Globe, title: "Works on the apps customers already use", desc: "No new app to install. Customers chat on WhatsApp, you stay in control from one clean dashboard." },
];

function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fade()} className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Everything you need
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            One platform for the <span className="text-gradient">entire booking flow</span>.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fade(i * 0.05)}>
              <Tilt className="rounded-3xl neu p-7 neu-hover h-full">
                <div className="h-12 w-12 rounded-2xl neu-inset flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const flow = [
  { step: "01", title: "Customer messages WhatsApp", desc: '"Book 10KL sweet water tomorrow morning Kondapur"', icon: MessageCircle },
  { step: "02", title: "AI parses + prices", desc: "PromptBuilder injects live pricing from your DB into Groq.", icon: Bot },
  { step: "03", title: "Booking created", desc: "Confirmed booking saved, customer gets ETA, dashboard updates.", icon: Check },
];

function Flow() {
  return (
    <section id="flow" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-30 -z-10" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">From message to delivery in <span className="text-gradient">seconds</span></h2>
          <p className="mt-4 text-muted-foreground">Three steps. Zero typing for your team.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {flow.map((s, i) => (
            <motion.div key={s.step} {...fade(i * 0.1)}>
              <Tilt className="rounded-3xl neu p-7 neu-hover h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-3xl font-bold text-gradient">{s.step}</span>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "10x", l: "Faster bookings" },
    { v: "24/7", l: "AI availability" },
    { v: "99.9%", l: "Uptime SLA" },
    { v: "0", l: "Apps to install" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={s.l} {...fade(i * 0.05)} className="rounded-3xl neu p-8 text-center neu-hover">
            <div className="font-display text-5xl md:text-6xl font-bold text-gradient">{s.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-radial" />
      <motion.div {...fade()} className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <div className="relative rounded-[2rem] neu p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-primary blur-3xl opacity-20 animate-pulse-glow" />
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Stop typing. <br /><span className="text-gradient">Start delivering.</span></h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Spin up your tenant in 60 seconds. Connect your WhatsApp number. Let Zevio do the rest.</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" required placeholder="you@company.com" className="flex-1 rounded-full neu-inset px-5 py-3 text-sm focus:outline-none bg-transparent" />
            <button className="rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-semibold shadow-glow hover:scale-105 transition-transform whitespace-nowrap">Get access</button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="h-8 w-8 rounded-xl neu-sm flex items-center justify-center"><Zap className="h-3.5 w-3.5 text-primary" /></span>
          Zevio
        </div>
        <div className="text-xs text-muted-foreground">© 2026 Zevio. Built for service businesses everywhere.</div>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Docs</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ScrollBar />
      <CursorBlob />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Flow />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
