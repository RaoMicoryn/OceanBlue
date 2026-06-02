import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: '💬',
    name: 'WhatsApp',
    desc: 'Chat langsung, order custom topping, paling cepat diproses',
    color: 'from-green-400 to-emerald-600',
    shadow: 'shadow-green-500/25',
    href: 'https://wa.me/6281234567890',
    badge: 'Paling Cepat',
    badgeClass: 'bg-white/20 text-white border border-white/30',
    cta: 'Chat Sekarang',
  },
  {
    icon: '🟢',
    name: 'GrabFood',
    desc: 'Pesan lewat aplikasi Grab, gratis ongkir promo tertentu',
    color: 'from-[#00b14f] to-[#007a3b]',
    shadow: 'shadow-green-600/25',
    href: '#',
    badge: null,
    badgeClass: '',
    cta: 'Buka GrabFood',
  },
  {
    icon: '🔴',
    name: 'GoFood',
    desc: 'Order via GoFood, banyak promo cashback tersedia',
    color: 'from-red-400 to-red-600',
    shadow: 'shadow-red-500/25',
    href: '#',
    badge: null,
    badgeClass: '',
    cta: 'Buka GoFood',
  },
];

const steps = [
  { num: '01', icon: '🧋', title: 'Pilih Menu', desc: 'Pilih ukuran dan topping favoritmu dari menu kami.' },
  { num: '02', icon: '💬', title: 'Hubungi Kami', desc: 'Chat WhatsApp atau order via GrabFood / GoFood.' },
  { num: '03', icon: '⏳', title: 'Tunggu Sebentar', desc: 'Pesanan diproses, dibuat fresh buat kamu.' },
  { num: '04', icon: '🎉', title: 'Nikmati!', desc: 'Ocean Blue siap dinikmati — foto dulu biar aesthetic!' },
];

const hours = [
  { day: 'Senin – Jumat', time: '10:00 – 21:00', open: true },
  { day: 'Sabtu – Minggu', time: '09:00 – 22:00', open: true },
  { day: 'Hari Libur Nasional', time: '10:00 – 20:00', open: false },
];

const faqs = [
  { q: 'Berapa lama waktu buat pesanan?', a: 'Biasanya 5–10 menit untuk order langsung. Delivery via GrabFood / GoFood estimasi 15–30 menit tergantung lokasi.' },
  { q: 'Bisa custom manis / less sugar?', a: 'Tentu! Kalau order via WhatsApp, tinggal bilang aja preferensimu. Kami siap sesuaikan.' },
  { q: 'Apakah ada minimum order untuk delivery?', a: 'Tidak ada minimum order. Kamu bisa pesan 1 cup pun kami layani dengan senang hati!' },
  { q: 'Topping bisa lebih dari satu?', a: 'Bisa banget! Setiap topping +Rp 2.000. Campurkan sesuka hati untuk pengalaman yang unik.' },
];

