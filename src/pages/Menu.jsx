import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuData = [
  {
    id: 1,
    name: 'Ocean Blue Original',
    description: 'Blueberry segar + lemon squeeze + ice + pilihan topping',
    sizes: [
      { label: 'Regular', price: 12000 },
      { label: 'Large', price: 15000 },
    ],
    badge: 'Best Seller',
    badgeClass: 'bg-lemon/20 text-lemon border border-lemon/40',
    emoji: '🫐',
    gradientFrom: 'from-ocean-mid',
    gradientTo: 'to-ocean-deep',
  },
  {
    id: 2,
    name: 'Lemon Ocean Fizz',
    description: 'Perpaduan lemon segar & blue curacao yang instagrammable',
    sizes: [
      { label: 'Regular', price: 12000 },
      { label: 'Large', price: 15000 },
    ],
    badge: 'Trending',
    badgeClass: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40',
    emoji: '🍋',
    gradientFrom: 'from-[#f9c642]',
    gradientTo: 'to-ocean-mid',
  },
  {
    id: 3,
    name: 'Blue Matcha Splash',
    description: 'Matcha premium + butterfly pea tea untuk warna magical',
    sizes: [
      { label: 'Regular', price: 12000 },
      { label: 'Large', price: 15000 },
    ],
    badge: 'New',
    badgeClass: 'bg-teal-400/20 text-teal-300 border border-teal-400/40',
    emoji: '🍵',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-ocean-deep',
  },
  {
    id: 4,
    name: 'Ocean Coconut Bliss',
    description: 'Kelapa muda segar + blue ocean syrup — tropical vibes',
    sizes: [
      { label: 'Regular', price: 12000 },
      { label: 'Large', price: 15000 },
    ],
    badge: null,
    badgeClass: '',
    emoji: '🥥',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-ocean-deep',
  },
];

const toppingPrice = 2000;
const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

