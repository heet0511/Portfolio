import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ArrowRight } from "lucide-react";

export default function MatrixPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Matrix rain background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columnWidth = 14; // px per column
    const cols = Math.floor(width / columnWidth);
    const yPositions = Array(cols).fill(0);

    const chars =
      "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%'\\\"#&_(),.;:?!".split(
        ""
      );

    const draw = () => {
      // Semi-transparent black to create trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#29ff6a"; // phosphor green
      ctx.font =
        '15px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnWidth;
        const y = yPositions[i] * 18; // vertical step
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = yPositions[i] + 1;
        }
      }
    };

    let raf: number;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth-scroll helper for in-page hash links (works in sandboxes & SPAs)
  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget.getAttribute("href") || "").trim();
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const glow = "drop-shadow-[0_0_12px_rgba(34,197,94,0.55)]"; // Tailwind arbitrary value

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="relative scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className={`font-mono text-2xl sm:text-3xl text-green-400 ${glow} mb-6 flex items-center gap-3`}>
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          {title}
        </h2>
        <div className="text-green-300/90">{children}</div>
      </div>
    </section>
  );

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`relative rounded-2xl border border-green-900/50 bg-black/40 p-5 sm:p-6 shadow-[0_0_30px_-10px_rgba(34,197,94,0.35)] ${glow}`}
    >
      {/* scanline + corner accents */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(41,255,106,0.03) 0px, rgba(41,255,106,0.03) 1px, transparent 2px, transparent 4px)",
        }}
      />
      <div className="pointer-events-none absolute -inset-px rounded-2xl border border-green-500/10" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-black text-green-300 font-mono selection:bg-green-500/20 selection:text-green-100">
      {/* Canvas: Matrix rain */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-20 h-full w-full" />

      {/* Overlays: vignette, scanlines */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(41,255,106,0.05) 3px, rgba(0,0,0,0) 4px)",
        }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-6">
          <nav
            className={`mt-4 flex items-center justify-between rounded-2xl border border-green-900/40 bg-black/50 px-4 py-3 backdrop-blur ${glow}`}
          >
            <a href="#home" className={`text-green-400 text-sm sm:text-base ${glow} tracking-wide`}>
              HEET // PORTFOLIO
            </a>
            <ul className="flex items-center gap-5 text-xs sm:text-sm text-green-300">
              <li>
                <a className="hover:text-green-200 transition active:translate-y-[1px]" href="#projects" onClick={handleHashLink}>
                  Projects
                </a>
              </li>
              <li>
                <a className="hover:text-green-200 transition active:translate-y-[1px]" href="#about" onClick={handleHashLink}>
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-green-200 transition active:translate-y-[1px]" href="#contact" onClick={handleHashLink}>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-3 py-1.5 text-green-200 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
                >
                  <FileDown className="h-4 w-4" /> Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold text-green-400 ${glow}`}>Heet Joshi</h1>
            <p className="mt-3 text-green-300/90 text-base sm:text-lg leading-relaxed">
              Software Engineer · UW–Madison — building backend systems, game mechanics, and tools that feel like magic.
              This site runs on a live <span className="text-green-400">Matrix</span> rain renderer.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleHashLink}
                className="group inline-flex items-center gap-2 rounded-xl border border-green-700/60 bg-black/40 px-4 py-2 text-green-200 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
              >
                View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://github.com/heet0511"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-4 py-2 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/heetjoshi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-4 py-2 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="/projects">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Project 1 */}
          <Card>
            <div className="flex items-start justify-between">
              <h3 className={`text-lg font-semibold text-green-300 ${glow}`}>Inventory Management System</h3>
              <span className="rounded-md border border-green-700/60 px-2 py-0.5 text-xs text-green-200">Java · MySQL</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-green-300/90">
              Real-time stock tracking, indexed queries, and caching to reduce search latency ~30%. Includes role-based auth and export.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <a href="https://github.com/heet0511/inventory" target="_blank" rel="noreferrer" className="hover:text-green-100 underline underline-offset-4">
                Code
              </a>
              <a href="#" className="hover:text-green-100 underline underline-offset-4">
                Demo
              </a>
            </div>
          </Card>

          {/* Project 2 */}
          <Card>
            <div className="flex items-start justify-between">
              <h3 className={`text-lg font-semibold text-green-300 ${glow}`}>Lunar Shadow — Unity 3D</h3>
              <span className="rounded-md border border-green-700/60 px-2 py-0.5 text-xs text-green-200">C# · Unity</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-green-300/90">
              Player state-switch mechanic (fragile/empowered), enemy AI with chase/fight loops, and polished camera & VFX. WebGL-ready.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <a href="https://github.com/heet0511/lunar-shadow" target="_blank" rel="noreferrer" className="hover:text-green-100 underline underline-offset-4">
                Code
              </a>
              <a href="#" className="hover:text-green-100 underline underline-offset-4">
                Gameplay
              </a>
            </div>
          </Card>

          {/* Project 3 */}
          <Card>
            <div className="flex items-start justify-between">
              <h3 className={`text-lg font-semibold text-green-300 ${glow}`}>Socket/Network Simulator</h3>
              <span className="rounded-md border border-green-700/60 px-2 py-0.5 text-xs text-green-200">Python · Docker</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-green-300/90">
              CLI-driven network lab: simulate unreliable links, latency, and packet loss; visualize retransmissions; REST API hooks.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <a href="https://github.com/heet0511/net-sim" target="_blank" rel="noreferrer" className="hover:text-green-100 underline underline-offset-4">
                Code
              </a>
              <a href="#" className="hover:text-green-100 underline underline-offset-4">
                Docs
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* About */}
      <Section id="about" title="/about">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <Card>
              <p className="text-sm leading-relaxed">
                I'm a developer focused on backend systems, gameplay programming, and tooling. I like building fast search, clean APIs, and
                real-time experiences. Currently studying Computer & Information Sciences at UW–Madison.
              </p>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <Card>
              <h4 className="text-sm font-semibold text-green-300">Tech</h4>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-green-200/90">
                <li>Java</li>
                <li>Python</li>
                <li>C# / Unity</li>
                <li>C</li>
                <li>MySQL</li>
                <li>Docker</li>
                <li>REST APIs</li>
                <li>React / Tailwind</li>
              </ul>
            </Card>
            <Card>
              <h4 className="text-sm font-semibold text-green-300">Currently</h4>
              <p className="mt-2 text-xs text-green-200/90">
                Polishing projects for internship season; exploring low-latency systems and shader/graphics basics.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="/contact">
        <Card>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-green-200/90">Open to SWE internships & collabs. Reach out and let's build.</p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:heet_joshi@yahoo.com"
                className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-3 py-1.5 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href="https://github.com/heet0511"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-3 py-1.5 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/heetjoshi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-3 py-1.5 hover:border-green-400 hover:text-green-100 transition focus-visible:outline-none focus-visible:ring focus-visible:ring-green-600/40 active:translate-y-[1px]"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="relative pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs text-green-600">
            © {new Date().getFullYear()} Heet Joshi — built with React & Tailwind · Matrix mode engaged
          </p>
        </div>
      </footer>
    </main>
  );
}
