import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'CI/CD Regression Suite',
    description: 'Automated regression testing pipeline with GitHub Actions, enabling continuous validation for ADAS features with detailed reporting and notification systems.',
    tags: ['GitHub Actions', 'Python', 'pytest', 'Docker'],
    icon: Zap,
    gradient: 'from-mint/30 via-mint/10 to-transparent',
  },
  {
    title: 'HIL Testbench Automation',
    description: 'Comprehensive automation framework for Hardware-in-the-Loop testbenches, reducing test execution time by 60% and improving reliability.',
    tags: ['HIL', 'TPT', 'Vector CANoe', 'Automation'],
    icon: Zap,
    gradient: 'from-sky/30 via-sky/10 to-transparent',
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      // Project cards animation
      const cards = gridRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.45,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-screen bg-navy py-20 z-40"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(242,245,250,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <span className="font-mono text-xs text-mint tracking-[0.15em] uppercase">
            Portfolio
          </span>
          <h2 className="mt-3 font-display text-[clamp(36px,5vw,64px)] font-bold text-slate-text leading-tight tracking-[-0.02em]">
            Selected <span className="text-gradient">Work</span>
          </h2>
          <p className="mt-4 text-slate-muted max-w-xl">
            A few builds that combine automation, safety, and scale in the
            automotive software validation domain.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map((project, index) => {
            const Icon = project.icon;
            const isLarge = index < 2;

            return (
              <div
                key={project.title}
                className={`project-card group relative ${isLarge ? 'md:row-span-1' : ''}`}
              >
                <div className="relative h-full min-h-[280px] p-6 rounded-2xl border border-slate-text/10 overflow-hidden transition-all duration-200 hover:border-mint/30 hover:shadow-card">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-opacity duration-200 group-hover:opacity-80`}
                  />

                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(242,245,250,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(242,245,250,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-slate-text/5 group-hover:bg-mint/20 transition-all duration-150">
                        <Icon className="w-5 h-5 text-slate-muted group-hover:text-mint transition-colors duration-150" />
                      </div>
                      <button className="p-2 rounded-full border border-slate-text/10 text-slate-muted opacity-0 group-hover:opacity-100 transition-all duration-150 hover:border-mint/50 hover:text-mint">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-auto pt-8">
                      <h3 className="font-display text-xl font-semibold text-slate-text group-hover:text-gradient transition-all duration-150">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-muted leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-mono text-slate-muted/80 bg-slate-text/5 rounded-full border border-slate-text/10 group-hover:border-mint/20 transition-all duration-150"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-mint/20 via-transparent to-sky/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-xl -z-10" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View more CTA */}
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center gap-2 px-6 py-3 border border-slate-text/20 text-slate-text rounded-full hover:border-mint/50 hover:text-mint transition-all duration-150">
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
