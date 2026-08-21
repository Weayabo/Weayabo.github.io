import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  Bike,
  Compass,
  Database,
  GitBranch,
  Layers3,
  Map,
  Mountain,
  Server,
  Sparkles,
  Terminal,
  Cloud,
  Code2,
  Layout,
} from "lucide-react";
import logo from "@/assets/my-avatar-4.png";

const techStack = [
  // Frontend
  { name: "Angular", icon: Code2, category: "Frontend" },
  { name: "React", icon: Code2, category: "Frontend" },

  // Backend
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express.js", icon: Server, category: "Backend" },
  { name: "Next.js", icon: Server, category: "Backend" },
  { name: "Python", icon: Server, category: "Backend" },
  { name: "Django", icon: Server, category: "Backend" },
  { name: "PHP", icon: Server, category: "Backend" },
  { name: "Java", icon: Server, category: "Backend" },

  // Database
  { name: "MySQL", icon: Database, category: "Database" },
  { name: "MongoDB", icon: Database, category: "Database" },
  { name: "PostgreSQL", icon: Database, category: "Database" },
  { name: "Aiven", icon: Database, category: "Database" },

  // DevOps
  { name: "Docker", icon: Cloud, category: "DevOps" },
  { name: "Google Cloud", icon: Cloud, category: "DevOps" },

  // Tools
  { name: "GitHub", icon: GitBranch, category: "Tools" },
  { name: "Figma", icon: Layout, category: "Tools" },
  { name: "VS Code", icon: Code2, category: "Tools" },
  { name: "Pycharm", icon: Code2, category: "Tools" },
];

const terrainGroups = [
  {
    name: "Frontend",
    description: "Where interfaces take shape.",
    icon: Layers3,
    items: techStack.filter((tech) => tech.category === "Frontend"),
  },
  {
    name: "Backend",
    description: "The systems beneath the surface.",
    icon: Server,
    items: techStack.filter((tech) => tech.category === "Backend"),
  },
  {
    name: "Data",
    description: "The trails connecting everything.",
    icon: Database,
    items: techStack.filter((tech) => tech.category === "Database"),
  },
  {
    name: "Infrastructure",
    description: "Keeping the journey moving.",
    icon: Cloud,
    items: techStack.filter((tech) => tech.category === "DevOps"),
  },
  {
    name: "Tools",
    description: "The equipment I carry.",
    icon: Terminal,
    items: techStack.filter((tech) => tech.category === "Tools"),
  },
];