export default function OrderPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef    = useRef(null);
  const badgeRef   = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);
  const platformRef = useRef(null);
  const stepsRef   = useRef(null);
  const infoRef    = useRef(null);
  const faqRef     = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(badgeRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
        .fromTo(titleRef.current,  { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.25)
        .fromTo(subRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.45);

      // Platform cards
      gsap.fromTo(platformRef.current?.children || [],
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: platformRef.current, start: 'top 80%' } }
      );

      // Steps
      gsap.fromTo(stepsRef.current?.children || [],
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' } }
      );

      // Info cards
      gsap.fromTo(infoRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: infoRef.current, start: 'top 82%' } }
      );

      // FAQ
      gsap.fromTo(faqRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.09,
          scrollTrigger: { trigger: faqRef.current, start: 'top 82%' } }
      );

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#020c18] font-body text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-[#0d2a4a] to-[#020c18] pb-16">
        <div className="blob absolute -top-16 right-[-8%] w-72 h-72 bg-ocean-mid/10 pointer-events-none" />
        <div className="blob absolute top-12 left-[-4%] w-52 h-52 bg-green-500/5 pointer-events-none" />

        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none animate-float"
            style={{
              width: `${5 + i * 3}px`, height: `${5 + i * 3}px`,
              background: i % 2 === 0 ? '#f9c642' : 'rgba(144,202,249,0.3)',
              top: `${15 + i * 13}%`, left: `${6 + i * 17}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        <svg className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="#1e88e5" />
        </svg>

        {/* Nav */}
        <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ocean-light/70 hover:text-ocean-light text-sm font-700 transition-colors duration-200 group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block">←</span>
            Kembali ke Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-mid to-ocean-deep flex items-center justify-center text-sm shadow-md">🫐</div>
            <span className="font-display text-lg">Ocean Blue</span>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-ocean-mid/20 border border-ocean-mid/40 text-ocean-light font-700 text-sm hover:bg-ocean-mid/30 transition-all duration-200">
            🧋 Lihat Menu
          </Link>
        </div>

        {/* Copy */}
        <div className="text-center px-6 pt-10 pb-4 max-w-2xl mx-auto">
          <div ref={badgeRef}>
            <span className="hero-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/15 border border-green-400/25 text-sm font-700 text-green-300 mb-5">
              🛒 Cara Order
            </span>
          </div>
          <h1 ref={titleRef} className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] text-white drop-shadow-xl mt-2 mb-4">
            Order <span className="text-lemon drop-shadow-[0_0_20px_rgba(249,198,66,0.4)]">Gampang!</span> 🛒
          </h1>
          <p ref={subRef} className="font-body text-ocean-light/55 text-base leading-relaxed">
            Pilih platform favoritmu, pesan, dan nikmati Ocean Blue —<br className="hidden sm:block" />
            fresh, aesthetic, langsung ke tanganmu 💙
          </p>
        </div>
      </div>

      {/* ── PLATFORM CARDS ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <span className="inline-block font-700 text-sm text-ocean-light/50 uppercase tracking-widest mb-3">Pilih Platform</span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white">Order Lewat Mana?</h2>
        </div>

        <div ref={platformRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col p-7 rounded-3xl bg-gradient-to-br ${p.color} text-white shadow-xl ${p.shadow} hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98] transition-all duration-300 overflow-hidden`}
            >
              {/* Decorations */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-colors duration-300" />
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-600 pointer-events-none" />
              <div className="absolute right-4 top-4 w-12 h-12 rounded-full bg-white/5 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {p.badge && (
                  <span className={`self-start text-xs font-800 px-3 py-1 rounded-full mb-5 ${p.badgeClass}`}>
                    ⚡ {p.badge}
                  </span>
                )}
                {!p.badge && <div className="mb-5" />}

                <div className="text-5xl mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="font-display text-2xl mb-2">{p.name}</h3>
                <p className="font-body text-white/75 text-sm leading-relaxed flex-1">{p.desc}</p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-800 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {p.cta}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="text-center mb-10">
          <span className="inline-block font-700 text-sm text-ocean-light/50 uppercase tracking-widest mb-3">Prosesnya</span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white">Cara Kerjanya</h2>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group relative flex flex-col p-6 rounded-3xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-ocean-light/20 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute top-5 right-5 font-display text-4xl text-white/5 group-hover:text-white/10 transition-colors duration-300 select-none">
                {step.num}
              </div>

              {/* Connector line (not last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-ocean-light/20 z-10" />
              )}

              <div className="w-12 h-12 rounded-2xl bg-ocean-mid/15 border border-ocean-light/15 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-ocean-mid/25 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="font-body font-800 text-white text-base mb-2">{step.title}</h3>
              <p className="font-body text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOKASI & JAM BUKA ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="text-center mb-10">
          <span className="inline-block font-700 text-sm text-ocean-light/50 uppercase tracking-widest mb-3">Info Toko</span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white">Lokasi & Jam Buka</h2>
        </div>

        <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Lokasi */}
          <div className="group flex flex-col gap-5 p-7 rounded-3xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] hover:border-ocean-light/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-ocean-mid/15 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                📍
              </div>
              <div>
                <h3 className="font-800 text-white text-base">Lokasi Toko</h3>
                <p className="font-body text-white/40 text-xs mt-0.5">Kunjungi kami langsung</p>
              </div>
            </div>
            <div className="space-y-1.5 pl-1">
              <p className="font-body text-white/70 text-sm leading-relaxed">Jl. Contoh No. 123, Jakarta Selatan</p>
              <p className="font-body text-white/35 text-xs">Dekat Halte Bus Transjakarta · Mudah dijangkau</p>
            </div>
            {/* Map placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-ocean-deep/40 border border-ocean-light/10 h-32 flex items-center justify-center">
              <div className="text-4xl animate-float">🗺️</div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-end p-3"
              >
                <span className="inline-flex items-center gap-1.5 bg-ocean-mid/80 backdrop-blur-sm text-white text-xs font-700 px-3 py-1.5 rounded-xl hover:bg-ocean-mid transition-colors duration-200">
                  📍 Buka Google Maps →
                </span>
              </a>
            </div>
          </div>

          {/* Jam Buka */}
          <div className="group flex flex-col gap-5 p-7 rounded-3xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] hover:border-ocean-light/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-ocean-mid/15 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                🕐
              </div>
              <div>
                <h3 className="font-800 text-white text-base">Jam Operasional</h3>
                <p className="font-body text-white/40 text-xs mt-0.5">Kami siap melayani kamu</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {hours.map((row) => (
                <div key={row.day} className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                  <span className="font-body text-white/55 text-sm">{row.day}</span>
                  <span className={`font-body font-700 text-xs px-3 py-1 rounded-full ${
                    row.open
                      ? 'bg-ocean-mid/20 text-ocean-light border border-ocean-mid/30'
                      : 'bg-white/5 text-white/30 border border-white/10'
                  }`}>
                    {row.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="font-body font-700 text-green-400 text-sm">Buka sekarang — ayo mampir! 🌊</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <div className="text-center mb-10">
          <span className="inline-block font-700 text-sm text-ocean-light/50 uppercase tracking-widest mb-3">FAQ</span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white">Pertanyaan Umum</h2>
        </div>

        <div ref={faqRef} className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open
                    ? 'border-ocean-mid/40 bg-ocean-mid/8'
                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={`font-body font-700 text-sm transition-colors duration-200 ${open ? 'text-ocean-light' : 'text-white/75'}`}>
                    {faq.q}
                  </span>
                  <span className={`text-lg flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45 text-ocean-light' : 'text-white/30'}`}>
                    +
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-4">
                    <p className="font-body text-white/45 text-sm leading-relaxed border-t border-white/[0.07] pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <div ref={ctaRef} className="max-w-4xl mx-auto px-6 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ocean-deep via-[#1565c0] to-ocean-mid p-10 text-center">
          <div className="blob absolute -top-10 -right-10 w-48 h-48 bg-white/5 pointer-events-none" />
          <div className="blob absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 pointer-events-none" />
          <svg className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none" viewBox="0 0 600 60" preserveAspectRatio="none">
            <path d="M0,30 C120,60 240,5 360,30 C480,55 560,10 600,25 L600,60 L0,60 Z" fill="white" />
          </svg>

          <div className="relative z-10">
            <div className="text-4xl mb-4 animate-float">🌊</div>
            <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white mb-3 leading-tight">
              Siap Order Sekarang?
            </h3>
            <p className="font-body text-ocean-light/65 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Hubungi kami via WhatsApp atau buka aplikasi favorit kamu. Ocean Blue siap bikin harimu lebih colorful! 🫐
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-green-500 text-white font-800 text-sm rounded-2xl shadow-xl shadow-green-500/30 hover:bg-green-400 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                💬 Chat WhatsApp
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 border border-white/25 text-white font-700 text-sm rounded-2xl backdrop-blur-sm hover:bg-white/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                🧋 Lihat Menu Dulu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer mini */}
      <div className="border-t border-white/[0.05] py-6 text-center">
        <p className="font-body text-white/15 text-xs">© 2025 Ocean Blue · Stay Cool. Stay Blue. 🌊</p>
      </div>

    </div>
  );
}