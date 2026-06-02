import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Semua", "Classic", "Lemon Series", "Topping", "Aesthetic"];

const photos = [
  {
    src: "/assets/Blue1.jpg",
    label: "Ocean Blue Classic",
    tag: "Signature",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/Blue2.jpg",
    label: "Ocean Lime Splash",
    tag: "Fizz Series",
    span: "",
  },
  {
    src: "/assets/Blue3.jpg",
    label: "Blue Lemon Breeze",
    tag: "Citrus Series",
    span: "",
  },
  { 
    src: "/assets/Blue4.jpg", 
    label: "Sparkling Starlight", 
    tag: "Galaxy Series", 
    span: "" 
  },
  { 
    src: "/assets/Blue5.jpg", 
    label: "Deep Blue Sapphire", 
    tag: "Signature", 
    span: "" 
  },
  { 
    src: "/assets/Blue6.jpg", 
    label: "Blueberry Lagoon", 
    tag: "Berry Series", 
    span: "" 
  },
  {
    src: "/assets/Blue7.jpg",
    label: "Blue Ice Granita",
    tag: "Citrus Series",
    span: "",
  },
  {
    src: "/assets/Blue8.jpg",
    label: "Midnight Aurora",
    tag: "Galaxy Series",
    span: "",
  },
  {
    src: "/assets/Blue9.jpg",
    label: "Twilight Sunset Mocktail",
    tag: "Galaxy Series",
    span: "",
  },
];

