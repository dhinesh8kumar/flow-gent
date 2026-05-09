import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Flowgent" },
      { name: "description", content: "How Flowgent collects, uses, and protects information across our WhatsApp AI booking platform." },
      { property: "og:title", content: "Privacy Policy — Flowgent" },
      { property: "og:description", content: "How Flowgent collects, uses, and protects information across our WhatsApp AI booking platform." },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-foreground/80 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--grid-pattern)" }} />

      <header className="max-w-3xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight text-foreground/80 hover:text-foreground transition">
          ← Flowgent
        </Link>
        <Link
          to="/"
          className="text-xs font-medium px-4 py-2 rounded-full neu-sm hover:opacity-90 transition"
        >
          Home
        </Link>
      </header>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div className="neu rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Last updated: May 9, 2026 &nbsp;|&nbsp; Effective date: May 9, 2026
          </p>

          <p className="mt-6 text-foreground/80 leading-relaxed text-[15px]">
            This Privacy Policy describes how Flowgent ("we", "us", or "our") collects, uses, and protects information
            when you use our platform. By using Flowgent, you agree to the practices described in this policy.
          </p>

          <Section title="1. Who We Are">
            <p>
              Flowgent is a multi-tenant SaaS platform that enables businesses ("Tenants") to manage customer bookings,
              automate WhatsApp conversations using AI, and manage their operations through a web dashboard. We act as a
              data processor on behalf of our Tenant businesses, who are the data controllers for their customers' data.
            </p>
            <p>For questions about this policy, contact us at: dhineshkumarthota@gmail.com.</p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 className="font-semibold text-foreground">2.1 Information from Tenant Businesses (our customers)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Business name, city, and contact details provided during onboarding</li>
              <li>Admin user name and email address</li>
              <li>WhatsApp Business Phone Number ID and Access Token (stored encrypted)</li>
              <li>Service and pricing information entered into the platform</li>
              <li>AI context text describing business rules and offerings</li>
            </ul>
            <h3 className="font-semibold text-foreground mt-4">2.2 Information from End Customers (customers of our Tenants)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>WhatsApp phone number (collected when they message the Tenant's WhatsApp number)</li>
              <li>Name (if shared by the customer during conversation)</li>
              <li>Message content exchanged with the AI chatbot</li>
              <li>Booking details: service type, date, time, delivery address, locality</li>
              <li>Location information (area/locality shared during booking)</li>
            </ul>
            <h3 className="font-semibold text-foreground mt-4">2.3 Technical Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Server logs including IP addresses and request timestamps</li>
              <li>Error logs for debugging and platform improvement</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>To operate and deliver the Flowgent platform to Tenant businesses</li>
              <li>To process and manage customer bookings on behalf of Tenants</li>
              <li>To power AI-driven WhatsApp conversation responses</li>
              <li>To authenticate dashboard users and protect accounts</li>
              <li>To monitor platform health and fix technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="4. WhatsApp and Meta Platform Data">
            <p>
              Flowgent integrates with the WhatsApp Business Cloud API provided by Meta Platforms, Inc. By using our
              platform, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Message data flows through Meta's infrastructure before reaching our platform</li>
              <li>We process WhatsApp messages solely to provide the booking and automation service</li>
              <li>We do not use WhatsApp message content for advertising or marketing purposes</li>
              <li>We do not sell WhatsApp message data to any third party</li>
              <li>We comply with Meta's WhatsApp Business API Terms of Service and Platform Policies</li>
              <li>End customers can opt out of receiving messages by replying "STOP"</li>
            </ul>
          </Section>

          <Section title="5. Data Storage and Security">
            <p>We take security seriously and implement the following measures:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Encryption at rest:</strong> Sensitive credentials (WhatsApp tokens) are encrypted using AES-256-CBC before storage</li>
              <li><strong>Encryption in transit:</strong> All data is transmitted over HTTPS/TLS</li>
              <li><strong>Access control:</strong> Role-based access (Admin, Operator) limits who can access what data</li>
              <li><strong>JWT authentication:</strong> Dashboard access is protected by signed JWT tokens</li>
              <li><strong>Database security:</strong> Multi-tenant isolation ensures each business can only access their own data</li>
              <li><strong>No plain-text credentials:</strong> Passwords are hashed using bcrypt</li>
            </ul>
            <p>
              Your data is stored on secure cloud infrastructure. We use Neon (PostgreSQL) as our database provider,
              which maintains SOC 2 Type II compliance.
            </p>
          </Section>

          <Section title="6. Data Sharing and Third Parties">
            <p>We do not sell, rent, or trade your personal data. We share data only with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Meta Platforms (WhatsApp Cloud API):</strong> To send and receive WhatsApp messages</li>
              <li><strong>Groq Inc.:</strong> AI model provider. Message content is sent to Groq to generate automated replies. Groq does not retain data beyond the API call per their terms</li>
              <li><strong>Neon Inc.:</strong> Database infrastructure provider</li>
              <li><strong>Law enforcement:</strong> Only if required by applicable law or valid legal process</li>
            </ul>
          </Section>

          <Section title="7. Data Retention">
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Conversation messages:</strong> Retained for 90 days then automatically deleted</li>
              <li><strong>Booking records:</strong> Retained for 3 years for business and legal compliance</li>
              <li><strong>Customer records:</strong> Retained while the Tenant account is active</li>
              <li><strong>Tenant account data:</strong> Deleted within 30 days of account termination upon request</li>
            </ul>
          </Section>

          <Section title="8. Your Rights">
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Opt-out:</strong> End customers can stop receiving WhatsApp messages by replying "STOP"</li>
              <li><strong>Data portability:</strong> Request your data in a machine-readable format</li>
            </ul>
            <p>To exercise any of these rights, email us at dhineshkumarthota@gmail.com. We will respond within 30 days.</p>
          </Section>

          <Section title="9. Data Deletion Requests">
            <p>You can request complete deletion of your data by:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Emailing dhineshkumarthota@gmail.com with subject "Data Deletion Request"</li>
              <li>Using our data deletion endpoint: POST https://api.flowgent.app/meta/data-deletion</li>
            </ul>
            <p>We will process deletion requests within 30 days and send confirmation to the requesting email address.</p>
          </Section>

          <Section title="10. Cookies">
            <p>
              Our dashboard web application uses only essential session-based authentication tokens stored in browser
              localStorage. We do not use tracking cookies or third-party advertising cookies.
            </p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              Flowgent is a business platform not directed at children under 13. We do not knowingly collect data from
              children. If you believe a child has provided us with personal data, contact us immediately.
            </p>
          </Section>

          <Section title="12. International Data Transfers">
            <p>
              Our infrastructure is hosted in data centers that may be located outside your country. By using Flowgent,
              you consent to your data being transferred and processed in these locations. We ensure appropriate
              safeguards are in place for all international transfers.
            </p>
          </Section>

          <Section title="13. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify Tenant administrators by email at
              least 14 days before significant changes take effect. Continued use of the platform after changes
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>For privacy-related questions, data requests, or concerns:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email: dhineshkumarthota@gmail.com</li>
              <li>Website: https://flow-gent.lovable.app/</li>
            </ul>
          </Section>
        </div>
      </article>
    </main>
  );
}