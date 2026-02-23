import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: pinned cinematic scroll ───────────────────────
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

        scrollTl.fromTo(radarRef.current, { scale: 0.65, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(headlineRef.current, { y: '-30vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(subheadRef.current, { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);
        scrollTl.fromTo(buttonsRef.current, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);
        scrollTl.fromTo(formRef.current, { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.15);

        scrollTl.fromTo(radarRef.current, { scale: 1, opacity: 1 }, { scale: 1.12, opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(headlineRef.current, { y: 0, opacity: 1 }, { y: '-15vh', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(subheadRef.current, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.72);
        scrollTl.fromTo(buttonsRef.current, { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.75);
        scrollTl.fromTo(formRef.current, { opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.75);
      }, sectionRef);

      return () => ctx.revert();
    });

    // ── MOBILE: simple fade-in, no pin ─────────────────────────
    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        const opts = { start: 'top 85%' };
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: headlineRef.current, ...opts } });
        gsap.fromTo(subheadRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: subheadRef.current, ...opts } });
        gsap.fromTo(buttonsRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: buttonsRef.current, ...opts } });
        gsap.fromTo(formRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, ...opts } });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-navy-light overflow-hidden z-50"
    >
      {/* Grid dots background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(242,245,250,0.8) 1px, transparent 1px)`,
          backgroundSize: '35px 35px',
        }}
      />

      {/* Large Radar */}
      <div
        ref={radarRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 'min(72vw, 72vh)', height: 'min(72vw, 72vh)' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="contactRadarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(46, 233, 168, 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="contactSweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(46, 233, 168, 0)" />
              <stop offset="100%" stopColor="rgba(46, 233, 168, 0.6)" />
            </linearGradient>
          </defs>

          {/* Background glow */}
          <circle cx="200" cy="200" r="190" fill="url(#contactRadarGlow)" />

          {/* Concentric rings */}
          {[180, 140, 100, 60, 20].map((r, i) => (
            <circle
              key={i}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="rgba(242, 245, 250, 0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Crosshair lines */}
          <line x1="200" y1="10" x2="200" y2="390" stroke="rgba(242, 245, 250, 0.08)" strokeWidth="1" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="rgba(242, 245, 250, 0.08)" strokeWidth="1" />

          {/* Rotating sweep */}
          <g className="animate-radar-sweep" style={{ transformOrigin: '200px 200px' }}>
            <path
              d="M 200 200 L 200 40 A 160 160 0 0 1 360 200 Z"
              fill="url(#contactSweepGradient)"
              opacity="0.5"
            />
          </g>

          {/* Center dot */}
          <circle cx="200" cy="200" r="8" fill="#2EE9A8" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(32px,6vw,72px)] font-bold text-slate-text leading-tight tracking-[-0.02em] text-center"
        >
          Ready When <span className="text-gradient">You Are</span>
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="mt-4 text-center text-slate-muted max-w-lg"
        >
          Open to SDV/ADAS roles, automation consulting, and collaborative builds.
          Let's build something extraordinary together.
        </p>

        {/* Contact Buttons */}
        <div ref={buttonsRef} className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:adarshasajjan@gmail.com"
            className="group flex items-center gap-2 px-6 py-3 bg-mint text-navy font-medium rounded-full hover:bg-mint-dark transition-all duration-150 hover:shadow-glow"
          >
            <Mail className="w-4 h-4" />
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/adarsha-h-v-67b3ba239/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/AdarshaGowri"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-md glass p-6 rounded-2xl"
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-slate-text/5 border border-slate-text/10 rounded-xl text-slate-text placeholder:text-slate-muted/50 focus:outline-none focus:border-mint/50 focus:ring-1 focus:ring-mint/30 transition-all duration-150"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-slate-text/5 border border-slate-text/10 rounded-xl text-slate-text placeholder:text-slate-muted/50 focus:outline-none focus:border-mint/50 focus:ring-1 focus:ring-mint/30 transition-all duration-150"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-3 bg-slate-text/5 border border-slate-text/10 rounded-xl text-slate-text placeholder:text-slate-muted/50 focus:outline-none focus:border-mint/50 focus:ring-1 focus:ring-mint/30 transition-all duration-150 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-150 ${submitted
                ? 'bg-mint/20 text-mint'
                : 'bg-mint text-navy hover:bg-mint-dark hover:shadow-glow-sm'
                }`}
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
              ) : submitted ? (
                <>Message Sent!</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>

        {/* Location */}
        <div className="mt-6 flex items-center gap-2 text-slate-muted/60 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Based in India • Open to Remote & Relocation</span>
        </div>
      </div>
    </section>
  );
}
