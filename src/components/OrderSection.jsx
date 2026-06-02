import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MessageCircle, MapPin, Clock, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const orderLinks = [
  {
    icon: <MessageCircle className="w-10 h-10 text-white" fill="white" />,
    name: 'WhatsApp',
    desc: 'Chat langsung untuk order',
    color: 'from-green-400 to-green-600',
    shadow: 'shadow-green-400/30',
    href: 'https://wa.me/6281234567890',
    badge: 'Paling Cepat',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    icon: <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display text-white text-lg">G</span>,
    name: 'GrabFood',
    desc: 'Order via GrabFood',
    color: 'from-[#00b14f] to-[#007a3b]',
    shadow: 'shadow-green-500/30',
    href: '#',
    badge: null,
    badgeColor: '',
  },
  {
    icon: <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display text-white text-lg">G</span>,
    name: 'GoFood',
    desc: 'Order via GoFood',
    color: 'from-red-400 to-red-600',
    shadow: 'shadow-red-400/30',
    href: '#',
    badge: null,
    badgeColor: '',
  },
];

export default function OrderSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(infoRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: infoRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="order" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-body font-700 text-sm text-ocean-mid bg-ocean-pale px-4 py-1.5 rounded-full mb-4">
            Cara Order
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] text-ocean-deep mb-4">
            Mau Order? <span className="text-ocean-mid">Gampang!</span>
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-md mx-auto">
            Pilih platform favoritmu untuk order Ocean Blue sekarang!
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {orderLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-3xl bg-gradient-to-br ${link.color} text-white shadow-xl ${link.shadow} hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                {link.badge && (
                  <span className={`inline-block text-xs font-body font-800 px-3 py-1 rounded-full mb-4 ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                )}
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{link.icon}</div>
                <h3 className="font-display text-2xl mb-1">{link.name}</h3>
                <p className="font-body text-white/80 text-sm">{link.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-body font-700 opacity-70 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300">
                  Order sekarang <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-ocean-light/30 p-7 bg-ocean-pale/30 hover:bg-ocean-pale/50 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-ocean-mid/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-ocean-mid" />
              </div>
              <div>
                <h3 className="font-body font-800 text-ocean-deep text-lg mb-2">Lokasi Toko</h3>
                <p className="font-body text-gray-600 mb-1">Jl. Sukamaju No. 123, Jakarta Barat</p>
                <p className="font-body text-gray-400 text-sm">Dekat Halte Bus, Mudah Dijangkau</p>
                <a href="https://maps.app.goo.gl/SKmL1VZcSG8M4tKM7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ocean-mid font-body font-700 text-sm mt-3 hover:underline">
                  Buka Google Maps <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-ocean-light/30 p-7 bg-ocean-pale/30 hover:bg-ocean-pale/50 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-ocean-mid/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-ocean-mid" />
              </div>
              <div className="w-full">
                <h3 className="font-body font-800 text-ocean-deep text-lg mb-3">Jam Buka</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Senin – Jumat', hours: '10:00 – 21:00', active: true },
                    { day: 'Sabtu – Minggu', hours: '09:00 – 22:00', active: true },
                    { day: 'Hari Libur', hours: '10:00 – 20:00', active: false },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center">
                      <span className="font-body text-gray-600 text-sm">{row.day}</span>
                      <span className={`font-body font-700 text-sm px-3 py-0.5 rounded-full ${row.active ? 'text-ocean-mid bg-ocean-pale' : 'text-gray-400 bg-gray-100'}`}>
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-600 font-body font-700 text-sm">Buka sekarang</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}