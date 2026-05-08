import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MessageCircle, Bot, LayoutDashboard, Truck, Shield,
  Sparkles, ArrowRight, Check, Zap, Globe, Database, Send, Menu, X
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flowgent — WhatsApp AI Booking for Service Businesses" },
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
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-6xl px-4 transition-all`}>
        <div className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all ${scrolled ? "neu" : "bg-transparent"}`}>
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl neu-sm">
              <Zap className="h-4 w-4 text-primary" />
            </span>
            Flowgent
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map(l => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Sign in</a>
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
            Flowgent is a multi-tenant SaaS where an AI chatbot quotes prices, takes orders and confirms deliveries on WhatsApp — while your team runs everything from one modern dashboard.
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
  const messages = [
    { from: "user", text: "Book 10KL sweet water tomorrow morning Kondapur" },
    { from: "bot", text: "Got it! 10KL sweet water to Kondapur tomorrow ~7AM. Total ₹700. Confirm?" },
    { from: "user", text: "Yes please" },
    { from: "bot", text: "✅ Booking #FG-2841 confirmed. Driver Ravi will arrive 6:45-7:15AM." },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= messages.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 900);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <div className="relative rounded-3xl neu p-2 overflow-hidden">
      <div className="rounded-[20px] overflow-hidden neu-inset">
        <div className="flex items-center justify-between px-5 py-3 bg-background">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full neu-sm flex items-center justify-center"><Bot className="h-4 w-4 text-primary" /></div>
            <div>
              <div className="text-sm font-semibold">Flowgent AI</div>
              <div className="text-[10px] text-primary flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> online</div>
            </div>
          </div>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="p-5 space-y-3 min-h-[360px] bg-background">
          {messages.slice(0, shown).map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-gradient-primary text-primary-foreground rounded-br-sm shadow-glow" : "neu-sm rounded-bl-sm"}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {shown < messages.length && (
            <div className="flex gap-1 items-center px-3">
              <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 p-3 bg-background">
          <div className="flex-1 rounded-full neu-inset px-4 py-2 text-xs text-muted-foreground">Type a message…</div>
          <button className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow"><Send className="h-3.5 w-3.5 text-primary-foreground" /></button>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: Bot, title: "Conversational AI booking", desc: "Llama-3.1-70B understands natural language orders and quotes accurate prices in real time." },
  { icon: LayoutDashboard, title: "Modern admin dashboard", desc: "Bookings, fleet, customers and revenue — all in a fast React 18 + TanStack Query interface." },
  { icon: Globe, title: "Multi-tenant by design", desc: "One backend, many companies. Each tenant has their own number, pricing and customers." },
  { icon: Truck, title: "Fleet management", desc: "Add tankers, assign drivers, track deliveries. Auto-assign by locality and availability." },
  { icon: Database, title: "Dynamic pricing", desc: "Update prices and rules from the dashboard — no redeploy. Injected into every AI prompt." },
  { icon: Shield, title: "JWT + RBAC security", desc: "Role-based access for SUPER_ADMIN, ADMIN and OPERATOR. Tenant isolation everywhere." },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Spin up your tenant in 60 seconds. Connect your WhatsApp number. Let Flowgent do the rest.</p>
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
          Flowgent
        </div>
        <div className="text-xs text-muted-foreground">© 2026 Flowgent. Built for service businesses everywhere.</div>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
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
