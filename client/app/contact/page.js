import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Saniya Mehndi Designs. Book your appointment or ask any questions.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">Contact Us</h1>
        <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-4" />
        <p className="text-gray-400 max-w-xl mx-auto">
          We'd love to hear from you. Reach out for bookings, queries, or just to say hello!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="font-serif text-2xl text-white mb-6">Get In Touch</h2>

          <a href="https://wa.me/919359016366" target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm hover:border-green-500/40 transition-all group">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
              <MessageCircle size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm group-hover:text-green-400 transition-colors">WhatsApp</p>
              <p className="text-gray-400 text-sm">+91 93590 16366</p>
              <p className="text-gray-600 text-xs mt-0.5">Click to chat on WhatsApp</p>
            </div>
          </a>

          <a href="tel:+919359016366"
            className="flex items-start gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm hover:border-gold-500/40 transition-all group">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-gold-500" />
            </div>
            <div>
              <p className="text-white font-medium text-sm group-hover:text-gold-500 transition-colors">Phone</p>
              <p className="text-gray-400 text-sm">+91 93590 16366</p>
            </div>
          </a>

          <a href="mailto:saniyamomin196@gmail.com"
            className="flex items-start gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm hover:border-gold-500/40 transition-all group">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-gold-500" />
            </div>
            <div>
              <p className="text-white font-medium text-sm group-hover:text-gold-500 transition-colors">Email</p>
              <p className="text-gray-400 text-sm">saniyamomin196@gmail.com</p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-gold-500" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Business Address</p>
              <p className="text-gray-400 text-sm">Shiradhon, Nanded</p>
              <p className="text-gray-400 text-sm">Maharashtra, India — 431601</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-gold-500" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Business Hours</p>
              <p className="text-gray-400 text-sm">Monday – Saturday: 9:00 AM – 7:00 PM</p>
              <p className="text-gray-400 text-sm">Sunday: By appointment only</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-2xl text-white">Book an Appointment</h2>
          <div className="bg-[#141414] border border-gold-500/20 rounded-sm p-6 space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Ready to get beautiful mehndi done? Book your appointment online in minutes.
            </p>
            <a href="/booking" className="btn-gold w-full py-3 text-center block">Book Now</a>
            <a href="https://wa.me/919359016366?text=Hi%20Saniya%20Mehndi%20Designs%2C%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 border border-green-500/40 text-green-400 hover:bg-green-500/5 rounded-sm transition-colors text-sm font-medium">
              <MessageCircle size={16} /> Book via WhatsApp
            </a>
          </div>

          <div className="bg-[#141414] border border-[#2a2a2a] rounded-sm p-6 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick FAQ</h3>
            {[
              { q: 'Do you offer home service?', a: 'Yes, we offer home service in Nanded and nearby areas.' },
              { q: 'How far in advance should I book?', a: 'We recommend booking at least 2–3 days in advance. For bridal, 1–2 weeks.' },
              { q: 'How long does mehndi last?', a: 'Typically 1–3 weeks depending on skin type and care.' },
            ].map((item) => (
              <div key={item.q} className="border-b border-[#2a2a2a] pb-3 last:border-0 last:pb-0">
                <p className="text-gold-500 text-xs font-medium mb-1">{item.q}</p>
                <p className="text-gray-400 text-xs">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
