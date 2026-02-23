import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Download, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TYPING_TEXTS = [
  'SDV Test Engineer',
  'ADAS Platform Validation Specialist',
  'CI-Driven Automation Architect'
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentText = TYPING_TEXTS[typingIndex];
    const typeSpeed = isDeleting ? 20 : 55;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  // Entrance animations — responsive via matchMedia
  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: slide-in + pinned scroll exit ─────────────────
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(portraitRef.current, { x: '-60vw', scale: 1.06, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.7 }, 0);
        tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.3);
        tl.fromTo(subheadRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.5);
        tl.fromTo(ctaRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.7);

        // Scroll-driven exit
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([portraitRef.current, textRef.current, ctaRef.current], {
                opacity: 1, x: 0, y: 0, scale: 1,
              });
            },
          },
        });

        scrollTl.fromTo(portraitRef.current, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: '-18vw', y: '10vh', scale: 0.96, opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(textRef.current, { x: 0, opacity: 1 }, { x: '12vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(ctaRef.current, { y: 0, opacity: 1 }, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.75);
      }, sectionRef);

      return () => ctx.revert();
    });

    // ── MOBILE: simple fade-in, no pin, no scrub ───────────────
    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(portraitRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' });
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.2, ease: 'power3.out' });
        gsap.fromTo(subheadRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.4, ease: 'power3.out' });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full md:h-screen bg-navy overflow-hidden z-10"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(7,10,18,0.6)_100%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(242,245,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,245,250,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Mobile layout ─────────────────────────────────────── */}
      <div className="md:hidden relative z-10 flex flex-col pt-20 pb-14 px-5 gap-6">
        {/* Portrait */}
        <div
          ref={portraitRef}
          className="relative w-full h-[52vw] max-h-[260px] rounded-2xl overflow-hidden shadow-card"
        >
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-mint/50 via-sky/30 to-mint/50 animate-glow-pulse" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img src="/profile.jpg" alt="Adarsha H V" className="w-full h-full object-cover object-top grayscale-[30%] contrast-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-3 left-4 glass px-3 py-1 rounded-full">
            <span className="font-mono text-xs text-mint tracking-wider uppercase">3+ Years Experience</span>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef}>
          <div className="mb-3">
            <span className="font-mono text-xs text-slate-muted tracking-[0.15em] uppercase">
              Automotive Software Validation
            </span>
            <div className="mt-1 w-[80px] h-[1px] bg-gradient-to-r from-mint/60 to-transparent" />
          </div>
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(36px,10vw,56px)] font-bold text-slate-text leading-[0.95] tracking-[-0.03em]"
          >
            Hi, I'm
            <br />
            <span className="text-gradient">Adarsha H V</span>
          </h1>
          <p ref={subheadRef} className="mt-4 text-lg text-slate-muted font-light">
            <span className="typing-cursor text-mint">{displayText}</span>
          </p>
          <p className="mt-2 text-xs text-slate-muted/80">
            ADAS &amp; SDV Validation | Python Automation | GitHub Actions CI
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-wrap gap-3">
          <button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 px-5 py-2.5 bg-mint text-navy font-medium rounded-full hover:bg-mint-dark transition-all duration-150"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150"
          >
            <Mail className="w-4 h-4" />
            Contact
          </button>
          <a
            href="./adarsha_resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 border border-mint/30 text-mint rounded-full hover:bg-mint/10 transition-all duration-150"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>
      </div>

      {/* ── Desktop layout ─────────────────────────────────────── */}
      <div className="hidden md:flex relative z-10 w-full h-full items-center px-[6vw]">
        {/* Left: Portrait Card */}
        <div
          ref={portraitRef}
          className="relative w-[44vw] h-[72vh] rounded-2xl overflow-hidden shadow-card"
        >
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-mint/50 via-sky/30 to-mint/50 animate-glow-pulse" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img src="/profile.jpg" alt="Adarsha H V" className="w-full h-full object-cover grayscale-[30%] contrast-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-full">
            <span className="font-mono text-xs text-mint tracking-wider uppercase">3+ Years Experience</span>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="ml-[6vw] flex-1 max-w-[38vw]">
          <div className="mb-6">
            <span className="font-mono text-xs text-slate-muted tracking-[0.15em] uppercase">
              Automotive Software Validation
            </span>
            <div className="mt-2 w-[120px] h-[1px] bg-gradient-to-r from-mint/60 to-transparent" />
          </div>

          <div ref={textRef}>
            <h1
              ref={headlineRef}
              className="font-display text-[clamp(48px,6vw,90px)] font-bold text-slate-text leading-[0.95] tracking-[-0.03em]"
            >
              Hi, I'm
              <br />
              <span className="text-gradient">Adarsha H V</span>
            </h1>
            <p ref={subheadRef} className="mt-6 text-xl md:text-2xl text-slate-muted font-light">
              <span className="typing-cursor text-mint">{displayText}</span>
            </p>
            <p className="mt-4 text-sm text-slate-muted/80">
              ADAS &amp; SDV Validation | Python Automation | GitHub Actions CI
            </p>
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={scrollToProjects}
              className="group flex items-center gap-2 px-6 py-3 bg-mint text-navy font-medium rounded-full hover:bg-mint-dark transition-all duration-150 hover:shadow-glow"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
            <a
              href="./adarsha_resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 border border-mint/30 text-mint rounded-full hover:bg-mint/10 transition-all duration-150"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
