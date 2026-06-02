import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ShoppingCart,
  ListOrdered,
  Star,
  ChevronDown,
  Droplets,
} from "lucide-react";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgesRef = useRef(null);
  const ctaRef = useRef(null);
  const drinkRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([bg1Ref.current, bg2Ref.current, bg3Ref.current], {
        opacity: 0,
        scale: 0.5,
      });

      tl.to(
        [bg1Ref.current, bg2Ref.current, bg3Ref.current],
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
        },
        0,
      )
        .fromTo(
          titleRef.current,
          { y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2 },
          0.3,
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.6,
        )
        .fromTo(
          badgesRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          0.8,
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15 },
          0.9,
        )
        .fromTo(
          drinkRef.current,
          { x: 80, opacity: 0, rotate: 10 },
          { x: 0, opacity: 1, rotate: 0, duration: 1.3, ease: "back.out(1.2)" },
          0.4,
        );

      const hero = heroRef.current;
      const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 20;

        gsap.to(drinkRef.current, {
          x: x * 0.6,
          y: y * 0.6,
          duration: 1.5,
          ease: "power2.out",
        });
        gsap.to(bg1Ref.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 2,
          ease: "power2.out",
        });
        gsap.to(bg2Ref.current, {
          x: -x * 0.2,
          y: -y * 0.2,
          duration: 2,
          ease: "power2.out",
        });
      };

      hero.addEventListener("mousemove", handleMouse);
      return () => hero.removeEventListener("mousemove", handleMouse);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-ocean-deep via-[#1565c0] to-ocean-mid"
    >
      <div
        ref={bg1Ref}
        className="blob absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-ocean-mid/30 pointer-events-none"
      />
      <div
        ref={bg2Ref}
        className="blob absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-[#0d47a1]/50 pointer-events-none"
      />
      <div
        ref={bg3Ref}
        className="blob absolute top-[20%] left-[30%] w-[300px] h-[300px] bg-ocean-light/10 pointer-events-none"
      />

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full h-32 opacity-20"
        >
          <path
            d="M0,80 C360,160 720,0 1080,80 C1260,120 1380,60 1440,80 L1440,160 L0,160 Z"
            fill="white"
          />
        </svg>
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full h-20 -mt-10"
        >
          <path
            d="M0,100 C240,40 480,140 720,80 C960,20 1200,120 1440,60 L1440,160 L0,160 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none animate-float"
          style={{
            width: `${8 + (i % 4) * 6}px`,
            height: `${8 + (i % 4) * 6}px`,
            background: i % 2 === 0 ? "#f9c642" : "rgba(144,202,249,0.4)",
            top: `${15 + i * 10}%`,
            left: `${5 + i * 11}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + i * 0.8}s`,
          }}
        />
      ))}

      <span
        className="absolute top-20 right-32 opacity-40 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <img
          src="/assets/lemon.svg"
          alt="Lemon decoration"
          className="w-16 h-16"
        />
      </span>
      <span className="absolute bottom-40 left-24 opacity-30 animate-float-slow">
        <Star className="w-6 h-6 text-lemon" />
      </span>
      <span
        className="absolute top-1/3 right-1/4 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Droplets className="w-5 h-5 text-ocean-light" />
      </span>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="text-white z-10">
          <div ref={badgesRef} className="flex flex-wrap gap-3 mb-6">
            <span className="hero-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-sm font-body font-700 text-ocean-light">
              <img src="/assets/grape.svg" alt="Grape" className="w-4 h-4" />{" "}
              Fresh & Instagrammable
            </span>
            <span className="hero-badge inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lemon/20 border border-lemon/30 text-sm font-body font-700 text-lemon">
              <Star className="w-4 h-4" /> Gen Z Favorite
            </span>
          </div>

          <div ref={titleRef} className="overflow-hidden mb-4">
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-white drop-shadow-xl">
              Stay Cool
              <br />
              <span className="text-lemon drop-shadow-[0_0_30px_rgba(249,198,66,0.5)]">
                Stay Blue
              </span>
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="font-body text-[clamp(1rem,2.5vw,1.25rem)] text-ocean-light/90 max-w-md leading-relaxed mb-8"
          >
            Rasakan sensasi segarnya lautan dalam satu tegukan — minuman biru
            yang bikin feed-mu makin aesthetic ✨
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a
              href="#order"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-lemon text-ocean-deep font-body font-800 text-base rounded-2xl shadow-xl shadow-lemon/30 hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" /> Pesan Sekarang
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 text-white border border-white/25 font-body font-700 text-base rounded-2xl backdrop-blur-sm hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ListOrdered className="w-5 h-5" /> Lihat Menu
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {["🧑", "👩", "🧒", "👦"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-mid to-ocean-deep border-2 border-white flex items-center justify-center text-lg shadow-md"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-lemon fill-lemon" />
                ))}
              </div>
              <p className="text-ocean-light text-sm font-body font-600">
                1.2K+ pelanggan happy
              </p>
            </div>
          </div>
        </div>

        {/* Right: Drink Illustration */}
        <div className="relative flex justify-center items-center z-10">
          <div ref={drinkRef} className="relative">
            <div className="absolute inset-0 rounded-full bg-ocean-light/20 blur-3xl scale-110 animate-pulse-soft" />

            <div className="relative w-100 h-190 md:w-96 md:h-[40rem] mx-auto">
              <img
                src="/assets/produk.png"
                alt="Produk"
                className="w-full h-full object-contain drop-shadow-2xl"
              />

              <div
                className="absolute -top-1 -right-4 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <img
                  src="/assets/grape.svg"
                  alt="Grape"
                  className="w-14 h-14"
                />
              </div>
              <div className="absolute top-1/4 -left-6 animate-float-slow">
                <img
                  src="/assets/lemon.svg"
                  alt="Lemon icon"
                  className="w-14 h-14"
                />
              </div>
            </div>

            <div className="absolute -mt-20 bottom-20 left-1/2 -translate-x-1/2 bg-lemon text-ocean-deep font-display text-xl px-6 py-3 rounded-full shadow-xl shadow-lemon/40 whitespace-nowrap animate-pulse-soft">
              Mulai Rp 12.000
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <p className="text-xs font-body font-600 tracking-widest uppercase">
          Scroll
        </p>
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
