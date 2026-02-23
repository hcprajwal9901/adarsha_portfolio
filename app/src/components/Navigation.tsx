import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#hero' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollY / docHeight) * 100;

      setProgress(scrollProgress);
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' }
    );
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-200 ${isScrolled
          ? 'bg-navy/80 backdrop-blur-xl border-b border-slate-text/10'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="font-display text-xl font-bold text-slate-text hover:text-mint transition-colors duration-150"
            >
              ADARSHA
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-slate-muted hover:text-slate-text transition-colors duration-150 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-mint transition-all duration-150 group-hover:w-full" />
                </a>
              ))}

              <a
                href="./adarsha_resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 border border-mint/40 text-mint text-sm rounded-full hover:bg-mint/10 transition-all duration-150"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-text hover:text-mint transition-colors duration-150"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-slate-text/10">
          <div
            className="h-full bg-gradient-to-r from-mint to-sky transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-navy/95 backdrop-blur-xl transition-all duration-250 md:hidden ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-display text-3xl font-semibold text-slate-text hover:text-mint transition-colors duration-150"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="/resume.pdf"
            download
            className="mt-4 flex items-center gap-2 px-6 py-3 border border-mint/40 text-mint rounded-full hover:bg-mint/10 transition-all duration-150"
            style={{
              transitionDelay: isMobileMenuOpen ? '300ms' : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
