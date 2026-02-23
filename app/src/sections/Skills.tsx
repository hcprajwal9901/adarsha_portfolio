import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  GitBranch,
  Car,
  FileCode,
  Wrench,
  Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    name: 'Automation',
    icon: Code2,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'pytest', level: 90 },
      { name: 'Framework Design', level: 85 },
    ],
    color: 'from-mint/20 to-mint/5',
  },
  {
    name: 'CI/CD',
    icon: GitBranch,
    skills: [
      { name: 'GitHub Actions', level: 90 },
      { name: 'Jenkins', level: 75 },
      { name: 'Pipeline Design', level: 85 },
    ],
    color: 'from-sky/20 to-sky/5',
  },
  {
    name: 'Automotive',
    icon: Car,
    skills: [
      { name: 'ADAS L2/L2+', level: 92 },
      { name: 'SDV', level: 88 },
      { name: 'HIL Testing', level: 80 },
    ],
    color: 'from-purple-500/20 to-purple-500/5',
  },
  {
    name: 'Standards',
    icon: FileCode,
    skills: [
      { name: 'Open Scenario', level: 85 },
      { name: 'Open Drive', level: 82 },
      { name: 'ASAM Standards', level: 78 },
    ],
    color: 'from-amber-500/20 to-amber-500/5',
  },
  {
    name: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'IBM Doors', level: 80 },
      { name: 'Vector CANoe', level: 75 },
      { name: 'JIRA', level: 90 },
    ],
    color: 'from-rose-500/20 to-rose-500/5',
  },
  {
    name: 'Systems',
    icon: Cpu,
    skills: [
      { name: 'Linux', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Bitbucket', level: 88 },
    ],
    color: 'from-cyan-500/20 to-cyan-500/5',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

      // Grid cards animation
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: index * 0.07,
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
      id="skills"
      className="relative w-full min-h-screen bg-navy py-20 z-40"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/30 to-navy" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <span className="font-mono text-xs text-mint tracking-[0.15em] uppercase">
            Technical Expertise
          </span>
          <h2 className="mt-3 font-display text-[clamp(36px,5vw,64px)] font-bold text-slate-text leading-tight tracking-[-0.02em]">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="mt-4 text-slate-muted max-w-xl mx-auto">
            A comprehensive toolkit for automotive software validation,
            automation, and CI/CD pipeline development.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={category.name}
                className="skill-card relative group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onTouchStart={() => setHoveredCard(index)}
                onTouchEnd={() => setHoveredCard(null)}
                onTouchCancel={() => setHoveredCard(null)}
              >
                <div
                  className={`relative p-6 rounded-2xl border border-slate-text/10 bg-gradient-to-br ${category.color} backdrop-blur-sm overflow-hidden transition-all duration-200 ${isHovered ? 'border-mint/40 shadow-glow-sm scale-[1.02]' : ''
                    }`}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 bg-mint/5 rounded-2xl transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`p-2.5 rounded-xl bg-slate-text/5 transition-all duration-150 ${isHovered ? 'bg-mint/20' : ''
                        }`}>
                        <Icon className={`w-5 h-5 transition-colors duration-150 ${isHovered ? 'text-mint' : 'text-slate-muted'
                          }`} />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-slate-text">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skills with progress bars */}
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm text-slate-muted">
                              {skill.name}
                            </span>
                            <span className="text-xs font-mono text-mint/70">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-text/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-mint to-sky rounded-full transition-all duration-400 ease-out"
                              style={{
                                width: isHovered ? `${skill.level}%` : '0%',
                                transitionDelay: `${category.skills.indexOf(skill) * 100}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional skills tags */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-muted/70 mb-4">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'TPT Scripting',
              'Assess Tool',
              'Requirement Analysis',
              'Test Planning',
              'Regression Testing',
              'Defect Management',
              'Agile/Scrum',
              'Technical Documentation',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-mono text-slate-muted/80 border border-slate-text/10 rounded-full hover:border-mint/30 hover:text-mint transition-all duration-150"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
