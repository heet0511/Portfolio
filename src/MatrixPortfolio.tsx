import React, { useEffect } from "react";
import { FileDown } from "lucide-react";

export default function MatrixPortfolio() {
  // === MATRIX RAIN BACKGROUND ===
  useEffect(() => {
    const canvas = document.getElementById("matrixRain") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const letters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    const fontSize = 14;
    let columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array(columns).fill(1);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
    };

    resizeCanvas();

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 33);
    window.addEventListener("resize", resizeCanvas);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // === SMOOTH SCROLL FOR NAV LINKS ===
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")!;
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  // === TYPING ANIMATION (CLI-style underscore cursor) ===
  useEffect(() => {
    const name = "Heet Joshi";
    const element = document.getElementById("typedName");
    if (!element) return;

    let i = 0;
    const typing = setInterval(() => {
      if (i <= name.length) {
        element.innerHTML =
          name.slice(0, i) +
          `<span class="text-green-400 animate-blink ml-1">_</span>`;
        i++;
      } else {
        clearInterval(typing);
        element.innerHTML =
          name + `<span class="text-green-400 animate-blink ml-1">_</span>`;
      }
    }, 180);

    return () => clearInterval(typing);
  }, []);

  const glow = "drop-shadow-[0_0_12px_rgba(34,197,94,0.55)]";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-green-400 font-mono">
      {/* === MATRIX BACKGROUND === */}
      <canvas id="matrixRain" className="fixed top-0 left-0 w-full h-full z-0"></canvas>

      {/* === OVERLAY === */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-[1]" />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">

        {/* === NAVBAR === */}
        <header className="sticky top-0 z-20 w-full">
          <div className="mx-auto max-w-6xl px-6">
            <nav
              className={`mt-4 flex items-center justify-between rounded-2xl border border-green-900/40 bg-black/50 px-6 py-3 backdrop-blur ${glow}`}
            >
              <a
                href="#home"
                className={`text-green-400 text-base sm:text-lg font-semibold tracking-wide ${glow}`}
              >
                HEET // PORTFOLIO
              </a>
              <ul className="flex items-center gap-8 text-sm text-green-300">
                <li><a className="hover:text-green-200 transition" href="#projects">Projects</a></li>
                <li><a className="hover:text-green-200 transition" href="#about">About</a></li>
                <li><a className="hover:text-green-200 transition" href="#skills">Skills</a></li>
                <li><a className="hover:text-green-200 transition" href="#contact">Contact</a></li>
                <li>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-green-700/60 px-3 py-1.5 text-green-200 hover:border-green-400 hover:text-green-100 transition"
                  >
                    <FileDown className="h-4 w-4" /> Resume
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* === HERO SECTION === */}
        <section id="home" className="max-w-4xl mx-auto mt-24">
          <h2
            id="typedName"
            className="text-6xl md:text-7xl font-extrabold text-green-400 mb-6 drop-shadow-[0_0_12px_#00FF41]"
          ></h2>
          <p className="text-green-200 leading-relaxed max-w-3xl mx-auto mb-8">
            Software Engineer · UW–Madison — building backend systems, game mechanics, and tools that feel like magic. This site runs on a live Matrix rain renderer.
          </p>
        </section>

        {/* === PROJECTS === */}
        <section id="projects" className="mt-32 max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-green-400">/projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Inventory Management System", desc: "Java + SQL backend app improving search efficiency by 30%.", link: "https://github.com/heet0511/inventory-system" },
              { title: "Unity Game Prototype", desc: "C# Unity 3D project with dual-state player and AI enemies.", link: "https://github.com/heet0511/unity-prototype" },
              { title: "Matrix Portfolio", desc: "This portfolio — crafted with React, Tailwind, and live Matrix rain.", link: "https://github.com/heet0511/Portfolio" },
            ].map((proj) => (
              <a key={proj.title} href={proj.link} target="_blank" rel="noopener noreferrer"
                className="backdrop-blur-md bg-green-900/10 border border-green-500/30 rounded-2xl p-4 text-left hover:bg-green-500/10 transition shadow-[0_0_10px_#00FF41]/20">
                <h4 className="text-xl font-semibold text-green-300 mb-2">{proj.title}</h4>
                <p className="text-green-200 text-sm">{proj.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* === ABOUT === */}
        <section id="about" className="mt-32 max-w-5xl mx-auto text-left">
          <h3 className="text-3xl font-bold mb-6 text-green-400">/about</h3>
          <p className="text-green-200 leading-relaxed mb-8">
            Software engineering student with strong backend and systems skills in Java, Python, and C. Experienced in building distributed backends, socket-based simulators, REST APIs, and full-stack dashboards.
          </p>
        </section>

        {/* === SKILLS === */}
        <section id="skills" className="mt-32 max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10 text-green-400">/skills</h3>
          <div className="relative overflow-hidden py-4">
            <div className="marquee-track flex gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 shrink-0">
                  {[
                    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
                    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
                    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                    { name: "Unity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
                    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
                    { name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },

                  ].map((skill) => (
                    <div key={`${i}-${skill.name}`} className="flex flex-col items-center justify-center min-w-[130px] h-[130px] border border-green-500/30 bg-black/40 rounded-xl shadow-[0_0_12px_#00FF41]/20 hover:shadow-[0_0_20px_#00FF41] hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
                      <img src={skill.logo} alt={skill.name} className="w-10 h-10 mb-2" />
                      <span className="text-green-300 font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CONTACT === */}
        <section id="contact" className="mt-32 mb-20 max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-green-400">/contact</h3>

          <div className="inline-flex flex-wrap justify-center items-center gap-8 rounded-3xl border border-green-700/50 bg-black/40 px-8 py-4 shadow-[0_0_25px_#00FF41]/40 backdrop-blur-md">
            {/* Email */}
            <a href="mailto:heet_joshi@yahoo.com" className="flex items-center gap-3 rounded-2xl border border-green-600/50 px-6 py-2 hover:border-green-400 hover:text-green-100 transition text-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M22 4 12 13 2 4" />
              </svg>
              <span className="font-mono text-lg">Email</span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/heet0511" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-green-600/50 px-6 py-2 hover:border-green-400 hover:text-green-100 transition text-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303
                  3.438 9.8 8.205 11.385.6.111.82-.261.82-.58
                  0-.285-.011-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61
                  -.546-1.387-1.333-1.757-1.333-1.757
                  -1.09-.745.083-.729.083-.729
                  1.205.085 1.84 1.236 1.84 1.236
                  1.07 1.835 2.809 1.305 3.495.998
                  .108-.775.419-1.305.762-1.606
                  -2.665-.304-5.466-1.333-5.466-5.932
                  0-1.31.469-2.381 1.236-3.221
                  -.124-.303-.536-1.527.117-3.183
                  0 0 1.008-.322 3.3 1.23a11.45 11.45 0 0 1 3.003-.403
                  c1.018.005 2.044.137 3.003.403
                  2.291-1.552 3.297-1.23 3.297-1.23
                  .654 1.656.242 2.88.118 3.183
                  .77.84 1.235 1.911 1.235 3.221
                  0 4.61-2.804 5.625-5.476 5.922
                  .43.372.823 1.103.823 2.222
                  0 1.604-.015 2.896-.015 3.287
                  0 .322.217.696.825.577
                  C20.565 21.796 24 17.308 24 12
                  24 5.37 18.63.297 12 .297z"/>
              </svg>
              <span className="font-mono text-lg">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/heetjoshi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-green-600/50 px-6 py-2 hover:border-green-400 hover:text-green-100 transition text-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M19 0h-14c-2.761 0-5 2.239-5
                  5v14c0 2.761 2.239 5 5
                  5h14c2.762 0 5-2.239
                  5-5v-14c0-2.761-2.238-5-5-5zm-11.75
                  20h-2.5v-11h2.5v11zm-1.25-12.268c-.828
                  0-1.5-.676-1.5-1.506
                  0-.831.672-1.506
                  1.5-1.506.829
                  0 1.5.675
                  1.5 1.506 0
                  .83-.671
                  1.506-1.5
                  1.506zm13
                  12.268h-2.5v-5.604c0-1.336-.026-3.056-1.862-3.056-1.865
                  0-2.151 1.455-2.151 2.957v5.703h-2.5v-11h2.4v1.507h.034c.334-.631
                  1.152-1.298 2.373-1.298 2.538 0
                  3.006 1.67 3.006
                  3.841v6.95z"/>
              </svg>
              <span className="font-mono text-lg">LinkedIn</span>
            </a>
          </div>
        </section>
      </div>

      {/* === STYLES (Blink + Marquee) === */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 2.5s step-end infinite;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
