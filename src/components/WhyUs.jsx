import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Palette, Citrus, Layers, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Palette className="w-7 h-7 text-purple-500" />,
    title: 'Aesthetic & Menarik',
    desc: 'Visual yang cantik banget, perfect buat foto dan konten IG/TikTok kamu.',
    color: 'from-purple-400/20 to-pink-400/20',
    border: 'border-purple-200',
  },
  {
    icon: <Citrus className="w-7 h-7 text-yellow-500" />,
    title: 'Rasa Fresh Blueberry & Lemon',
    desc: 'Kombinasi blueberry manis dan lemon segar yang bikin nagih setiap harinya.',
    color: 'from-lemon/20 to-orange-200/20',
    border: 'border-yellow-200',
  },
  {
    icon: <Layers className="w-7 h-7 text-ocean-mid" />,
    title: 'Topping Seru & Lucu',
    desc: 'Pilihan topping unik: boba, jelly ocean, coconut jelly, dan masih banyak lagi!',
    color: 'from-ocean-light/20 to-ocean-mid/10',
    border: 'border-ocean-light',
  },
  {
    icon: <Camera className="w-7 h-7 text-teal-500" />,
    title: 'Cocok Buat Konten Gen Z',
    desc: 'Desain cup yang Instagrammable bikin setiap postinganmu dapet lebih banyak likes.',
    color: 'from-teal-200/20 to-cyan-200/20',
    border: 'border-teal-200',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(cardsRef.current?.children || [],
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white via-ocean-pale/30 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-body font-700 text-sm text-ocean-mid bg-ocean-pale px-4 py-1.5 rounded-full mb-4">
            Kenapa Ocean Blue?
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] text-ocean-deep mb-4">
            Yang Bikin Kami <span className="text-ocean-mid"> Beda</span> 💙
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-lg mx-auto">
            4 alasan kenapa Ocean Blue jadi minuman favorit Gen Z di kota ini
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className={`group relative p-7 rounded-3xl bg-gradient-to-br ${feat.color} border ${feat.border} hover:shadow-xl hover:shadow-ocean-mid/10 transition-all duration-400 cursor-default overflow-hidden`}
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/30 group-hover:scale-125 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-md flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {feat.icon}
                </div>
                <h3 className="font-body font-800 text-ocean-deep text-xl mb-3">{feat.title}</h3>
                <p className="font-body text-gray-600 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}