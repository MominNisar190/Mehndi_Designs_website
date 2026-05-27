export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Saniya Mehndi Designs — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-white mb-3">Privacy Policy</h1>
        <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Last updated: May 2026</p>
      </div>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="font-serif text-xl text-white mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong className="text-gold-500">Saniya Mehndi Designs</strong> ("we", "our", or "us"),
            operated by Saniya Momin, located at Shiradhon, Nanded, Maharashtra, India — 431601.
            This Privacy Policy explains how we collect, use, and protect your personal information when you
            use our website at <strong className="text-gold-500">saniya-mehndi-designer.vercel.app</strong> and
            related services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect the following information when you use our services:</p>
          <ul className="space-y-2 list-none">
            {[
              'Full name — for booking identification',
              'Phone number — for appointment confirmation and WhatsApp communication',
              'Email address — for booking confirmation (optional)',
              'Booking details — date, time, design preference, special requests',
              'Usage data — pages visited, browser type (via standard web analytics)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">3. How We Use Your Information</h2>
          <ul className="space-y-2 list-none">
            {[
              'To confirm and manage your mehndi appointments',
              'To contact you via WhatsApp or phone regarding your booking',
              'To send booking confirmation and status updates',
              'To improve our services and website experience',
              'To respond to your queries and support requests',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">4. WhatsApp Communication</h2>
          <p>
            By providing your phone number and submitting a booking, you consent to receive WhatsApp messages
            from us regarding your appointment status, confirmations, and related updates. You may opt out at
            any time by contacting us at <strong className="text-gold-500">saniyamomin196@gmail.com</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">5. Data Storage & Security</h2>
          <p>
            Your data is stored securely on MongoDB Atlas (cloud database) with industry-standard encryption.
            Images are stored on Cloudinary. We do not sell, trade, or rent your personal information to third parties.
            We implement appropriate technical measures to protect your data against unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">6. Third-Party Services</h2>
          <p className="mb-3">We use the following third-party services:</p>
          <ul className="space-y-2 list-none">
            {[
              'MongoDB Atlas — secure database storage',
              'Cloudinary — image storage and delivery',
              'Vercel — website hosting',
              'WhatsApp — customer communication',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="space-y-2 list-none mt-2">
            {[
              'Access the personal data we hold about you',
              'Request correction of inaccurate data',
              'Request deletion of your personal data',
              'Withdraw consent for WhatsApp communication',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            To exercise these rights, contact us at <strong className="text-gold-500">saniyamomin196@gmail.com</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">8. Cookies</h2>
          <p>
            Our website uses minimal cookies for essential functionality (authentication tokens stored in
            localStorage). We do not use tracking or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with
            an updated date. Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">10. Contact Us</h2>
          <p>For any privacy-related questions or requests:</p>
          <div className="mt-3 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-1">
            <p><span className="text-gray-500">Business:</span> <span className="text-gold-500">Saniya Mehndi Designs</span></p>
            <p><span className="text-gray-500">Owner:</span> Saniya Momin</p>
            <p><span className="text-gray-500">Address:</span> Shiradhon, Nanded, Maharashtra, India — 431601</p>
            <p><span className="text-gray-500">Email:</span> saniyamomin196@gmail.com</p>
            <p><span className="text-gray-500">Phone:</span> +91 93590 16366</p>
          </div>
        </section>

      </div>
    </div>
  );
}
