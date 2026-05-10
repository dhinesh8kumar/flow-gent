import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Zevio" },
      { name: "description", content: "The Terms of Service governing your use of Zevio." },
      { property: "og:title", content: "Terms of Service — Zevio" },
      { property: "og:description", content: "The Terms of Service governing your use of Zevio." },
    ],
  }),
  component: TermsPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-foreground/80 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
  );
}

function TermsPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--grid-pattern)" }} />

      <header className="max-w-3xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight text-foreground/80 hover:text-foreground transition">
          ← Zevio
        </Link>
        <Link to="/" className="text-xs font-medium px-4 py-2 rounded-full neu-sm hover:opacity-90 transition">
          Home
        </Link>
      </header>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div className="neu rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Last updated: May 9, 2026 &nbsp;|&nbsp; Effective date: May 9, 2026
          </p>

          <p className="mt-6 text-foreground/80 leading-relaxed text-[15px]">
            Please read these Terms of Service carefully before using Zevio. By accessing or using our platform,
            you agree to be bound by these terms. If you do not agree, do not use the platform.
          </p>

          <Section title="1. Definitions">
            <List items={[
              '"Zevio" refers to our SaaS platform, website, and associated services',
              '"Tenant" refers to a business that has been onboarded to use Zevio',
              '"End Customer" refers to the customers of a Tenant who interact via WhatsApp',
              '"Platform" refers to the Zevio web dashboard and backend API',
              '"WhatsApp Integration" refers to the WhatsApp Cloud API features within Zevio',
            ]} />
          </Section>

          <Section title="2. Eligibility and Account Access">
            <p>Access to Zevio is by invitation only. Accounts are created by Zevio administrators on behalf of verified business clients. You must:</p>
            <List items={[
              "Be at least 18 years of age",
              "Represent a legitimate registered business",
              "Provide accurate information during onboarding",
              "Keep your login credentials confidential",
              "Notify us immediately of any unauthorized access to your account",
            ]} />
            <p>You are responsible for all activity that occurs under your account credentials.</p>
          </Section>

          <Section title="3. Acceptable Use">
            <p>You agree to use Zevio only for lawful business purposes. You must NOT:</p>
            <List items={[
              "Use the platform to send spam, unsolicited bulk messages, or promotional content without consent",
              "Send messages that are misleading, fraudulent, or deceptive",
              "Violate Meta's WhatsApp Business Policy or Messaging Policy",
              "Collect or store sensitive personal data beyond what is necessary for service delivery",
              "Attempt to reverse engineer, hack, or disrupt the platform",
              "Resell or sublicense access to the platform without written consent",
              "Use the platform for any illegal activity including harassment, discrimination, or fraud",
              "Send messages containing adult content, gambling promotions, or regulated financial products without appropriate approvals",
            ]} />
            <p><strong>WhatsApp Policy:</strong> All WhatsApp messaging through Zevio must comply with Meta's WhatsApp Business Messaging Policy. Violations may result in your WhatsApp Business Account being restricted or banned by Meta, independent of any action we take.</p>
          </Section>

          <Section title="4. WhatsApp Business API Usage">
            <p>Zevio provides access to the WhatsApp Business Cloud API. As a Tenant, you acknowledge and agree that:</p>
            <List items={[
              "You are responsible for obtaining proper consent from your End Customers before messaging them",
              "You will only use approved message templates for outbound messages outside the 24-hour conversation window",
              'You will honour opt-out requests (users replying "STOP") immediately',
              "You will not use WhatsApp messaging for purposes prohibited by Meta's policies",
              "Your WhatsApp Business Account is subject to Meta's review and may be restricted by Meta at their discretion",
              "Zevio is not responsible for actions taken by Meta against your WhatsApp Business Account",
            ]} />
          </Section>

          <Section title="5. AI and Automated Messaging">
            <p>Zevio uses AI (powered by Groq's language models) to generate automated responses to customer messages. You acknowledge that:</p>
            <List items={[
              "Zevio is not liable for any incorrect pricing, availability, or service information communicated by the AI if caused by inaccurate context you provided",
              "AI message content is processed by Groq's API — you consent to this processing by using the platform",
            ]} />
          </Section>

          <Section title="6. Data Responsibilities">
            <p>As a Tenant, you act as the data controller for your End Customers' data. You are responsible for:</p>
            <List items={[
              "Having a lawful basis for collecting and processing your End Customers' personal data",
              "Providing your End Customers with appropriate privacy notices",
              "Handling data deletion requests from your End Customers",
              "Ensuring your use of Zevio complies with applicable data protection laws (including GDPR, PDPB, or local equivalents)",
            ]} />
            <p>Zevio acts as a data processor on your behalf. Our Data Processing Agreement (DPA) governs this relationship.</p>
          </Section>

          <Section title="7. Platform Availability">
            <p>We aim to provide a reliable service but do not guarantee 100% uptime. We are not liable for:</p>
            <List items={[
              "Downtime caused by third-party services (Meta/WhatsApp API, Groq, database providers)",
              "Scheduled maintenance windows (we will notify you in advance where possible)",
              "Force majeure events beyond our reasonable control",
            ]} />
          </Section>

          <Section title="8. Intellectual Property">
            <p>All software, design, code, and content comprising the Zevio platform is owned by us and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works from any part of our platform without written permission.</p>
            <p>You retain ownership of your business data, customer data, and content you upload to the platform. By using Zevio, you grant us a limited licence to process this data solely to provide the service.</p>
          </Section>

          <Section title="9. Confidentiality">
            <p>Both parties agree to keep confidential any non-public information shared during the business relationship, including but not limited to login credentials, API keys, business data, and pricing information.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>To the maximum extent permitted by law, Zevio shall not be liable for:</p>
            <List items={[
              "Indirect, incidental, or consequential damages",
              "Loss of profits, revenue, or business opportunities",
              "Data loss or corruption beyond our reasonable control",
              "Actions or decisions made based on AI-generated responses",
              "Losses arising from WhatsApp account restrictions imposed by Meta",
            ]} />
            <p>Our total liability in any matter shall not exceed the amount paid by you to us in the 3 months preceding the claim.</p>
          </Section>

          <Section title="11. Indemnification">
            <p>You agree to indemnify and hold harmless Zevio, its owners, and staff from any claims, damages, or expenses arising from:</p>
            <List items={[
              "Your violation of these Terms",
              "Your violation of Meta's WhatsApp Business policies",
              "Your misuse of customer data",
              "Any content you send through the platform",
            ]} />
          </Section>

          <Section title="12. Termination">
            <p>We reserve the right to suspend or terminate your access to Zevio if:</p>
            <List items={[
              "You violate these Terms of Service",
              "You violate Meta's WhatsApp Business policies",
              "Your account shows signs of fraudulent or harmful activity",
              "You fail to pay applicable service fees (if any)",
            ]} />
            <p>Upon termination, your data will be retained for 30 days after which it will be permanently deleted, unless a longer retention period is required by law.</p>
          </Section>

          <Section title="13. Modifications to Terms">
            <p>We may update these Terms from time to time. We will notify Tenant administrators by email at least 14 days before material changes take effect. Continued use of the platform after the effective date constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="14. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.</p>
          </Section>

          <Section title="15. Contact">
            <p>For questions about these Terms:</p>
            <p>Email: <a className="underline" href="mailto:dhineshkumarthota@gmail.com">dhineshkumarthota@gmail.com</a></p>
            <p>Website: <a className="underline" href="https://flow-gent.lovable.app">flow-gent.lovable.app</a></p>
          </Section>
        </div>
      </article>
    </main>
  );
}
