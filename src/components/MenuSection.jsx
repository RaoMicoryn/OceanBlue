import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Waves, CircleDot, CheckCircle, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const menus = [
  {
    name: "Ocean Blue Regular",
    price: "Rp 12.000",
    size: "Regular · 350ml",
    desc: "Blueberry segar + lemon squeeze + ice + pilihan topping",
    icon: <img src="/assets/grape.svg" alt="Grape" className="w-14 h-14" />,
    toppings: ["Boba", "Jelly Ocean", "Popping Boba"],
    color: "from-ocean-mid to-ocean-deep",
    badge: "Best Seller",
    badgeColor: "bg-lemon text-ocean-deep",
  },
  {
    name: "Ocean Blue Large",
    price: "Rp 15.000",
    size: "Large · 500ml",
    desc: "Versi besar untuk kamu yang mau puas banget, rasa dobel fresh!",
    icon: <Waves className="w-14 h-14 text-white/50" />,
    toppings: ["Coconut Jelly", "Boba", "Cheese Foam"],
    color: "from-[#1565c0] to-ocean-deep",
    badge: "Value Pick",
    badgeColor: "bg-teal-400 text-white",
  },
];

const toppingList = [
  {
    name: "Boba Hitam",
    icon: <CircleDot className="w-6 h-6 text-gray-700" />,
    price: "+Rp 2.000",
  },
  {
    name: "Ocean Jelly",
    icon: <CircleDot className="w-6 h-6 text-ocean-mid" />,
    price: "+Rp 2.000",
  },
  {
    name: "Popping Boba",
    icon: <CircleDot className="w-6 h-6 text-purple-500" />,
    price: "+Rp 3.000",
  },
  {
    name: "Cheese Foam",
    icon: <img src="/assets/cheese.svg" alt="Cheese" className="w-6 h-6" />,
    price: "+Rp 3.000",
  },
  {
    name: "Coconut Jelly",
    icon: <img src="/assets/grape.svg" alt="Grape" className="w-6 h-6" />,
    price: "+Rp 2.000",
  },
  {
    name: "Lychee Boba",
    icon: <CircleDot className="w-6 h-6 text-pink-400" />,
    price: "+Rp 3.000",
  },
];

export default function MenuSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const menuRef = useRef(null);
  const toppingRef = useRef(null);
  const [activeTopping, setActiveTopping] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        menuRef.current?.children || [],
        { y: 80, opacity: 0, rotateY: 10 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: menuRef.current, start: "top 75%" },
        },
      );
      gsap.fromTo(
        toppingRef.current?.children || [],
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: toppingRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-body font-700 text-sm text-ocean-mid bg-ocean-pale px-4 py-1.5 rounded-full mb-4">
            Menu & Harga
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] text-ocean-deep mb-4">
            Pilih Ukuranmu{" "}
            <img
              src="/assets/grape.svg"
              alt="Grape"
              className="inline w-8 h-8"
            />
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-md mx-auto">
            Semua menu bisa di-custom toppingnya sesuai selera kamu!
          </p>
        </div>

        <div
          ref={menuRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {menus.map((item) => (
            <div
              key={item.name}
              className="menu-card group rounded-3xl overflow-hidden shadow-lg border border-ocean-light/20"
            >
              <div
                className={`relative bg-gradient-to-br ${item.color} p-8 min-h-48 flex items-end overflow-hidden`}
              >
                <svg
                  className="absolute bottom-0 left-0 w-full opacity-20"
                  viewBox="0 0 400 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 C80,20 160,60 240,35 C320,10 370,50 400,30 L400,80 L0,80 Z"
                    fill="white"
                  />
                </svg>
                <div className="absolute top-6 right-8 opacity-40 animate-float menu-img transition-all duration-500">
                  {item.icon}
                </div>
                <span
                  className={`absolute top-5 left-6 px-3 py-1 rounded-full text-xs font-body font-800 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <div className="relative z-10">
                  <h3 className="font-display text-2xl text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-white/70 font-body text-sm">{item.size}</p>
                </div>
              </div>

              <div className="p-6 bg-white">
                <p className="font-body text-gray-600 mb-4 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.toppings.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-ocean-pale text-ocean-deep font-body font-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-3xl text-ocean-deep">
                      {item.price}
                    </span>
                    <span className="text-gray-400 text-sm font-body ml-1">
                      / cup
                    </span>
                  </div>
                  <a
                    href="#order"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-ocean-mid text-white font-body font-800 rounded-xl text-sm hover:bg-ocean-deep hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-ocean-mid/30"
                  >
                    Pesan <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-ocean-pale/50 rounded-3xl p-8 border border-ocean-light/30">
          <h3 className="font-display text-2xl text-ocean-deep text-center mb-2">
            Pilihan Topping
          </h3>
          <p className="text-center text-gray-500 font-body text-sm mb-8">
            Klik untuk lihat detail harga
          </p>

          <div
            ref={toppingRef}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {toppingList.map((topping) => (
              <button
                key={topping.name}
                onClick={() =>
                  setActiveTopping(
                    activeTopping === topping.name ? null : topping.name,
                  )
                }
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left group ${
                  activeTopping === topping.name
                    ? "border-ocean-mid bg-ocean-mid text-white shadow-lg shadow-ocean-mid/20"
                    : "border-ocean-light/40 bg-white hover:border-ocean-mid hover:shadow-md"
                }`}
              >
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                  {activeTopping === topping.name ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    topping.icon
                  )}
                </div>
                <p
                  className={`font-body font-700 text-sm ${activeTopping === topping.name ? "text-white" : "text-ocean-deep"}`}
                >
                  {topping.name}
                </p>
                <p
                  className={`font-body font-600 text-xs mt-1 ${activeTopping === topping.name ? "text-white/80" : "text-ocean-mid"}`}
                >
                  {topping.price}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
