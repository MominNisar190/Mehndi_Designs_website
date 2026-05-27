export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for using Saniya Mehndi Designs services and website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-white mb-3">Terms & Conditions</h1>
        <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Last updated: May 2026</p>
      </div>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="font-serif text-xl text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the website of <strong className="text-gold-500">Saniya Mehndi Designs</strong>
            (saniya-mehndi-designer.vercel.app) and booking our services, you agree to be bound by these
            Terms & Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">2. Services</h2>
          <p>
            Saniya Mehndi Designs provides professional mehndi (henna) artistry services including bridal,
            Arabic, festive, and minimal designs. Services are available at our location in Nanded,
            Maharashtra, and as home service in nearby areas.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">3. Booking Policy</h2>
          <ul className="space-y-2 list-none">
            {[
              'Bookings are subject to availability and confirmation by our team.',
              'We will contact you via WhatsApp or phone to confirm your appointment.',
              'Please provide accurate contact details when booking.',
              'Bookings are confirmed only after receiving acknowledgment from us.',
              'We reserve the right to decline any booking at our discretion.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">4. Cancellation Policy</h2>
          <ul className="space-y-2 list-none">
            {[
              'Cancellations must be made at least 24 hours before the appointment.',
              'Late cancellations (less than 24 hours) may result in a cancellation fee.',
              'No-shows without prior notice may affect future booking eligibility.',
              'We reserve the right to cancel appointments due to unforeseen circumstances.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">5. Pricing</h2>
          <p>
            Prices for our services are as displayed on our website. Prices may vary based on design
            complexity, duration, and service type. Final pricing will be confirmed at the time of booking
            confirmation. We reserve the right to update prices without prior notice.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">6. Health & Safety</h2>
          <ul className="space-y-2 list-none">
            {[
              'We use natural, skin-safe henna products.',
              'Please inform us of any skin allergies or sensitivities before the appointment.',
              'We are not liable for allergic reactions if prior conditions were not disclosed.',
              'Clients with skin conditions should consult a doctor before getting mehndi.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">7. Intellectual Property</h2>
          <p>
            All design images, content, and materials on this website are the property of
            Saniya Mehndi Designs. You may not reproduce, distribute, or use our content without
            prior written permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">8. Limitation of Liability</h2>
          <p>
            Saniya Mehndi Designs shall not be liable for any indirect, incidental, or consequential
            damages arising from the use of our services or website. Our maximum liability is limited
            to the amount paid for the specific service in question.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">9. User Conduct</h2>
          <p>When using our website and services, you agree not to:</p>
          <ul className="space-y-2 list-none mt-2">
            {[
              'Provide false or misleading information',
              'Use our services for any unlawful purpose',
              'Attempt to disrupt or damage our website',
              'Harass or abuse our staff or other users',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">•</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">10. Governing Law</h2>
          <p>
            These Terms & Conditions are governed by the laws of India. Any disputes shall be subject
            to the jurisdiction of courts in Nanded, Maharashtra, India.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-white mb-3">11. Contact</h2>
          <p>For any questions regarding these Terms & Conditions:</p>
          <div className="mt-3 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-1">
            <p><span className="text-gray-500">Business:</span> <span className="text-gold-500">Saniya Mehndi Designs</span></p>
            <p><span className="text-gray-500">Address:</span> Shiradhon, Nanded, Maharashtra, India — 431601</p>
            <p><span className="text-gray-500">Email:</span> saniyamomin196@gmail.com</p>
            <p><span className="text-gray-500">Phone:</span> +91 93590 16366</p>
          </div>
        </section>

      </div>
    </div>
  );
}
