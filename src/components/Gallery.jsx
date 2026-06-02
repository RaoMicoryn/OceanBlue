import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/assets/Blue1.jpg",
    label: "Classic Blue Mojito",
    tag: "Signature",
    size: "col-span-2 row-span-2",
  },
  {
    src: "/assets/Blue2.jpg",
    label: "Deep Blue Soda",
    tag: "Fizz Series",
    size: "col-span-1 row-span-1",
  },
  {
    src: "/assets/Blue3.jpg",
    label: "Blue Lemon Breeze",
    tag: "Citrus Series",
    size: "col-span-1 row-span-1",
  },
  {
    src: "/assets/Blue4.jpg",
    label: "Starlight Blue",
    tag: "Sparkling Series",
    size: "col-span-1 row-span-1",
  },
  {
    src: "/assets/Blue5.jpg",
    label: "Blue Sapphire Ice",
    tag: "Citrus Series",
    size: "col-span-1 row-span-1",
  },
  {
    src: "/assets/Blue6.jpg",
    label: "Wild Berry Blue",
    tag: "Berry Series",
    size: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        },
      );
      const cards = gridRef.current?.querySelectorAll(".gallery-card") || [];
      gsap.fromTo(
        cards,
        { scale: 0.8, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
        },
      );
      gsap.to(gridRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-ocean-pale/40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block font-body font-700 text-sm text-ocean-mid bg-ocean-pale px-4 py-1.5 rounded-full mb-4">
            Gallery Foto
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] text-ocean-deep mb-4">
            Aesthetic Banget{" "}
            <Camera className="inline w-8 h-8 text-ocean-mid" />
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-md mx-auto">
            Konten aesthetic dari pelanggan setia Ocean Blue. Tag us di
            Instagram!
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]"
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`gallery-card group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-ocean-mid/10 cursor-pointer ${photo.size}`}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-95 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-white text-sm font-700 tracking-wide">{photo.label}</p>
                  <p className="text-[11px] text-white/60 uppercase mt-1">{photo.tag}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white backdrop-blur-sm">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-body font-800 text-base rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <img
              src="/assets/instagram.svg"
              alt="Instagram"
              className="w-5 h-5"
            />
            Ikuti Kami di Instagram
            <span className="opacity-70">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
