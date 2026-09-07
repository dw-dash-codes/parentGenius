import homeBanner from "../assets/home_banner.jpg";

export default function TermsConditions() {
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
            Terms &amp; Conditions
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
          Welcome to ParentGenius. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the ParentGenius app, website, and any associated services (&ldquo;Services&rdquo;). By using ParentGenius, you agree to these Terms. If you do not agree, do not use our Services.
        </p>

        <div className="space-y-6 text-base sm:text-lg text-ink-700 leading-relaxed">
          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              1. Use of the Services
            </h3>
            <p className="mb-3">
              You must be at least 18 years old to use ParentGenius. By creating an account, you agree to:
            </p>
            <div className="space-y-1.5 pl-1">
              <p>Use the app only for personal, non-commercial purposes</p>
              <p>Provide accurate and up-to-date account information</p>
              <p>Not misuse, copy, or redistribute any content or tools</p>
              <p>Keep your login credentials secure at all times</p>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              2. Subscription &amp; Payment
            </h3>
            <p className="mb-3">
              ParentGenius offers access tiers including free content and premium subscriptions. Details:
            </p>
            <div className="space-y-1.5 pl-1">
              <p>Subscriptions auto-renew according to your chosen billing cycle unless canceled</p>
              <p>You may cancel anytime from within your account settings</p>
              <p>All payments are processed securely via third-party platforms</p>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              3. Community Guidelines &amp; User Content
            </h3>
            <p className="mb-3">
              Users are solely responsible for solutions, comments, and ratings shared in community forums. You agree not to post harmful, abusive, or misleading advice. ParentGenius reserves the right to moderate or remove content that violates community standards.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              4. Professional Support &amp; Medical Disclaimer
            </h3>
            <p className="mb-3">
              The educational materials, community answers, and courses provided by ParentGenius are for informational purposes only and do not constitute formal medical or psychiatric diagnoses. Consultation services connect users with independent specialists.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-ink-900 mb-2">
              5. Intellectual Property
            </h3>
            <p className="mb-3">
              All content within the app—including courses, guides, designs, and trademarks—is the property of ParentGenius or its licensors. You may not reproduce or distribute any material without prior written permission.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}