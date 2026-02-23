import { Heart, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-navy py-12 z-50">
      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-text/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Message */}
          <p className="font-display text-2xl md:text-3xl font-semibold text-slate-text">
            Thanks for stopping by.
          </p>

          {/* Credit */}
          <div className="mt-4 flex items-center gap-2 text-slate-muted">
            <span>Designed & built with</span>
            <Heart className="w-4 h-4 text-mint fill-mint" />
            <span>by</span>
            <span className="text-slate-text font-medium">Adarsha H V</span>
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-6">
            <a
              href="./adarsha_resume.pdf"
              download
              className="text-sm text-slate-muted hover:text-mint transition-colors duration-300"
            >
              Resume
            </a>
            <span className="text-slate-text/20">•</span>
            <a
              href="#"
              className="text-sm text-slate-muted hover:text-mint transition-colors duration-300"
            >
              Colophon
            </a>
          </div>

          {/* Tech stack */}
          <div className="mt-8 flex items-center gap-2 text-xs text-slate-muted/50">
            <Code className="w-3 h-3" />
            <span>React • TypeScript • Tailwind CSS • GSAP</span>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-xs text-slate-muted/40">
            © {new Date().getFullYear()} Adarsha H V. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
