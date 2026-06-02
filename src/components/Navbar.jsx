import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Tentang", href: "/" },
    { label: "Order", href: "/order" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-ocean-mid/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-mid to-ocean-deep flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <img
              src="/assets/grape.svg"
              alt="Grape"
              className="text-white w-5 h-5"
            />
          </div>
          <span
            className={`font-display text-xl transition-colors duration-300 ${scrolled ? "text-ocean-deep" : "text-white"}`}
          >
            Ocean Blue
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className={`font-body font-700 text-sm transition-all duration-300 hover:text-lemon relative group ${
                  scrolled ? "text-ocean-deep" : "text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lemon rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/order"
          className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-800 text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
            scrolled
              ? "bg-ocean-mid text-white shadow-md shadow-ocean-mid/30"
              : "bg-white/20 text-white border border-white/40 backdrop-blur-sm hover:bg-white hover:text-ocean-deep"
          }`}
        >
          <ShoppingCart className="w-4 h-4" /> Pesan Sekarang
        </Link>

        {/* Mobile / Tablet Menu Button */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-ocean-deep" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white/95 backdrop-blur-md mx-4 mt-2 rounded-2xl shadow-xl p-4 border border-ocean-light/20">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="flex items-center px-4 py-3 text-ocean-deep font-body font-700 hover:text-ocean-mid hover:bg-ocean-pale rounded-xl transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/order"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-ocean-mid text-white rounded-xl font-body font-800 text-sm"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart className="w-4 h-4" /> Pesan Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
