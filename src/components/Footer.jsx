import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Video, MessageCircle, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        },
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    {
      icon: (
        <img src="/assets/instagram.svg" alt="Instagram" className="w-5 h-5" />
      ),
      label: "Instagram",
      href: "#",
    },
    { icon: <Video className="w-5 h-5" />, label: "TikTok", href: "#" },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      href: "#",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-ocean-deep via-[#1565c0] to-ocean-mid text-white py-16 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-12"
        >
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="blob absolute top-10 right-[-10%] w-64 h-64 bg-ocean-light/10 pointer-events-none" />
      <div className="blob absolute bottom-5 left-[-5%] w-48 h-48 bg-white/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <img src="/assets/grape.svg" alt="Grape" className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl">Ocean Blue</span>
            </div>
            <p className="font-body text-white/70 text-sm leading-relaxed mb-5">
              Minuman biru segar yang bikin harimu makin colorful dan feed IG
              makin aesthetic ✨
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5">Navigasi</h4>
            <ul className="space-y-3">
              {["Home", "Menu", "Gallery", "Tentang", "Order"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-body text-white/70 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ocean-light group-hover:bg-lemon transition-colors duration-200 flex-shrink-0" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ocean-light mt-0.5 flex-shrink-0" />
                <p className="font-body text-white/70 text-sm">
                  Jl. Sukamaju No. 123
                  <br />
                  Jakarta Barat, 12345
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-ocean-light flex-shrink-0" />
                <a
                  href="https://wa.me/6281234567890"
                  className="font-body text-white/70 hover:text-white text-sm transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <img
                  src="/assets/instagram.svg"
                  alt="Instagram"
                  className="w-5 h-5 text-ocean-light flex-shrink-0"
                />
                <a
                  href="#"
                  className="font-body text-white/70 hover:text-white text-sm transition-colors"
                >
                  @oceanblue.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/50 text-sm">
            © 2026 Ocean Blue. Poster = Laurencia, Website = Wilson Bryan. All
            rights reserved.
          </p>
          <p className="font-body text-white/40 text-xs">
            Stay Cool. Stay Blue. 🌊
          </p>
        </div>
      </div>
    </footer>
  );
}
