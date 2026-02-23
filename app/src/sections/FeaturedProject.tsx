import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: cinematic pin + scrub ─────────────────────────
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.6,
          },
        });

        scrollTl.fromTo(outlineTextRef.current, { x: '-50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(imageRef.current, { y: '80vh', scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
        scrollTl.fromTo(titleRef.current, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.08);
        scrollTl.fromTo(descRef.current, { x: '20vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.12);

        scrollTl.fromTo(outlineTextRef.current, { x: 0, opacity: 1 }, { x: '20vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(imageRef.current, { y: 0, scale: 1, opacity: 1 }, { y: '-30vh', scale: 1.04, opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(titleRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        scrollTl.fromTo(descRef.current, { x: 0, opacity: 1 }, { x: '12vw', opacity: 0, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    });

    // ── MOBILE: simple scroll-triggered fade-ins ───────────────
    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(imageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: imageRef.current, start: 'top 85%' } });
        gsap.fromTo(titleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } });
        gsap.fromTo(descRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: descRef.current, start: 'top 85%' } });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative w-full bg-navy overflow-hidden z-30"
    >
      {/* ── Mobile layout ─────────────────────────────────────── */}
      <div className="md:hidden relative z-10 flex flex-col px-5 py-20 gap-8">
        {/* Section label */}
        <div>
          <span className="font-mono text-xs text-mint tracking-[0.15em] uppercase">Featured Work</span>
          <h3
            ref={titleRef}
            className="mt-3 font-display text-[clamp(28px,8vw,42px)] font-bold text-slate-text leading-tight tracking-[-0.02em]"
          >
            ADAS Validation
            <br />
            <span className="text-gradient">Framework</span>
          </h3>
        </div>

        {/* Code card */}
        <div
          ref={imageRef}
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ background: 'rgba(11,15,28,0.9)', border: '1px solid rgba(46,233,168,0.15)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-sky/10" />
          <div className="relative p-5">
            <div className="font-mono text-sm text-mint/80">
              <span className="text-sky">class</span>{' '}
              <span className="text-mint">ADASValidationFramework</span>:
            </div>
            <div className="mt-2 font-mono text-xs text-slate-muted space-y-1 pl-4">
              <div><span className="text-sky">def</span>{' '}<span className="text-mint">__init__</span>(self):</div>
              <div className="pl-4">self.framework = <span className="text-mint">"pytest"</span></div>
              <div className="pl-4">self.ci_cd = <span className="text-mint">"GitHub Actions"</span></div>
              <div className="pl-4">self.standards = [<span className="text-mint">"OpenX"</span>, <span className="text-mint">"ASAM"</span>]</div>
              <div className="pl-4">self.coverage = <span className="text-mint">"L2/L2+ Features"</span></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div ref={descRef}>
          <p className="text-slate-muted leading-relaxed text-sm">
            A modular pytest architecture for L2/L2+ feature regression — integrated
            with GitHub Actions and aligned to OpenX standards. Enables automated
            quality engineering for SDV architecture.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="group flex items-center gap-2 px-5 py-2.5 bg-mint text-navy font-medium rounded-full hover:bg-mint-dark transition-all duration-150">
              Read Case Study
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150">
              <Github className="w-4 h-4" />
              View Code
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Python', 'pytest', 'GitHub Actions', 'OpenX'].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono text-slate-muted/80 border border-slate-text/10 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop layout (h-screen, absolute positioned) ────── */}
      <div className="hidden md:block relative w-full h-screen">
        {/* Large outline typography background */}
        <div
          ref={outlineTextRef}
          className="absolute left-[6vw] top-[10vh] pointer-events-none select-none"
        >
          <span
            className="font-display text-[clamp(96px,18vw,280px)] font-bold uppercase tracking-[-0.04em]"
            style={{ WebkitTextStroke: '1px rgba(242, 245, 250, 0.1)', WebkitTextFillColor: 'transparent' }}
          >
            ADAS
          </span>
        </div>

        {/* Project Image */}
        <div
          ref={imageRef}
          className="absolute left-[18vw] top-[22vh] w-[64vw] h-[46vh] rounded-2xl overflow-hidden shadow-card"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-mint/20 via-transparent to-sky/20" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(46,233,168,0.1) 1px, transparent 1px), linear-gradient(rgba(46,233,168,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass-strong px-8 py-6 rounded-xl max-w-2xl">
              <div className="font-mono text-sm text-mint/80">
                <span className="text-sky">class</span>{' '}
                <span className="text-mint">ADASValidationFramework</span>:
              </div>
              <div className="mt-2 font-mono text-xs text-slate-muted space-y-1 pl-4">
                <div><span className="text-sky">def</span>{' '}<span className="text-mint">__init__</span>(self):</div>
                <div className="pl-4">self.framework = <span className="text-mint">"pytest"</span></div>
                <div className="pl-4">self.ci_cd = <span className="text-mint">"GitHub Actions"</span></div>
                <div className="pl-4">self.standards = [<span className="text-mint">"OpenX"</span>, <span className="text-mint">"ASAM"</span>]</div>
                <div className="pl-4">self.coverage = <span className="text-mint">"L2/L2+ Features"</span></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
        </div>

        {/* Project Title */}
        <h3
          ref={titleRef}
          className="absolute left-[10vw] top-[62vh] font-display text-[clamp(28px,4vw,56px)] font-bold text-slate-text leading-tight tracking-[-0.02em]"
        >
          ADAS Validation
          <br />
          <span className="text-gradient">Framework</span>
        </h3>

        {/* Description + CTA */}
        <div ref={descRef} className="absolute left-[62vw] top-[68vh] w-[30vw]">
          <p className="text-slate-muted leading-relaxed">
            A modular pytest architecture for L2/L2+ feature regression — integrated
            with GitHub Actions and aligned to OpenX standards. Enables automated
            quality engineering for SDV architecture.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="group flex items-center gap-2 px-5 py-2.5 bg-mint text-navy font-medium rounded-full hover:bg-mint-dark transition-all duration-150 hover:shadow-glow-sm">
              Read Case Study
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150">
              <Github className="w-4 h-4" />
              View Code
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Python', 'pytest', 'GitHub Actions', 'OpenX'].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono text-slate-muted/80 border border-slate-text/10 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
