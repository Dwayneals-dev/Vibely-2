import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-4xl max-h-full glass-card rounded-2xl overflow-hidden pointer-events-auto flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
                <h2 className="text-xl font-bold font-heading text-white">
                  {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 legal-content">
                {type === 'terms' ? <TermsContent /> : <PrivacyContent />}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/[0.06] shrink-0">
                <p className="text-sm text-zinc-500 text-center">
                  Questions? Contact us at{' '}
                  <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">
                    hello@vibely.co.nz
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TermsContent() {
  return (
    <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
      <div className="text-zinc-500 text-xs">
        <p>Effective date: 06/02/2026</p>
        <p>Company: Vibely Limited ("Vibely", "we", "us", "our")</p>
        <p>Website: <a href="https://vibely.co.nz" className="text-accent-pink hover:underline">https://vibely.co.nz</a></p>
        <p>Contact: <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">hello@vibely.co.nz</a></p>
      </div>

      <Section title="1) Acceptance of these Terms">
        <p>By accessing our website, submitting an enquiry, using our client portal, or purchasing our services, you agree to these Terms. If you do not agree, do not use our website or services.</p>
      </Section>

      <Section title="2) Services">
        <p>Vibely provides website development and related services, including (as applicable) design, development, content implementation, integrations, automations, SEO configuration, analytics, hosting coordination, and ongoing site maintenance ("Services").</p>
        <p className="mt-2">Your specific deliverables, inclusions, exclusions, timelines, and pricing are defined in a written quote/proposal, statement of work, invoice, subscription sign-up, or email confirmation ("Order").</p>
      </Section>

      <Section title="3) Service tiers">
        <p>Unless your Order states otherwise, Vibely offers the following packages:</p>
        <div className="mt-3 space-y-3">
          <div>
            <h4 className="font-semibold text-white">3.1 LANDING</h4>
            <p>A 1-page website package and related inclusions as advertised or described in your Order.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">3.2 LAUNCHING</h4>
            <p>A multi-page website (up to 5 pages unless otherwise stated) and related inclusions as advertised or described in your Order.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">3.3 ORBIT</h4>
            <p>A custom website package with inclusions as advertised or described in your Order. ORBIT may include custom functionality (e.g., e-commerce) and higher-touch support as described in the Order.</p>
          </div>
        </div>
        <p className="mt-3">Where the marketing page and the Order differ, the Order governs.</p>
      </Section>

      <Section title="4) Quotes, scope, and change requests">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-white">4.1 Quote validity</h4>
            <p>Quotes are valid for 7 days unless otherwise stated.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">4.2 Scope</h4>
            <p>The Services included in your Order are the "Scope." Anything not expressly included is out of scope.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">4.3 Change Requests</h4>
            <p>Changes outside scope (including additional pages, new sections, meaningful design direction changes, new features, new integrations, or content rewrites) must be submitted via our Change Request form in the client portal (or another method we approve in writing).</p>
            <p className="mt-2">Change Requests may incur additional fees and may affect timelines.</p>
            <p className="mt-2">If we provide pricing for a Change Request, it may be provided per request, hourly, or as a fixed fee.</p>
            <p className="mt-2">For small/administrative updates, we may apply a standard "per-request" fee from time to time; if so, the fee will be shown or confirmed in the client portal or in writing prior to completion.</p>
            <p className="mt-2">We aim to complete small approved changes promptly, but turnaround times are not guaranteed and depend on workload, complexity, and third-party dependencies.</p>
          </div>
        </div>
      </Section>

      <Section title="5) Client responsibilities">
        <p>You agree to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Provide accurate information, timely feedback, and required assets (logos, images, copy, brand guidelines) by agreed deadlines.</li>
          <li>Ensure you have rights to any content you provide (see section 10).</li>
          <li>Review deliverables promptly and approve or request revisions within reasonable timeframes.</li>
        </ul>
        <p className="mt-2">Delays in content, approvals, or responses may delay timelines and launch dates.</p>
      </Section>

      <Section title="6) Timelines, dependencies, and '48 hours' language">
        <p>Where we state "48 hours" or similar timeframes, this is an estimate based on timely client inputs, approvals, and standard project complexity. Timelines may be impacted by revisions, Change Requests, and third-party services (hosting, plugins, APIs, domain registrars).</p>
      </Section>

      <Section title="7) Fees, subscriptions, invoicing, and payment">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-white">7.1 Subscription fees</h4>
            <p>Where your package includes a monthly fee, you agree to pay the subscription fee as described in your Order.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">7.2 Setup fees and project fees</h4>
            <p>Setup fees (if any) are charged as described in the Order.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">7.3 Payment terms by tier (default)</h4>
            <p>Unless your Order states otherwise:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>LANDING:</strong> No deposit required. Setup fee and any agreed charges are payable upon completion and prior to launch/hand-over as reasonably required.</li>
              <li><strong>LAUNCHING:</strong> 50% of setup fee upfront to commence work; remaining 50% payable prior to launch.</li>
              <li><strong>ORBIT:</strong> 50% upfront to commence work; remaining 50% payable prior to launch. For ORBIT, if costs or scope are variable, final pricing will be confirmed in writing.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">7.4 Non-payment</h4>
            <p>If payment is overdue, Vibely may pause work, delay launch, suspend access to deliverables, and/or suspend ongoing services (including maintenance), until accounts are brought current.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">7.5 Taxes</h4>
            <p>Prices are GST inclusive/exclusive unless stated otherwise in the Order.</p>
          </div>
        </div>
      </Section>

      <Section title="8) Revisions, approvals, and sign-off">
        <p>Unless your Order states otherwise, revisions are limited as follows:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>LANDING:</strong> 1 round of revisions</li>
          <li><strong>LAUNCHING:</strong> 2 rounds of revisions</li>
          <li><strong>ORBIT:</strong> 5 rounds of revisions</li>
        </ul>
        <p className="mt-2">A "revision round" means a consolidated set of changes provided by you in one response. Additional revision rounds, fragmented feedback, or late-stage changes may be treated as Change Requests.</p>
        <p className="mt-2">You are responsible for final review and approval prior to launch.</p>
      </Section>

      <Section title="9) Launch, acceptance, and responsibility for final content">
        <p>By approving the site for launch (including via email/portal confirmation or by instructing us to publish), you confirm the site is acceptable for release. You are responsible for ensuring the accuracy of your content, claims, pricing, legal pages, and compliance statements unless the Order explicitly states Vibely is providing compliance or legal review services (we typically do not).</p>
      </Section>

      <Section title="10) Client content and warranties">
        <p>You represent and warrant that any content, trademarks, images, video, data, or instructions you provide:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>are owned by you or properly licensed; and</li>
          <li>do not infringe third-party rights or violate law.</li>
        </ul>
        <p className="mt-2">You are responsible for any claims arising from your content.</p>
      </Section>

      <Section title="11) Intellectual property (IP)">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-white">11.1 Pre-existing IP</h4>
            <p>Each party retains ownership of its pre-existing IP, tools, templates, frameworks, know-how, and reusable components.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">11.2 Deliverables by tier</h4>
            <p>Upon full payment of all amounts due:</p>
            <p className="mt-1">Vibely grants you a licence to use the final website deliverables created specifically for you under the applicable package.</p>
            <p className="mt-1">The licence scope depends on your package and Order; in general, Vibely intends you to have full practical use of your site while retaining Vibely's reusable components and tooling.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">11.3 Third-party materials</h4>
            <p>Third-party software, themes, plugins, fonts, stock assets, and services are licensed under their respective terms. You are responsible for compliance with third-party licences and fees.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">11.4 Portfolio</h4>
            <p>Unless you request otherwise in writing, you grant Vibely permission to display the completed work (and your name/logo) in our portfolio and marketing materials.</p>
          </div>
        </div>
      </Section>

      <Section title="12) Third-party services, hosting, domains, and plugins">
        <p>Your website may rely on third-party services (e.g., hosting providers, domain registrars, analytics tools, plugins, booking systems, payment providers). Vibely is not responsible for outages, security issues, pricing changes, policy changes, or service discontinuation by third parties.</p>
      </Section>

      <Section title="13) Maintenance and support">
        <p>Unless included in your subscription or a separate maintenance agreement, ongoing updates (content changes, plugin updates, security patches, performance tuning, feature changes) are not included after handover or launch. Support priorities may differ by tier as described in the Order.</p>
      </Section>

      <Section title="14) No guarantees on business outcomes">
        <p>We do not guarantee sales, leads, SEO rankings, conversion rates, or business outcomes unless explicitly stated in writing.</p>
      </Section>

      <Section title="15) Confidentiality">
        <p>Each party agrees to keep the other party's confidential information confidential and to use it only to perform obligations under these Terms and the Order, except as required by law or to approved subcontractors bound by confidentiality.</p>
      </Section>

      <Section title="16) Acceptable use">
        <p>You agree not to attempt to gain unauthorised access to our systems, scrape or misuse our content, interfere with website operation, transmit malware, or use our website/services for unlawful or harmful activity.</p>
      </Section>

      <Section title="17) Disclaimers">
        <p>To the maximum extent permitted by law, our website and Services are provided "as is" and "as available." We disclaim all warranties not expressly stated in these Terms or the Order.</p>
      </Section>

      <Section title="18) Limitation of liability">
        <p>To the maximum extent permitted by law:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Vibely is not liable for indirect, consequential, special, incidental, or punitive losses (including loss of profits, revenue, data, or goodwill).</li>
          <li>Vibely's total liability arising out of or relating to the Services is limited to the fees paid (or payable) by you to Vibely for the Services giving rise to the claim.</li>
        </ul>
        <p className="mt-2">Nothing in these Terms limits liability that cannot be excluded under applicable law.</p>
      </Section>

      <Section title="19) Indemnity">
        <p>You agree to indemnify Vibely for losses arising from third-party claims related to your content, instructions, or misuse of the website/services, including IP infringement or unlawful content, except to the extent caused by Vibely's negligence.</p>
      </Section>

      <Section title="20) Suspension and termination">
        <p>We may suspend Services if you breach these Terms, fail to pay, or create security/legal risk. Either party may terminate an Order with written notice if the other materially breaches and fails to remedy within a reasonable time after notice. Fees for work completed and committed costs remain payable.</p>
      </Section>

      <Section title="21) Dispute resolution">
        <p>Before filing a claim, both parties agree to attempt good-faith resolution by escalation to management. Either party may propose mediation. Nothing prevents urgent injunctive relief.</p>
      </Section>

      <Section title="22) Governing law">
        <p>These Terms are governed by the laws of New Zealand and the courts of Auckland, New Zealand have non-exclusive jurisdiction.</p>
      </Section>

      <Section title="23) Changes to these Terms">
        <p>We may update these Terms by posting a new version on our website with a new effective date.</p>
      </Section>

      <Section title="24) Contact">
        <p>Questions about these Terms: <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">hello@vibely.co.nz</a></p>
      </Section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
      <div className="text-zinc-500 text-xs">
        <p>Effective date: 06/02/2026</p>
        <p>Company: Vibely Limited ("Vibely", "we", "us", "our")</p>
        <p>Website: <a href="https://vibely.co.nz" className="text-accent-pink hover:underline">https://vibely.co.nz</a></p>
        <p>Contact: <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">hello@vibely.co.nz</a></p>
      </div>

      <p>This Privacy Policy explains how Vibely collects, uses, stores, and discloses personal information when you visit our website, contact us, or use our services.</p>

      <Section title="1) What personal information we collect">
        <p>We may collect the following types of personal information:</p>

        <div className="mt-3">
          <h4 className="font-semibold text-white">1.1 Information you provide to us</h4>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Name, email address, phone number, business name, and job title.</li>
            <li>Enquiry details and messages you send us.</li>
            <li>Project information you provide (including content, assets, feedback, and instructions).</li>
            <li>Billing and payment-related information (such as invoices, transaction references, and billing contact details).</li>
          </ul>
          <p className="mt-2 text-zinc-400 text-xs">Note: If you pay using a third-party payment provider, we generally do not store full card details.</p>
        </div>

        <div className="mt-3">
          <h4 className="font-semibold text-white">1.2 Information we collect automatically</h4>
          <p>When you use our website, we may automatically collect:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>IP address and approximate location (e.g., city/region).</li>
            <li>Browser type, device information, operating system, and language settings.</li>
            <li>Pages viewed, time spent, clicks, referral URLs, and other usage data.</li>
            <li>Cookie identifiers and similar tracking technologies.</li>
          </ul>
        </div>

        <div className="mt-3">
          <h4 className="font-semibold text-white">1.3 Information we receive from third parties</h4>
          <p>We may receive personal information from third-party services where relevant to providing services to you, such as:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Hosting providers, domain registrars, website platforms, analytics providers.</li>
            <li>Payment processors (where you pay online).</li>
            <li>Advertising and marketing platforms (if you interact with our ads or campaigns).</li>
          </ul>
        </div>
      </Section>

      <Section title="2) How we use personal information">
        <p>We use personal information to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>respond to enquiries and provide quotes;</li>
          <li>deliver and manage services and projects;</li>
          <li>communicate with you about your project, support requests, billing, or account;</li>
          <li>create, manage, and secure access to client portals or project systems (if used);</li>
          <li>invoice and process payments;</li>
          <li>maintain, troubleshoot, and improve our website and services;</li>
          <li>monitor and prevent fraud, misuse, or security issues;</li>
          <li>comply with legal obligations and enforce our Terms of Service.</li>
        </ul>
      </Section>

      <Section title="3) Legal bases for processing (where applicable)">
        <p>Where privacy laws require a legal basis (for example, GDPR), we process personal information based on:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Contract</strong> (to provide services you request or purchase);</li>
          <li><strong>Legitimate interests</strong> (to operate, secure, and improve our business);</li>
          <li><strong>Consent</strong> (for optional marketing or cookies where required); and/or</li>
          <li><strong>Legal obligation</strong> (to meet tax, accounting, or regulatory requirements).</li>
        </ul>
      </Section>

      <Section title="4) Marketing communications">
        <p>We may send you service-related communications (e.g., project updates, billing notices).</p>
        <p className="mt-2">If you opt in (or where permitted by law), we may also send marketing emails. You can opt out at any time by using the unsubscribe link or contacting us at <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">hello@vibely.co.nz</a>.</p>
      </Section>

      <Section title="5) Cookies and analytics">
        <p>We use cookies and similar technologies to operate our website and understand how people use it. This may include analytics tools (e.g., Google Analytics or similar services).</p>
        <p className="mt-2">You can control cookies through your browser settings and may be able to disable some tracking. If you disable cookies, parts of the website may not function properly.</p>
      </Section>

      <Section title="6) Who we share personal information with">
        <p>We may share personal information with:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Service providers who help us run our business and deliver services (e.g., hosting, domain registration, website platforms, analytics, email, customer support, project management tools).</li>
          <li>Payment processors and billing providers (where you pay online).</li>
          <li>Professional advisers (legal, accounting, insurance) where necessary.</li>
          <li>Authorities where required by law, court order, or to protect rights, safety, and security.</li>
        </ul>
        <p className="mt-2 font-semibold text-white">We do not sell your personal information.</p>
      </Section>

      <Section title="7) International data transfers">
        <p>Some of our service providers may store or process personal information outside New Zealand. Where we transfer information internationally, we take reasonable steps to ensure appropriate safeguards are in place (for example, contractual protections and reputable providers).</p>
      </Section>

      <Section title="8) How long we keep personal information">
        <p>We retain personal information only for as long as necessary to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>provide services and support,</li>
          <li>meet legal, tax, and accounting obligations,</li>
          <li>resolve disputes, and</li>
          <li>enforce agreements.</li>
        </ul>
        <p className="mt-2">When information is no longer needed, we take reasonable steps to delete, anonymise, or securely destroy it.</p>
      </Section>

      <Section title="9) Security">
        <p>We use reasonable administrative, technical, and physical safeguards to protect personal information. However, no system is completely secure, and we cannot guarantee absolute security of information transmitted or stored electronically.</p>
      </Section>

      <Section title="10) Your rights and choices">
        <p>Depending on your location and applicable law, you may have rights to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>request access to your personal information;</li>
          <li>request correction of inaccurate or outdated information;</li>
          <li>request deletion or restriction of processing (in some cases);</li>
          <li>object to certain processing; and</li>
          <li>withdraw consent (where processing is based on consent).</li>
        </ul>
        <p className="mt-2">To make a request, contact <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">hello@vibely.co.nz</a>. We may need to verify your identity before fulfilling requests.</p>
      </Section>

      <Section title="11) Children's privacy">
        <p>Our website and services are not intended for children under 13 (or the minimum age required by applicable law). We do not knowingly collect personal information from children.</p>
      </Section>

      <Section title="12) Third-party links">
        <p>Our website may include links to third-party websites and services. We are not responsible for the privacy practices of third parties. Please review their privacy policies before providing information.</p>
      </Section>

      <Section title="13) Changes to this Privacy Policy">
        <p>We may update this Privacy Policy from time to time by posting the updated version on our website. The "Effective date" at the top shows when this policy was last updated.</p>
      </Section>

      <Section title="14) Contact us">
        <p>If you have questions, complaints, or requests about privacy, contact:</p>
        <div className="mt-2">
          <p>Vibely Limited</p>
          <p>Email: <a href="mailto:hello@vibely.co.nz" className="text-accent-pink hover:underline">hello@vibely.co.nz</a></p>
          <p>Website: <a href="https://vibely.co.nz" className="text-accent-pink hover:underline">https://vibely.co.nz</a></p>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      {children}
    </div>
  );
}