function MenuCard({ item, index }) {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const cardRef = useRef(null);

  const toppings = item.sizes[0].label === 'Regular'
    ? ['Lychee Jelly', 'Coconut Jelly', 'Tapioca Pearl', 'Grass Jelly', 'Cheese Foam', 'Popping Boba']
    : ['Lychee Jelly', 'Coconut Jelly', 'Tapioca Pearl'];

  const toggleTopping = (t) =>
    setSelectedToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const total = selectedSize.price + selectedToppings.length * toppingPrice;

  const handleOrder = () => {
    const toppingText = selectedToppings.length > 0
      ? `%0ATopping: ${selectedToppings.join(', ')}`
      : '';
    const msg = `Halo! Saya mau pesan:%0A%0A🧋 ${item.name}%0AUkuran: ${selectedSize.label}${toppingText}%0ATotal: ${formatRupiah(total)}%0A%0AThank you! 🌊`;
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
    setOrdered(true);
    setTimeout(() => setOrdered(false), 2500);
  };

  return (
    <div
      ref={cardRef}
      className="menu-card group flex flex-col rounded-3xl overflow-hidden border border-ocean-light/10 bg-[#0a1929] hover:border-ocean-mid/40 hover:shadow-2xl hover:shadow-ocean-mid/10 transition-all duration-400"
    >
      {/* Card top — gradient visual */}
      <div className={`relative bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} p-6 min-h-36 flex items-end overflow-hidden`}>
        {/* Wave SVG */}
        <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 400 60" preserveAspectRatio="none">
          <path d="M0,30 C80,10 160,50 240,25 C320,0 370,40 400,20 L400,60 L0,60 Z" fill="white" />
        </svg>
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-white/5" />

        {/* Emoji */}
        <div className="absolute top-5 right-6 text-5xl opacity-50 group-hover:opacity-80 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 animate-float" style={{ animationDelay: `${index * 0.4}s` }}>
          {item.emoji}
        </div>

        {/* Badge */}
        {item.badge && (
          <span className={`absolute top-4 left-5 text-[11px] font-body font-800 px-3 py-1 rounded-full uppercase tracking-wider ${item.badgeClass}`}>
            {item.badge}
          </span>
        )}

        <div className="relative z-10 mt-6">
          <h3 className="font-display text-xl text-white leading-tight drop-shadow">{item.name}</h3>
          <p className="font-body text-white/60 text-xs mt-1">{item.description}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-4 p-5 flex-1">

        {/* Size selector */}
        <div>
          <p className="font-body text-[11px] font-700 text-ocean-light/40 uppercase tracking-widest mb-2">Ukuran</p>
          <div className="flex gap-2">
            {item.sizes.map((s) => {
              const active = selectedSize.label === s.label;
              return (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-body font-700 border transition-all duration-200 ${
                    active
                      ? 'border-ocean-mid bg-ocean-mid/15 text-ocean-light'
                      : 'border-white/10 bg-transparent text-white/40 hover:border-ocean-light/30 hover:text-white/60'
                  }`}
                >
                  <div>{s.label}</div>
                  <div className={`text-[11px] mt-0.5 font-600 ${active ? 'text-lemon' : 'text-white/25'}`}>
                    {formatRupiah(s.price)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topping selector */}
        <div>
          <p className="font-body text-[11px] font-700 text-ocean-light/40 uppercase tracking-widest mb-2">
            Topping <span className="text-lemon/60">+{formatRupiah(toppingPrice)}/pcs</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {toppings.map((t) => {
              const active = selectedToppings.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTopping(t)}
                  className={`px-3 py-1 rounded-full text-[11px] font-body font-700 border transition-all duration-200 ${
                    active
                      ? 'border-lemon/60 bg-lemon/10 text-lemon'
                      : 'border-white/10 bg-transparent text-white/35 hover:border-white/25 hover:text-white/55'
                  }`}
                >
                  {active && <span className="mr-1">✓</span>}{t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer — total + CTA */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div>
            <p className="font-body text-[11px] text-white/25 mb-0.5">Total</p>
            <p className="font-display text-xl text-lemon leading-none">{formatRupiah(total)}</p>
          </div>
          <button
            onClick={handleOrder}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-800 text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
              ordered
                ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                : 'bg-ocean-mid text-white shadow-lg shadow-ocean-mid/30 hover:bg-ocean-deep'
            }`}
          >
            {ordered ? '✓ Dipesan!' : '💬 Pesan WA'}
          </button>
        </div>
      </div>
    </div>
  );
}

const filterTags = ['Semua', 'Best Seller', 'Trending', 'New'];

export default function Menu() {
  const [filterTag, setFilterTag] = useState('Semua');

  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);
  const infoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — staggered like Hero.jsx
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, 0.1
      )
      .fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, 0.25
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, 0.45
      );

      // Filter pills
      gsap.fromTo(filtersRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.08,
          scrollTrigger: { trigger: filtersRef.current, start: 'top 85%' },
        }
      );

      // Cards
      gsap.fromTo(gridRef.current?.children || [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );

      // Info strip
      gsap.fromTo(infoRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: infoRef.current, start: 'top 85%' },
        }
      );

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const filtered = filterTag === 'Semua'
    ? menuData
    : menuData.filter((m) => m.badge === filterTag);

  return (
    <div className="min-h-screen bg-[#020c18] font-body text-white overflow-x-hidden">

      {/* ── HERO HEADER ── */}
      <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-ocean-deep/60 to-[#020c18] pb-10">
        {/* Background blobs */}
        <div className="blob absolute -top-20 -right-20 w-80 h-80 bg-ocean-mid/10 pointer-events-none" />
        <div className="blob absolute top-10 left-[-5%] w-56 h-56 bg-ocean-light/5 pointer-events-none" />

        {/* Animated wave divider at bottom */}
        <svg className="absolute bottom-0 left-0 w-full opacity-15 pointer-events-none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="#1e88e5" />
        </svg>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none animate-float"
            style={{
              width: `${6 + i * 4}px`,
              height: `${6 + i * 4}px`,
              background: i % 2 === 0 ? '#f9c642' : 'rgba(144,202,249,0.3)',
              top: `${20 + i * 12}%`,
              left: `${8 + i * 18}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {/* Inner nav row */}
        <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-ocean-light/70 hover:text-ocean-light text-sm font-body font-700 transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block">←</span>
            Kembali ke Home
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-mid to-ocean-deep flex items-center justify-center text-sm shadow-md">
              🫐
            </div>
            <span className="font-display text-lg text-white">Ocean Blue</span>
          </div>

          <a
            href="#order"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-ocean-mid/20 border border-ocean-mid/40 text-ocean-light font-body font-700 text-sm hover:bg-ocean-mid/30 transition-all duration-200"
          >
            🛒 Order Sekarang
          </a>
        </div>

        {/* Hero copy */}
        <div className="text-center px-6 pt-10 pb-4 max-w-2xl mx-auto">
          <div ref={badgeRef}>
            <span className="hero-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ocean-light/10 border border-ocean-light/20 text-sm font-body font-700 text-ocean-light mb-5">
              ✨ Fresh · Trendy · Instagrammable
            </span>
          </div>
          <h1
            ref={titleRef}
            className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] text-white drop-shadow-xl mt-2 mb-4"
          >
            Menu <span className="text-lemon drop-shadow-[0_0_20px_rgba(249,198,66,0.4)]">Ocean Blue</span>
          </h1>
          <p
            ref={subtitleRef}
            className="font-body text-ocean-light/60 text-base leading-relaxed"
          >
            Pilih minuman favoritmu, sesuaikan ukuran & topping,<br className="hidden sm:block" /> langsung order via WhatsApp 💙
          </p>
        </div>
      </div>

      {/* ── FILTER PILLS ── */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div ref={filtersRef} className="flex flex-wrap gap-2 justify-center">
          {filterTags.map((tag) => {
            const active = filterTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-5 py-2 rounded-full font-body font-700 text-sm border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  active
                    ? 'bg-ocean-mid/20 border-ocean-mid text-ocean-light shadow-md shadow-ocean-mid/20'
                    : 'bg-transparent border-white/10 text-white/40 hover:border-ocean-light/30 hover:text-white/60'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MENU GRID ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {filtered.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 font-body">
            <div className="text-5xl mb-4">🌊</div>
            <p>Tidak ada menu dengan filter ini.</p>
          </div>
        )}
      </div>

      {/* ── INFO STRIP ── */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <div ref={infoRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🧋', title: 'Pilihan Topping', desc: 'Setiap topping +Rp 2.000' },
            { icon: '🚀', title: 'Order via WA / GrabFood / GoFood', desc: 'Klik tombol untuk langsung order' },
            { icon: '🕐', title: 'Jam Buka', desc: 'Setiap hari 10.00 – 21.00 WIB' },
          ].map((info) => (
            <div
              key={info.title}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-ocean-light/15 transition-all duration-300"
            >
              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-ocean-mid/10 flex items-center justify-center text-xl">
                {info.icon}
              </div>
              <div>
                <p className="font-body font-800 text-white text-sm leading-tight">{info.title}</p>
                <p className="font-body text-white/35 text-xs mt-0.5">{info.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BOTTOM ── */}
      <div ref={ctaRef} className="border-t border-white/[0.05] py-16 text-center px-6">
        {/* Wave above CTA */}
        <div className="relative mb-10 overflow-hidden pointer-events-none opacity-10 h-8">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,25 C360,50 720,0 1080,25 C1260,38 1380,12 1440,25 L1440,50 L0,50 Z" fill="#1e88e5" />
          </svg>
        </div>

        <p className="font-body text-white/30 text-sm mb-6">Mau order langsung atau explore dulu?</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-ocean-mid text-white font-body font-800 text-sm rounded-2xl shadow-xl shadow-ocean-mid/30 hover:bg-ocean-deep hover:scale-105 active:scale-95 transition-all duration-300"
          >
            💬 Pesan via WhatsApp
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-lemon/10 border border-lemon/30 text-lemon font-body font-800 text-sm rounded-2xl hover:bg-lemon/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            🏠 Kembali ke Home
          </Link>
        </div>

        {/* Footer mini */}
        <p className="font-body text-white/15 text-xs mt-14">
          © 2025 Ocean Blue · Stay Cool. Stay Blue. 🌊
        </p>
      </div>

    </div>
  );
}