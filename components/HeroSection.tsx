import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, TrendingUp, Clock, ThumbsUp } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [cleanBgSrc, setCleanBgSrc] = useState<string>('');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const bgOpacity = useTransform(smoothProgress, [0, 0.85], [0.12, 0]);
  const bgY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

  // Strip baked-in checkered background from the logo PNG
  useEffect(() => {
    const img = new Image();
    img.src = '/images/vibelybg.png';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        // Low saturation + bright = checkered bg pixel → make transparent
        if (sat < 0.12 && min > 140) {
          d[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setCleanBgSrc(c.toDataURL());
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animated particle/grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      const count = Math.min(60, Math.floor(canvas.offsetWidth / 20));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 85, 160, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 85, 160, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const proofItems = [
    { icon: <ThumbsUp className="w-4 h-4" />, text: "98% satisfaction" },
    { icon: <Clock className="w-4 h-4" />, text: "48-hour average delivery" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] flex items-center overflow-hidden bg-dark-950">
      {/* Parallax background logo */}
      {cleanBgSrc && (
        <motion.img
          src={cleanBgSrc}
          alt=""
          aria-hidden="true"
          style={{ opacity: bgOpacity, y: bgY, scale: bgScale }}
          className="absolute right-[-10%] top-[-10%] w-[600px] lg:w-[750px] xl:w-[900px] max-w-none pointer-events-none select-none z-[5]"
        />
      )}

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Aurora gradient blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-pink/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-orange/8 blur-[100px] animate-glow-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent-violet/6 blur-[80px] animate-glow-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start mb-8"
          >
            <div className="inline-flex items-center rounded-full border border-accent-pink/20 bg-accent-pink/5 px-4 py-1.5 text-sm font-medium text-accent-pink backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-pink"></span>
              </span>
              NZ-owned &middot; 48-hour delivery &middot; Cancel anytime
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.05] text-white">
                {['They', 'Googled', 'You.'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {['You', "Weren't", 'There.'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                    className="inline-block mr-[0.25em] text-gradient"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                We build websites that get local businesses found
                — <span className="text-white font-medium">live in 48 hours</span>, from $200 to start.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <Button size="lg" onClick={scrollToForm}>
                  See Your Site Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer group"
                >
                  View plans
                  <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
              </motion.div>

              {/* Social proof pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                {proofItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-sm"
                  >
                    <span className="text-accent-pink">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Visual element — floating dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-[340px] xl:w-[400px]">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent-pink/20 via-accent-orange/10 to-accent-violet/10 rounded-3xl blur-2xl opacity-60" />

                {/* Main card */}
                <div className="relative glass-card rounded-2xl p-6 space-y-5">
                  {/* Mini header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent-pink/60" />
                      <div className="w-3 h-3 rounded-full bg-accent-orange/60" />
                      <div className="w-3 h-3 rounded-full bg-accent-violet/60" />
                    </div>
                    <span className="text-[10px] text-zinc-600 font-mono">vibely.co.nz</span>
                  </div>

                  {/* Stat rows */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div>
                        <p className="text-[11px] text-zinc-500">Monthly Leads</p>
                        <p className="text-xl font-bold text-white font-heading">+247%</p>
                      </div>
                      <div className="h-10 w-20">
                        <svg viewBox="0 0 80 40" className="w-full h-full">
                          <path d="M0 35 Q10 30 20 28 T40 20 T60 10 T80 5" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#E855A0" />
                              <stop offset="100%" stopColor="#FB923C" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-[11px] text-zinc-500">Bookings</p>
                        <p className="text-lg font-bold text-white font-heading">38</p>
                        <p className="text-[10px] text-green-400 mt-0.5">+12 this week</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <p className="text-[11px] text-zinc-500">Load Speed</p>
                        <p className="text-lg font-bold text-white font-heading">0.8s</p>
                        <p className="text-[10px] text-accent-pink mt-0.5">99/100 score</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent-pink/5 border border-accent-pink/10">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-pink to-accent-orange flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[11px] text-zinc-400">New lead from Google</p>
                        <p className="text-xs text-white font-medium">Sarah needs a quote for roofing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[11px] text-zinc-300 font-medium whitespace-nowrap">Site live!</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
