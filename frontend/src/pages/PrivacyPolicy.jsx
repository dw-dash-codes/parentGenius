import homeBanner from "../assets/home_banner.jpg";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-16 px-6">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-4xl mx-auto text-center py-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 sm:py-16 text-ink-900">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          Condition &amp; Attending
        </h2>
        
        <p className="text-base font-semibold text-ink-700 mb-8">
          Effective Date: July 30, 2025
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-ink-700 mb-8">
          At ParentGenius, your privacy is our priority. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our website, app, and related services (&ldquo;Services&rdquo;).
        </p>

        <div className="space-y-6 text-base sm:text-lg text-ink-700 leading-relaxed">
          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              1. Information We Collect
            </h3>
            <p className="mb-3">We may collect the following types of information:</p>

            <div className="space-y-4 pl-1">
              <div>
                <p className="font-bold text-ink-900">a.</p>
                <p className="font-semibold text-ink-900">Account Information</p>
                <p>Name, email address, and password</p>
                <p>Child age ranges and parenting goals (to personalize content)</p>
              </div>

              <div>
                <p className="font-bold text-ink-900">b.</p>
                <p className="font-semibold text-ink-900">Usage Data</p>
                <p>Course and content activity</p>
                <p>Progress tracking and earned rewards</p>
                <p>Interactions in the community or forums</p>
                <p>Device information and app usage statistics</p>
              </div>

              <div>
                <p className="font-bold text-ink-900">c.</p>
                <p className="font-semibold text-ink-900">Payment &amp; Consultation Details</p>
                <p>Billing metadata processed via secure third-party gateways</p>
                <p>Appointment dates and booking notes for professional support sessions</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              2. How We Use Your Information
            </h3>
            <p className="mb-3">We use your data to:</p>
            <div className="space-y-1.5 pl-1">
              <p>Deliver personalized parenting courses and daily challenges</p>
              <p>Facilitate community discussions and solution sharing</p>
              <p>Process subscriptions and manage support bookings</p>
              <p>Maintain platform security and prevent unauthorized access</p>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              3. Data Protection &amp; Children&apos;s Privacy
            </h3>
            <p className="mb-3">
              ParentGenius is designed for parents and guardians. We do not knowingly collect personal identifiable information directly from children under the age of 13. All data provided regarding child development milestones is encrypted and used solely for personalized parent guidance.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              4. Contact Us
            </h3>
            <p className="mb-3">
              If you have any questions or requests regarding your personal data, please contact our privacy support team at privacy@parentgenius.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}