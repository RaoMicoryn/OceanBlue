import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sparkles, Camera, Star, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { x: -80, opacity: 0, rotate: -5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
      gsap.fromTo(
        textRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
      gsap.fromTo(
        badgesRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const badges = [
    {
      icon: <Sparkles className="w-6 h-6 text-ocean-mid" />,
      label: "Fresh",
      desc: "Dibuat fresh tiap hari",
    },
    {
      icon: <Zap className="w-6 h-6 text-ocean-mid" />,
      label: "Trendy",
      desc: "Aesthetic buat konten",
    },
    {
      icon: <Camera className="w-6 h-6 text-ocean-mid" />,
      label: "Instagrammable",
      desc: "Feed yang bikin iri",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <div ref={imgRef} className="relative">
          <div className="blob absolute inset-0 scale-110 bg-ocean-pale opacity-60" />

          <div className="relative z-10 rounded-3xl overflow-hidden bg-gradient-to-br from-ocean-pale to-ocean-light/30 p-8 shadow-2xl shadow-ocean-mid/15">
            <div className="flex justify-center items-center py-6">
              <div className="relative">
                <div className="w-40 h-52 bg-gradient-to-b from-ocean-light/40 to-ocean-mid/60 rounded-b-3xl rounded-t-xl border-4 border-ocean-light/50 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-ocean-mid/80 to-ocean-deep" />
                  <svg
                    className="absolute top-3 w-full"
                    viewBox="0 0 160 30"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,15 C40,5 80,25 120,12 C140,6 155,18 160,12 L160,30 L0,30 Z"
                      fill="rgba(144,202,249,0.5)"
                    />
                  </svg>
                  <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full bg-white/30 animate-float" />
                  <div
                    className="absolute bottom-12 right-8 w-2 h-2 rounded-full bg-white/20 animate-float"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute bottom-20 left-10 w-4 h-4 rounded-full bg-white/10 animate-float"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
                <div className="absolute -top-8 right-10 w-3 h-20 bg-lemon rounded-full shadow-md" />
                <div
                  className="absolute -top-6 -right-4 animate-float"
                  style={{ animationDelay: "0.3s" }}
                >
                  <img
                    src="/assets/grape.svg"
                    alt="Grape"
                    className="w-7 h-7"
                  />
                </div>
                <div className="absolute top-0 -left-8 animate-float-slow">
                  <span className="text-xl">🍋</span>
                </div>
                <div className="absolute -bottom-4 -right-6">
                  <Sparkles className="w-6 h-6 text-ocean-light" />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="font-display text-3xl text-ocean-deep">
                Ocean Blue
              </h3>
              <p className="text-ocean-mid font-body font-600 text-sm mt-1">
                Minuman Biru Segar · Trendy · Instagrammable
              </p>
            </div>
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl shadow-ocean-mid/20 p-4 border border-ocean-light/30 z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-lemon/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-lemon fill-lemon" />
              </div>
              <div>
                <p className="font-display text-2xl text-ocean-deep">4.9</p>
                <p className="text-xs text-gray-500 font-body">
                  Rating pelanggan
                </p>
              </div>
            </div>
          </div>

          {/* Floating tag */}
          <div className="absolute -top-4 -left-4 bg-lemon rounded-xl shadow-lg px-4 py-2 font-body font-800 text-ocean-deep text-sm z-20 rotate-[-3deg]">
            <Zap className="w-4 h-4 inline mr-1" /> Best Seller!
          </div>
        </div>

        {/* Text side */}
        <div ref={textRef}>
          <span className="inline-block font-body font-700 text-sm text-ocean-mid bg-ocean-pale px-4 py-1.5 rounded-full mb-4">
            Tentang Kami
          </span>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] text-ocean-deep leading-tight mb-5">
            Minuman Biru
            <br />
            <span className="text-ocean-mid">yang Beda dari</span>
            <br />
            yang Lain 🌊
          </h2>
          <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
            Ocean Blue adalah produk minuman dengan sensasi rasa segar yang terinspirasi
            dari kesejukan laut memiliki warna biru yang menarik dan tampilan modern ocean blue
          </p>

          <div ref={badgesRef} className="grid grid-cols-1 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-4 p-4 rounded-2xl bg-ocean-pale/50 hover:bg-ocean-pale transition-colors duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>
                <div>
                  <p className="font-body font-800 text-ocean-deep text-base">
                    {badge.label}
                  </p>
                  <p className="font-body text-gray-500 text-sm">
                    {badge.desc}
                  </p>
                </div>
                <div className="ml-auto text-ocean-mid opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}