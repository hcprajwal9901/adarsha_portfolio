import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    company: 'Bosch',
    role: 'SDV Test Engineer',
    duration: 'July 2025 - Present',
    highlights: [
      'Designed scalable Python automation frameworks using pytest',
      'Integrated GitHub Actions for CI-based regression execution',
      'Performed Linux-based automotive software validation',
      'Aligned testing frameworks with Open Scenario and Open Drive',
      'Enabled automated quality engineering for SDV architecture',
    ],
    technologies: ['Python', 'pytest', 'GitHub Actions', 'Linux', 'CI/CD', 'Open Scenario', 'Open Drive'],
  },
  {
    company: 'Mercedes Benz R&D India (Bosch)',
    role: 'System Validation Engineer - ADAS (L2/L2+)',
    duration: 'Previous Role',
    highlights: [
      'System testing for ESS, ALC, L2P China features',
      'Automation using TPT scripting',
      'HIL testbench commissioning and troubleshooting',
      'Requirement analysis using IBM Doors',
      'Collaboration with German counterparts',
    ],
    technologies: ['TPT', 'HIL', 'IBM Doors', 'ADAS'],
  },
  {
    company: 'Mercedes Benz R&D India (TeamLease Digital)',
    role: 'Field Validation Engineer - ADAS (L2)',
    duration: 'Earlier Role',
    highlights: [
      'Validated real-time vehicle testing data',
      'ADAS construction feature analysis using Assess Tool',
    ],
    technologies: ['Assess Tool', 'Field Testing', 'Data Analysis'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

      // Timeline items animation
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        );
      });

      // Progress line animation
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-screen bg-navy py-20 z-40"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(242,245,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,245,250,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <span className="font-mono text-xs text-mint tracking-[0.15em] uppercase">
            Career Journey
          </span>
          <h2 className="mt-3 font-display text-[clamp(36px,5vw,64px)] font-bold text-slate-text leading-tight tracking-[-0.02em]">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-4 text-slate-muted max-w-xl">
            3+ years of experience in ADAS & SDV validation, building automation
            frameworks and driving CI/CD pipelines.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Progress line */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-text/10">
            <div
              ref={progressRef}
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-mint to-sky origin-top"
              style={{ height: '100%' }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.company}
                className={`timeline-item relative flex flex-col md:flex-row gap-6 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-navy border-2 border-mint z-10 mt-2" />

                {/* Content card */}
                <div className={`ml-8 md:ml-0 md:w-[calc(50%-24px)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                  <div className="glass p-6 rounded-2xl hover:border-mint/30 transition-all duration-150 group">
                    {/* Header */}
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2 text-mint">
                          <Building2 className="w-4 h-4" />
                          <span className="font-mono text-xs tracking-wider uppercase">
                            {exp.company}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-xl font-semibold text-slate-text group-hover:text-gradient transition-all duration-150">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-muted/70 text-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-muted">
                          <CheckCircle2 className="w-4 h-4 text-mint/70 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-slate-muted/80 bg-slate-text/5 rounded-full border border-slate-text/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-24px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
