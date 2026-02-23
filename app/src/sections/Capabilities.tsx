import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RADAR_LABELS = [
  'TEST AUTOMATION',
  'ADAS VALIDATION',
  'CI/CD',
  'PYTHON',
  'HIL',
  'REQUIREMENTS',
];

const RadarSVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <defs>
      <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(46, 233, 168, 0.1)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(46, 233, 168, 0)" />
        <stop offset="100%" stopColor="rgba(46, 233, 168, 0.8)" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="200" r="180" fill="url(#radarGlow)" />
    {[150, 110, 70, 30].map((r, i) => (
      <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="rgba(242,245,250,0.1)" strokeWidth="1" />
    ))}
    <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(242,245,250,0.1)" strokeWidth="1" />
    <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(242,245,250,0.1)" strokeWidth="1" />
    {/* Rotating sweep — stopped on mobile via CSS */}
    <g className="animate-radar-sweep" style={{ transformOrigin: '200px 200px' }}>
      <path d="M 200 200 L 200 50 A 150 150 0 0 1 350 200 Z" fill="url(#sweepGradient)" opacity="0.6" />
    </g>
    <circle cx="280" cy="120" r="4" fill="#2EE9A8" className="animate-radar-pulse" />
    <circle cx="140" cy="260" r="4" fill="#2EE9A8" className="animate-radar-pulse" style={{ animationDelay: '0.5s' }} />
    <circle cx="320" cy="240" r="4" fill="#2EE9A8" className="animate-radar-pulse" style={{ animationDelay: '1s' }} />
    <circle cx="100" cy="140" r="4" fill="#2EE9A8" className="animate-radar-pulse" style={{ animationDelay: '1.5s' }} />
    <circle cx="200" cy="200" r="6" fill="#2EE9A8" />
  </svg>
);

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: full cinematic pin + scrub ────────────────────
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        scrollTl.fromTo(radarRef.current, { scale: 0.72, opacity: 0, rotate: -10 }, { scale: 1, opacity: 1, rotate: 0, ease: 'none' }, 0);
        scrollTl.fromTo(headlineRef.current, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05);
        scrollTl.fromTo(bodyRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
        scrollTl.fromTo(ctaRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.15);
        scrollTl.fromTo(labelsRef.current, { opacity: 0, rotate: -25 }, { opacity: 1, rotate: 0, ease: 'none' }, 0);

        // Exit
        scrollTl.fromTo(radarRef.current, { scale: 1, opacity: 1 }, { scale: 1.1, opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(bodyRef.current, { y: 0, opacity: 1 }, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(ctaRef.current, { opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75);
        scrollTl.fromTo(labelsRef.current, { opacity: 1, rotate: 0 }, { opacity: 0, rotate: 15, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    });

    // ── MOBILE: simple scroll-triggered fade-ins ───────────────
    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' } });
        gsap.fromTo(bodyRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' } });
        gsap.fromTo(radarRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: radarRef.current, start: 'top 85%' } });
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' } });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full bg-navy overflow-hidden z-20"
    >
      {/* Grid dots background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: `radial-gradient(circle, rgba(242,245,250,0.8) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />

      {/* ── Mobile layout ─────────────────────────────────────── */}
      <div className="md:hidden relative z-10 flex flex-col items-center px-5 py-20 gap-8 min-h-screen justify-center">
        <div className="w-full text-center">
          <span className="font-mono text-xs text-mint tracking-[0.15em] uppercase">Expertise</span>
          <h2
            ref={headlineRef}
            className="mt-3 font-display text-[clamp(40px,12vw,64px)] font-bold text-slate-text leading-[0.95] tracking-[-0.03em] uppercase"
          >
            Capa<span className="text-gradient">bilities</span>
          </h2>
          <p ref={bodyRef} className="mt-4 text-base text-slate-muted leading-relaxed max-w-sm mx-auto">
            I build validation frameworks, automate ADAS testing, and drive CI/CD
            pipelines for safety-critical automotive software. Specialized in Python
            automation, pytest architecture, and Linux-based validation aligned with
            Open Scenario and Open Drive standards.
          </p>
        </div>

        {/* Mobile Radar */}
        <div ref={radarRef} className="relative w-[75vw] max-w-[300px] aspect-square">
          <RadarSVG />
          <div ref={labelsRef} className="absolute inset-0">
            {RADAR_LABELS.map((label, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const radius = 48;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <span
                  key={label}
                  className="absolute font-mono text-[9px] text-slate-muted/70 tracking-[0.1em] uppercase whitespace-nowrap"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <button
          ref={ctaRef}
          className="group flex items-center gap-3 px-6 py-3 border border-mint/40 text-mint rounded-full hover:bg-mint/10 transition-all duration-150"
        >
          <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
          <span className="font-mono text-sm tracking-wider uppercase">Explore the Radar</span>
        </button>
      </div>

      {/* ── Desktop layout (h-screen, absolute positioned) ────── */}
      <div className="hidden md:block relative z-10 w-full h-screen">
        {/* Text Content */}
        <div className="absolute left-[8vw] top-[14vh] w-[34vw]">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(40px,5vw,72px)] font-bold text-slate-text leading-[0.95] tracking-[-0.03em] uppercase"
          >
            Capa<span className="text-gradient">bilities</span>
          </h2>
        </div>

        <div className="absolute left-[8vw] top-[38vh] w-[30vw]">
          <p ref={bodyRef} className="text-lg text-slate-muted leading-relaxed">
            I build validation frameworks, automate ADAS testing, and drive CI/CD
            pipelines for safety-critical automotive software. Specialized in Python
            automation, pytest architecture, and Linux-based validation aligned with
            Open Scenario and Open Drive standards.
          </p>
        </div>

        <div className="absolute left-[8vw] top-[56vh]">
          <button
            ref={ctaRef}
            className="group flex items-center gap-3 px-6 py-3 border border-mint/40 text-mint rounded-full hover:bg-mint/10 transition-all duration-150"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
            <span className="font-mono text-sm tracking-wider uppercase">Explore the Radar</span>
          </button>
        </div>

        {/* Radar Visualization */}
        <div
          ref={radarRef}
          className="absolute left-[55%] top-1/2 -translate-y-1/2"
          style={{ width: 'min(62vw, 62vh)', height: 'min(62vw, 62vh)' }}
        >
          <RadarSVG />
          <div ref={labelsRef} className="absolute inset-0">
            {RADAR_LABELS.map((label, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const radius = 48;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <span
                  key={label}
                  className="absolute font-mono text-[10px] md:text-xs text-slate-muted/70 tracking-[0.1em] uppercase whitespace-nowrap"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