const milestones = [
  {
    number: "01",
    title: "Learn",
    description:
      "Every unfamiliar technology is another trail worth exploring.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Build",
    description:
      "Ideas become real when I turn them into something people can use.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Adapt",
    description:
      "The route changes. I adjust, solve the problem, and keep moving.",
    icon: Mountain,
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const landscapeY = useTransform(scrollYProgress, [0, 1], [80, -100]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const moonY = useTransform(scrollYProgress, [0, 1], [30, -80]);
  const routePath = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.1 },
    );

    const current = sectionRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      {/* =========================================================
          WORLD TRANSITION
          ========================================================= */}

      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-transparent" />

        <motion.div
          className="absolute left-1/2 top-0 h-40 w-px bg-gradient-to-b from-transparent via-[var(--green-accent)]/40 to-transparent"
          initial={{ scaleY: 0 }}
          animate={hasEntered ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2 }}
        />
      </div>

      {/* =========================================================
          ATMOSPHERIC BACKGROUND
          ========================================================= */}

      <div className="absolute inset-0 pointer-events-none">
        {/* Moon */}
        <motion.div
          style={{ y: moonY }}
          className="absolute right-[8%] top-[8%] hidden md:block"
        >
          <div className="relative h-28 w-28 rounded-full border border-[var(--green-accent)]/15">
            <div className="absolute inset-4 rounded-full border border-foreground/5" />

            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--green-bright)]/30">
              <div className="absolute inset-0 rounded-full bg-[var(--green-accent)]/5 blur-xl" />
            </div>

            <div className="absolute -right-1 top-1/2 h-1 w-1 rounded-full bg-[var(--green-bright)]" />
          </div>
        </motion.div>

        {/* Stars / particles */}
        {[
          [12, 12],
          [22, 28],
          [78, 18],
          [88, 34],
          [70, 8],
          [93, 56],
          [8, 62],
          [31, 76],
          [84, 82],
        ].map(([left, top], index) => (
          <motion.span
            key={`${left}-${top}`}
            className="absolute h-1 w-1 rounded-full bg-[var(--green-bright)]"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{
              opacity: [0.15, 0.7, 0.15],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          />
        ))}

        {/* Topographic terrain */}
        <motion.div
          style={{ y: landscapeY }}
          className="absolute inset-x-0 bottom-0 h-[65%] opacity-[0.07]"
        >
          <svg
            viewBox="0 0 1440 700"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 550 C120 490 170 530 270 470 C370 410 430 450 520 380 C610 310 670 390 760 330 C850 270 900 340 990 280 C1080 220 1160 290 1250 230 C1330 175 1380 220 1440 190"
              fill="none"
              stroke="var(--green-accent)"
              strokeWidth="2"
            />

            <path
              d="M0 590 C120 530 170 570 270 510 C370 450 430 490 520 420 C610 350 670 430 760 370 C850 310 900 380 990 320 C1080 260 1160 330 1250 270 C1330 215 1380 260 1440 230"
              fill="none"
              stroke="var(--green-accent)"
              strokeWidth="1.5"
            />

            <path
              d="M0 630 C120 570 170 610 270 550 C370 490 430 530 520 460 C610 390 670 470 760 410 C850 350 900 420 990 360 C1080 300 1160 370 1250 310 C1330 255 1380 300 1440 270"
              fill="none"
              stroke="var(--green-accent)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        {/* Mountain silhouette */}
        <motion.div
          style={{ y: mountainY }}
          className="absolute inset-x-0 bottom-0 opacity-[0.04]"
        >
          <svg
            viewBox="0 0 1440 500"
            className="h-auto w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 430 L180 300 L270 360 L420 190 L560 330 L690 230 L820 350 L980 170 L1130 320 L1260 250 L1440 390 L1440 500 L0 500Z"
              fill="var(--green-accent)"
            />
          </svg>
        </motion.div>
      </div>

      {/* =========================================================
          INTRO
          ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-32 lg:px-8 lg:pb-48 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green-accent)]/50" />

            <span className="flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] text-[var(--green-accent)] uppercase font-['Cinzel']">
              <Map size={12} />
              Entering the next trail
            </span>

            <span className="h-px w-12 bg-[var(--green-accent)]/50" />
          </div>

          <h2 className="text-5xl tracking-tight text-foreground md:text-7xl font-['Cinzel']">
            The Traveler
            <span className="block text-foreground/40">Behind the Code</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-foreground/55 md:text-lg">
            I like moving toward difficult things. Whether it is a steep climb
            on a bike or a problem buried somewhere in a codebase, I enjoy
            figuring out the route forward.
          </p>
        </motion.div>

        {/* =========================================================
    RIDER PROFILE
   ========================================================= */}

        <div className="relative mt-24 lg:mt-32">
          {/* Decorative route lines */}

          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[var(--green-accent)]/10 to-transparent lg:block" />

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            {/* =======================================================
        LEFT — WHO I AM
       ======================================================= */}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={hasEntered ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center lg:text-right"
            >
              <div className="mb-5 flex items-center justify-center gap-3 lg:justify-end">
                <span className="text-[10px] font-medium tracking-[0.3em] text-[var(--green-accent)] uppercase font-['Cinzel']">
                  The Rider
                </span>

                <span className="h-px w-10 bg-[var(--green-accent)]/40" />
              </div>

              <h3 className="text-3xl tracking-tight text-foreground md:text-4xl">
                I build,
                <span className="block text-foreground/35">
                  experiment & explore.
                </span>
              </h3>

              <div className="mt-7 space-y-4 text-sm leading-7 text-foreground/55 md:text-base">
                <p>
                  I'm a fullstack developer who enjoys figuring out how things
                  work and turning ideas into something people can actually use.
                </p>

                <p>
                  My path has taken me across frontend interfaces, backend
                  systems, databases, cloud infrastructure, design, and
                  AI-powered applications.
                </p>
              </div>

              {/* Coordinates */}

              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-end">
                <div>
                  <p className="text-[8px] tracking-[0.2em] text-foreground/25 uppercase">
                    Background
                  </p>

                  <p className="mt-1 text-xs text-foreground/65">
                    Computer Science
                  </p>
                </div>

                <div>
                  <p className="text-[8px] tracking-[0.2em] text-foreground/25 uppercase">
                    Terrain
                  </p>

                  <p className="mt-1 text-xs text-foreground/65">
                    Web · AI · Systems
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =======================================================
        CENTER — PORTRAIT
       ======================================================= */}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                hasEntered
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                delay: 0.3,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto w-full max-w-[340px]"
            >
              {/* Outer compass */}

              <motion.div
                className="
          absolute
          -inset-8
          rounded-full
          border
          border-dashed
          border-[var(--green-accent)]/20
        "
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 70,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Inner compass */}

              <motion.div
                className="
          absolute
          -inset-3
          rounded-full
          border
          border-[var(--green-accent)]/30
        "
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Direction markers */}

              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.3em] text-foreground/25">
                N
              </span>

              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.3em] text-foreground/25">
                S
              </span>

              <span className="absolute -left-7 top-1/2 -translate-y-1/2 text-[8px] tracking-[0.3em] text-foreground/25">
                W
              </span>

              <span className="absolute -right-7 top-1/2 -translate-y-1/2 text-[8px] tracking-[0.3em] text-foreground/25">
                E
              </span>

              {/* Portrait */}

              <div
                className="
        relative
        aspect-square
        overflow-hidden
        rounded-[2rem]
        border
        border-[var(--green-accent)]/25
        bg-[var(--green-accent)]/[0.04]
        shadow-[0_0_80px_rgba(111,191,122,0.08)]
      "
              >
                <div
                  className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[var(--green-accent)]/10
          via-transparent
          to-[var(--green-bright)]/5
        "
                />

                <motion.img
                  src={logo}
                  alt="Remus Kinilitan"
                  className="relative h-full w-full object-contain"
                  initial={{ scale: 1.08 }}
                  animate={hasEntered ? { scale: 1 } : {}}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                />

                <div
                  className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_20%,rgba(111,191,122,0.12),transparent_45%)]
        "
                />
              </div>

              {/* Cycling badge */}

              <motion.div
                className="
          absolute
          -bottom-5
          -right-5
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-[var(--green-accent)]/30
          bg-background/90
          backdrop-blur-md
        "
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={
                  hasEntered
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                }}
              >
                <Bike
                  size={23}
                  strokeWidth={1.3}
                  className="text-[var(--green-accent)]"
                />

                <motion.div
                  className="
            absolute
            inset-2
            rounded-full
            border
            border-dashed
            border-[var(--green-accent)]/20
          "
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* =======================================================
        RIGHT — HOW I WORK
       ======================================================= */}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={hasEntered ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-10 bg-[var(--green-accent)]/40" />

                <span className="text-[10px] font-medium tracking-[0.3em] text-[var(--green-accent)] uppercase font-['Cinzel']">
                  The Approach
                </span>
              </div>

              <h3 className="text-center text-3xl tracking-tight text-foreground md:text-4xl lg:text-left">
                Learn.
                <span className="text-foreground/35"> Build. Adapt.</span>
              </h3>

              <div className="mt-8 space-y-6">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;

                  return (
                    <motion.div
                      key={milestone.number}
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={
                        hasEntered
                          ? {
                              opacity: 1,
                              x: 0,
                            }
                          : {}
                      }
                      transition={{
                        delay: 0.6 + index * 0.15,
                        duration: 0.6,
                      }}
                      className="group flex gap-4"
                    >
                      {/* Icon */}

                      <div
                        className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--green-accent)]/20
                bg-[var(--green-accent)]/5
                transition-colors
                duration-300
                group-hover:border-[var(--green-accent)]/40
              "
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.4}
                          className="text-[var(--green-accent)]"
                        />
                      </div>

                      {/* Text */}

                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[8px] tracking-[0.2em] text-[var(--green-accent)]/50">
                            {milestone.number}
                          </span>

                          <h4 className="text-sm font-medium text-foreground">
                            {milestone.title}
                          </h4>
                        </div>

                        <p className="mt-1.5 max-w-sm text-xs leading-6 text-foreground/45 md:text-sm">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* =========================================================
      SMALL PROFILE DATA
     ========================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 1,
              duration: 0.7,
            }}
            className="
      mx-auto
      mt-20
      flex
      max-w-3xl
      flex-wrap
      items-center
      justify-center
      gap-x-10
      gap-y-4
      border-y
      border-border/50
      py-5
    "
          >
            <div className="text-center">
              <span className="block text-[8px] tracking-[0.2em] text-foreground/25 uppercase">
                Current role
              </span>

              <span className="mt-1 block text-xs text-foreground/65">
                Fullstack Web Developer
              </span>
            </div>

            <span className="hidden h-6 w-px bg-border/60 sm:block" />

            <div className="text-center">
              <span className="block text-[8px] tracking-[0.2em] text-foreground/25 uppercase">
                Focus
              </span>

              <span className="mt-1 block text-xs text-foreground/65">
                Web · AI · Systems
              </span>
            </div>

            <span className="hidden h-6 w-px bg-border/60 sm:block" />

            <div className="text-center">
              <span className="block text-[8px] tracking-[0.2em] text-foreground/25 uppercase">
                Method
              </span>

              <span className="mt-1 block text-xs text-foreground/65">
                Learn · Build · Adapt
              </span>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            CYCLING ROUTE / MILESTONES
            ========================================================= */}

        <div className="relative mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={hasEntered ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-20 text-center"
          >
            <p className="mb-3 text-[10px] font-medium tracking-[0.3em] text-[var(--green-accent)] uppercase font-['Cinzel']">
              The route so far
            </p>

            <h3 className="text-3xl tracking-tight text-foreground md:text-5xl font-['Cinzel']">
              No fixed destination.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-foreground/45 md:text-base">
              Just a collection of climbs, turns, mistakes, discoveries, and
              things worth building.
            </p>
          </motion.div>
        </div>

        {/* =========================================================
            STATS
            ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mx-auto mt-32 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm md:grid-cols-4"
        >
          {[
            { value: "1+", label: "Year Experience" },
            { value: "5", label: "Projects Completed" },
            { value: "16+", label: "Technologies" },
            { value: "∞", label: "Routes Ahead" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`relative p-7 text-center ${
                index !== 0 ? "border-l border-border" : ""
              } ${index === 2 ? "border-t md:border-t-0" : ""} ${
                index === 3 ? "border-t md:border-t-0" : ""
              }`}
            >
              <p className="text-3xl tracking-tight text-[var(--green-accent)] md:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-[10px] tracking-[0.15em] text-foreground/35 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* =========================================================
            TECHNOLOGY TERRAIN
            ========================================================= */}

        <div className="mt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mb-16"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Mountain size={17} className="text-[var(--green-accent)]" />

                  <span className="text-[10px] font-medium tracking-[0.25em] text-[var(--green-accent)] uppercase font-['Cinzel']">
                    Technology terrain
                  </span>
                </div>

                <h3 className="text-4xl tracking-tight text-foreground md:text-5xl font-['Cinzel']">
                  The tools I carry.
                </h3>
              </div>

              <p className="max-w-md text-sm leading-7 text-foreground/40">
                Different terrain calls for different equipment. These are the
                technologies I have explored across the journey so far.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {terrainGroups.map((group, groupIndex) => {
              const GroupIcon = group.icon;

              return (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasEntered ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 1.3 + groupIndex * 0.1,
                    duration: 0.6,
                  }}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-sm ${
                    group.name === "Backend"
                      ? "md:col-span-2 lg:col-span-2"
                      : ""
                  }`}
                >
                  {/* Background terrain */}
                  <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]">
                    <GroupIcon size={180} strokeWidth={0.7} />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--green-accent)]/20 bg-[var(--green-accent)]/5">
                          <GroupIcon
                            size={18}
                            className="text-[var(--green-accent)]"
                            strokeWidth={1.5}
                          />
                        </div>

                        <h4 className="text-lg font-medium text-foreground">
                          {group.name}
                        </h4>

                        <p className="mt-1 text-xs text-foreground/35">
                          {group.description}
                        </p>
                      </div>

                      <span className="text-[9px] tracking-[0.15em] text-foreground/20">
                        0{groupIndex + 1}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tech) => {
                        const TechIcon = tech.icon;

                        return (
                          <motion.div
                            key={tech.name}
                            whileHover={{ y: -2 }}
                            className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2 transition-colors duration-300 hover:border-[var(--green-accent)]/30"
                          >
                            <TechIcon
                              size={14}
                              className="text-foreground/40"
                            />

                            <span className="text-xs text-foreground/65">
                              {tech.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            END OF REGION
            ========================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={hasEntered ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 1 }}
          className="relative mt-10 flex flex-col items-center text-center"
        >
          {/* Route continuation */}
          <div className="mb-8 h-24 w-px bg-gradient-to-b from-[var(--green-accent)]/50 to-transparent" />

          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--green-accent)]/20">
            <Bike
              size={19}
              strokeWidth={1.4}
              className="text-[var(--green-accent)]"
            />
          </div>

          <p className="text-[10px] font-medium tracking-[0.3em] text-foreground/30 uppercase">
            The trail continues
          </p>

          <p className="mt-3 max-w-md text-sm leading-7 text-foreground/40">
            There is always another project, another idea, another climb.
          </p>

          <motion.div
            className="mt-8"
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={20} className="text-[var(--green-accent)]/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
