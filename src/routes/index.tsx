import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MessageCircle, Bot, LayoutDashboard, Truck, Users, Shield,
  Sparkles, ArrowRight, Check, Zap, Globe, Database, Send, Menu, X
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
    { href: "#pricing", label: "Pricing" },
    { href: "#stack", label: "Stack" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Zap className="h-4 w-4 text-primary-foreground" />
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
            Start free <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-5 py-4 flex flex-col gap-4">
            {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">{l.label}</a>)}
            <a href="#cta" onClick={() => setOpen(false)} className="rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold text-center">Start free</a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </motion.div>
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center w-full py-12">
        <div>
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span>
            Now live on WhatsApp Cloud API
          </motion.div>
          <motion.h1 {...fade(0.1)} className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            Your <span className="text-gradient">WhatsApp</span> just became your best booking agent.
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-6 text-lg text-muted-foreground max-w-xl">
            Flowgent is a multi-tenant SaaS where an AI chatbot quotes prices, takes orders and confirms deliveries on WhatsApp — while your team runs everything from one modern dashboard.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-semibold shadow-glow hover:scale-105 transition-transform">
              Start free trial <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#flow" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-6 py-3 font-semibold hover:bg-card transition-colors">
              See how it works
            </a>
          </motion.div>
          <motion.div {...fade(0.4)} className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            {["Multi-tenant","JWT secured","Real-time"].map(t => (
              <div key={t} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />{t}</div>
            ))}
          </motion.div>
        </div>
        <motion.div {...fade(0.3)} className="relative">
          <div className="absolute -inset-4 bg-gradient-radial blur-3xl" />
          <ChatMockup />
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
    <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-xl shadow-elegant overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/40">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center"><Bot className="h-4 w-4 text-primary-foreground" /></div>
          <div>
            <div className="text-sm font-semibold">Flowgent AI</div>
            <div className="text-[10px] text-primary flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> online</div>
          </div>
        </div>
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-5 space-y-3 min-h-[360px]">
        {messages.slice(0, shown).map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-gradient-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`}>
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
      <div className="flex items-center gap-2 p-3 border-t border-border bg-secondary/40">
        <div className="flex-1 rounded-full bg-input px-4 py-2 text-xs text-muted-foreground">Type a message…</div>
        <button className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center"><Send className="h-3.5 w-3.5 text-primary-foreground" /></button>
      </div>
    </div>
  );
}

function Logos() {
  const items = ["Neon", "Groq", "Meta", "Prisma", "Vercel", "TanStack"];
  return (
    <section className="py-12 border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Built on a serious stack</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {items.map(i => (
            <span key={i} className="font-display font-semibold text-lg text-muted-foreground hover:text-foreground transition-colors">{i}</span>
          ))}
        </div>
      </div>
    </section>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fade(i * 0.05)} whileHover={{ y: -4 }} className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden transition-all hover:border-primary/40 hover:shadow-glow">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />
              <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-colors">
                <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
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
    <section id="flow" className="py-24 md:py-32 relative bg-card/30 border-y border-border">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">From message to delivery in <span className="text-gradient">seconds</span></h2>
          <p className="mt-4 text-muted-foreground">Three steps. Zero typing for your team.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {flow.map((s, i) => (
            <motion.div key={s.step} {...fade(i * 0.1)} className="relative rounded-2xl border border-border bg-background/60 backdrop-blur p-7">
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-3xl font-bold text-gradient">{s.step}</span>
                <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
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
          <motion.div key={s.l} {...fade(i * 0.05)} className="text-center">
            <div className="font-display text-5xl md:text-6xl font-bold text-gradient">{s.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const tiers = [
  { name: "Starter", price: "₹0", period: "/14 days", desc: "Try Flowgent risk-free.", features: ["1 tenant", "100 bookings/mo", "WhatsApp AI", "Basic dashboard"], cta: "Start free" },
  { name: "Growth", price: "₹4,999", period: "/mo", featured: true, desc: "For growing service businesses.", features: ["Unlimited bookings", "Fleet management", "Custom pricing rules", "Priority support"], cta: "Get Growth" },
  { name: "Scale", price: "Custom", period: "", desc: "For multi-location ops.", features: ["Multiple tenants", "SLA & SSO", "Dedicated success", "Custom integrations"], cta: "Talk to sales" },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Simple, <span className="text-gradient">scalable</span> pricing</h2>
          <p className="mt-4 text-muted-foreground">Pay for what you use. Upgrade when you grow.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div key={t.name} {...fade(i * 0.08)} className={`relative rounded-3xl p-8 border transition-all ${t.featured ? "border-primary/60 bg-gradient-to-b from-primary/10 to-card shadow-glow" : "border-border bg-card hover:border-primary/30"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1">MOST POPULAR</div>}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className="text-muted-foreground text-sm">{t.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-full py-3 font-semibold transition-all ${t.featured ? "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]" : "border border-border hover:bg-secondary"}`}>
                {t.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const rows = [
    ["Backend", "Node.js 20 + Express + TypeScript"],
    ["Database", "PostgreSQL + Prisma 5"],
    ["AI", "Groq · llama-3.1-70b-versatile"],
    ["Messaging", "Meta WhatsApp Cloud API"],
    ["Frontend", "React 18 + Vite + Tailwind"],
    ["State", "TanStack Query v5"],
  ];
  return (
    <section id="stack" className="py-24 md:py-32 bg-card/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fade()}>
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">The stack</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Engineered for <span className="text-gradient">scale & speed</span>.</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">Built on production-grade tooling, not duct tape. Type-safe end to end, observable, and ready for your first 10,000 customers.</p>
          <div className="mt-6 flex gap-3">
            <a href="#cta" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 font-semibold shadow-glow text-sm">Get the platform</a>
          </div>
        </motion.div>
        <motion.div {...fade(0.2)} className="rounded-2xl border border-border bg-background/60 backdrop-blur overflow-hidden">
          {rows.map(([k, v], i) => (
            <div key={k} className={`flex items-center justify-between px-6 py-4 ${i !== rows.length - 1 ? "border-b border-border" : ""}`}>
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="font-mono text-sm">{v}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-radial" />
      <motion.div {...fade()} className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <div className="relative rounded-3xl border border-primary/30 bg-card/60 backdrop-blur-xl p-10 md:p-16 shadow-glow overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-primary blur-3xl opacity-30 animate-pulse-glow" />
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Stop typing. <br /><span className="text-gradient">Start delivering.</span></h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Spin up your tenant in 60 seconds. Connect your WhatsApp number. Let Flowgent do the rest.</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" required placeholder="you@company.com" className="flex-1 rounded-full bg-input border border-border px-5 py-3 text-sm focus:outline-none focus:border-primary" />
            <button className="rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-semibold shadow-glow hover:scale-105 transition-transform whitespace-nowrap">Get early access</button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">No credit card. 14-day free trial.</p>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="h-7 w-7 rounded-lg bg-gradient-primary flex items-center justify-center"><Zap className="h-3.5 w-3.5 text-primary-foreground" /></span>
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Features />
        <Flow />
        <Stats />
        <Pricing />
        <Stack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
