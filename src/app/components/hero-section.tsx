import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Resume from "@/assets/pdf_CV/Remus_Kinilitan_CV.pdf";
import { useIdle } from "@/app/hooks/useIdle";

const roles = [
  "Fullstack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Web Developer",
  "UI/UX Enthusiast",
  "Angular Developer",
  "React Developer",
  "Node.js Developer",
  "Python Developer",
  "Django Developer",
  "REST API Builder",
  "Database Designer",
  "CI/CD Tinkerer",
  "Figma Designer",
  "Responsive Web Dev",
  "Open Source Contributor",
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Weayabo",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/remus-zamora-507768374/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "#contact",
    label: "Email",
  },
];

export function HeroSection() {
  const isIdle = useIdle(10_000);

  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /*
   * ============================================================
   * TYPEWRITER
   * ============================================================
   */

  useEffect(() => {
    const currentRole = roles[wordIndex];

    const delay = deleting ? 70 : charIndex === currentRole.length ? 1400 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(currentRole.slice(0, charIndex + 1));

        if (charIndex + 1 === currentRole.length) {
          setDeleting(true);
        } else {
          setCharIndex((current) => current + 1);
        }
      } else {
        setDisplayed(currentRole.slice(0, charIndex - 1));

        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((current) => (current + 1) % roles.length);
          setCharIndex(0);
        } else {
          setCharIndex((current) => current - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-hidden
        px-6
        pb-12
        pt-28
        lg:px-12
        lg:pb-16
      "
    >
      {/* =========================================================
          BACKGROUND
         ========================================================= */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
        animate={{
          opacity: isIdle ? 0.025 : 0.06,
          filter: isIdle ? "blur(1px)" : "blur(0px)",
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M-100,120 C200,60 400,180 700,110 S1100,40 1540,140"
            stroke="var(--green-accent)"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M-100,220 C250,150 450,270 750,200 S1150,130 1540,240"
            stroke="var(--green-accent)"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M-100,330 C300,250 500,370 800,300 S1200,220 1540,350"
            stroke="var(--green-accent)"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M-100,540 C250,470 500,590 780,510 S1150,440 1540,560"
            stroke="var(--green-accent)"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M-100,650 C280,580 520,700 800,620 S1180,550 1540,670"
            stroke="var(--green-accent)"
            strokeWidth="1.5"
            fill="none"
          />

          <path
            d="M-100,760 C300,700 540,810 820,740 S1200,670 1540,790"
            stroke="var(--green-accent)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* =========================================================
          TITLE — centered, game-title treatment
         ========================================================= */}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        {/* Current role */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isIdle ? 0.08 : 1,
            y: isIdle ? 4 : 0,
            filter: isIdle ? "blur(5px)" : "blur(0px)",
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-border
            px-3
            py-1.5
            text-xs
            text-foreground/60
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-bright)]" />
          <span className="min-w-[9ch] text-[#4f8a5f]">{displayed}</span>
          <span className="animate-pulse">|</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isIdle ? 1.02 : 1,
          }}
          transition={{
            delay: 0.3,
            duration: isIdle ? 1.8 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-3 font-['Cinzel'] text-5xl tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Remus Kinilitan
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-['Cinzel'] text-xl text-foreground/60 md:text-2xl"
        >
          Aspiring Software Engineer
        </motion.h2>
      </div>

      {/* =========================================================
          BOTTOM BAR — links left, trail center, actions right
         ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-1xl lg:mx-0 lg:pl-[0]">
        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          {/* =====================================================
              LEFT — description + links
             ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isIdle ? 0.08 : 1,
              y: isIdle ? 6 : 0,
              filter: isIdle ? "blur(5px)" : "blur(0px)",
            }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="max-w-xl text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-foreground/80 lg:mx-0"
            >
              I build the way I ride — pick a direction, commit to the climb,
              adjust the route when the terrain changes. Fullstack developer
              working mostly in Angular, React, and Django, currently mapping
              out CareerLens as my thesis.
            </motion.p>
          </motion.div>

          {/* =====================================================
              CENTER — start the trail
             ===================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isIdle ? 0.08 : 1,
              y: isIdle ? 6 : 0,
              filter: isIdle ? "blur(5px)" : "blur(0px)",
            }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="flex items-center justify-center gap-6 lg:justify-start"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group relative p-3 text-foreground transition-colors duration-300 hover:text-primary"
                >
                  <Icon size={24} strokeWidth={1.8} />
                  <span className="absolute inset-0 -z-10 rounded-lg bg-primary opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* =====================================================
              RIGHT — actions
             ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isIdle ? 0.08 : 1,
              y: isIdle ? 6 : 0,
              filter: isIdle ? "blur(5px)" : "blur(0px)",
            }}
            className="mb-10 flex flex-row items-center lg:ml-auto justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
      inline-flex
      min-w-[130px]
      items-center
      justify-center
      rounded-lg
      border
      border-white/10
      bg-foreground
      px-5
      py-3
      text-center
      text-sm
      font-medium
      text-background
      transition-colors
      duration-200
      hover:bg-white
      hover:text-black
      sm:min-w-[150px]
      sm:px-8
      sm:py-4
    "
            >
              Send a Signal
            </motion.a>

            <motion.a
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
      inline-flex
      min-w-[130px]
      items-center
      justify-center
      rounded-lg
      border
      border-[var(--green-accent)]
      px-5
      py-3
      text-center
      text-sm
      font-medium
      text-foreground
      transition-colors
      duration-200
      hover:bg-white
      hover:text-black
      sm:min-w-[150px]
      sm:px-8
      sm:py-4
    "
            >
              View Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