const stats = [
  { num: "1.2K+", label: "Pelanggan Happy" },
  { num: "4.9★", label: "Rating Rata-rata" },
  { num: "50K+", label: "Foto di Instagram" },
  { num: "100%", label: "Fresh Tiap Hari" },
];

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("Semua");
  const [lightbox, setLightbox] = useState(null);

  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const filtered =
    activeTag === "Semua" ? photos : photos.filter((p) => p.tag === activeTag);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.1,
      )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          0.25,
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.45,
        )
        .fromTo(
          statsRef.current?.children || [],
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          0.6,
        );

      gsap.fromTo(
        filterRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          scrollTrigger: { trigger: filterRef.current, start: "top 88%" },
        },
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  // Re-animate grid whenever filter changes
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".g-card") || [];
    gsap.fromTo(
      cards,
      { scale: 0.88, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "back.out(1.3)",
      },
    );
  }, [activeTag]);

  return (
    <div className="min-h-screen bg-[#020c18] font-body text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-[#0d2a4a] to-[#020c18] pb-16"
      >
        {/* Blobs */}
        <div className="blob absolute -top-16 right-[-8%] w-72 h-72 bg-ocean-mid/10 pointer-events-none" />
        <div className="blob absolute top-12 left-[-4%] w-52 h-52 bg-lemon/5 pointer-events-none" />

        {/* Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none animate-float"
            style={{
              width: `${5 + i * 3}px`,
              height: `${5 + i * 3}px`,
              background: i % 2 === 0 ? "#f9c642" : "rgba(144,202,249,0.3)",
              top: `${15 + i * 12}%`,
              left: `${6 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        {/* Wave bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
            fill="#1e88e5"
          />
        </svg>

        {/* Nav */}
        <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-ocean-light/70 hover:text-ocean-light text-sm font-700 transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block">
              ←
            </span>
            Kembali ke Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-mid to-ocean-deep flex items-center justify-center text-sm shadow-md">
              🫐
            </div>
            <span className="font-display text-lg">Ocean Blue</span>
          </div>
          <Link
            to="/menu"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-ocean-mid/20 border border-ocean-mid/40 text-ocean-light font-700 text-sm hover:bg-ocean-mid/30 transition-all duration-200"
          >
            🧋 Lihat Menu
          </Link>
        </div>

        {/* Copy */}
        <div className="text-center px-6 pt-10 pb-6 max-w-2xl mx-auto">
          <div ref={badgeRef}>
            <span className="hero-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/25 text-sm font-700 text-pink-300 mb-5">
              📸 Gallery Foto
            </span>
          </div>
          <h1
            ref={titleRef}
            className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] text-white drop-shadow-xl mt-2 mb-4"
          >
            Aesthetic{" "}
            <span className="text-lemon drop-shadow-[0_0_20px_rgba(249,198,66,0.4)]">
              Banget
            </span>{" "}
            ✨
          </h1>
          <p
            ref={subtitleRef}
            className="font-body text-ocean-light/55 text-base leading-relaxed"
          >
            Koleksi foto minuman Ocean Blue dari pelanggan setia kami.
            <br className="hidden sm:block" />
            Tag <span className="text-ocean-light font-700">
              @oceanblue.id
            </span>{" "}
            buat tampil di sini!
          </p>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="max-w-3xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-4 px-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-all duration-300"
            >
              <span className="font-display text-2xl text-lemon leading-none">
                {s.num}
              </span>
              <span className="font-body text-white/40 text-xs mt-1 text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTER ── */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div ref={filterRef} className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const active = activeTag === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTag(cat)}
                className={`px-5 py-2 rounded-full font-700 text-sm border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  active
                    ? "bg-ocean-mid/20 border-ocean-mid text-ocean-light shadow-md shadow-ocean-mid/20"
                    : "bg-transparent border-white/10 text-white/40 hover:border-ocean-light/30 hover:text-white/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]"
        >
          {filtered.map((photo, i) => (
            <div
              key={`${activeTag}-${i}`}
              onClick={() => setLightbox(photo)}
              className={`g-card group relative rounded-3xl overflow-hidden cursor-pointer ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-95 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-white text-sm font-700 tracking-wide">
                    {photo.label}
                  </p>
                  <p className="text-[11px] text-white/60 uppercase mt-1">
                    {photo.tag}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white backdrop-blur-sm">
                  <span className="text-sm">📷</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 font-body">
            <div className="text-5xl mb-4">📷</div>
            <p>Tidak ada foto di kategori ini.</p>
          </div>
        )}
      </div>

      {/* ── UGC CTA ── */}
      <div ref={ctaRef} className="max-w-4xl mx-auto px-6 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ocean-deep via-[#1565c0] to-ocean-mid p-10 text-center">
          {/* BG decorations */}
          <div className="blob absolute -top-10 -right-10 w-48 h-48 bg-white/5 pointer-events-none" />
          <div className="blob absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 pointer-events-none" />
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
            viewBox="0 0 600 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C120,60 240,5 360,30 C480,55 560,10 600,25 L600,60 L0,60 Z"
              fill="white"
            />
          </svg>

          <div className="relative z-10">
            <div className="text-4xl mb-4 animate-float">📸</div>
            <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white mb-3 leading-tight">
              Tampil di Gallery Kami!
            </h3>
            <p className="font-body text-ocean-light/70 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Order Ocean Blue, foto estetik, lalu tag{" "}
              <span className="text-white font-700">@oceanblue.id</span> di
              Instagram atau WhatsApp ke kami. Foto kamu bisa masuk gallery ini!
              🌊
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://instagram.com/oceanblue.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-800 text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                📱 Ikuti di Instagram
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 border border-white/25 text-white font-700 text-sm rounded-2xl backdrop-blur-sm hover:bg-white/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                🧋 Lihat Menu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer mini */}
      <div className="border-t border-white/[0.05] py-6 text-center">
        <p className="font-body text-white/15 text-xs">
          © 2025 Ocean Blue · Stay Cool. Stay Blue. 🌊
        </p>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className={`relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br ${lightbox.bg} flex items-center justify-center overflow-hidden shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none"
              viewBox="0 0 400 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C80,10 160,70 240,30 C320,0 370,55 400,30 L400,80 L0,80 Z"
                fill="white"
              />
            </svg>
            <div className="text-[8rem] animate-float">{lightbox.emoji}</div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-700 px-4 py-2 rounded-full border border-white/25">
                {lightbox.label}
              </span>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center text-lg hover:bg-black/50 transition-all duration-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
