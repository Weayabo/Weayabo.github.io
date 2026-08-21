import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Bike,
  CircleDot,
  Compass,
  ExternalLink,
  Github,
  Map,
  Mountain,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import careerlens from "@/assets/careerlens-project.png";
import als1 from "@/assets/als-project-1.png";
import als2 from "@/assets/als-project-2.png";
import als3 from "@/assets/als-project-3.png";
import trendandspot from "@/assets/t&s-project.png";

import jobFitAnalyzer from "@/assets/job-fit-analyzer-project.png";
import chatWithRemus from "@/assets/chat-with-remus-project.png";

const alsImages = [als1, als2, als3];

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  terrain: string;
  liveUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    title: "CareerLens",
    description:
      "A web application that recommends career paths based on family occupation and academic background, while also showcasing job market trends.",
    image: careerlens,
    tech: ["Angular", "Node.js", "MySQL", "GCP"],
    category: "Web Application",
    terrain: "Career · Education",
    liveUrl:
      "https://careerlens-client-230445480118.asia-northeast1.run.app/homepage-page",
  },

  {
    title: "Library Attendance System",
    description:
      "A software application that automates library entry tracking by scanning student barcodes and recording attendance digitally.",
    image: alsImages[0],
    tech: ["NetBeans", "Java", "MySQL", "XAMPP"],
    category: "Software Application",
    terrain: "Desktop · Library",
    githubUrl: "https://github.com/Weayabo/library-attendance-system",
  },

  {
    title: "Trends and Spots",
    description:
      "A web portal showcasing places, events, and people's experiences, helping users discover different destinations, cultures, and communities.",
    image: trendandspot,
    tech: ["WordPress", "PHP"],
    category: "Web Portal",
    terrain: "Travel · Community",
    liveUrl: "https://www.trendsandspots.com/home/",
  },
];

const aiProjects: Project[] = [
  {
    title: "Job Fit Analyzer",
    description:
      "An AI-powered web application that analyzes how well a resume matches a job description, identifies skill gaps, and provides Philippine-focused job search links.",
    image: jobFitAnalyzer,
    tech: ["Next.js", "Vercel AI SDK", "Gemini", "Zod"],
    category: "AI Web Application",
    terrain: "AI · Career",
    liveUrl: "https://job-fit-analyzer-gamma.vercel.app/",
    githubUrl: "https://github.com/Weayabo/job-fit-analyzer",
  },

  {
    title: "Chat with Remus",
    description:
      "A RAG-powered AI assistant embedded in my portfolio that answers questions about my background, skills, projects, and experience in first person.",
    image: chatWithRemus,
    tech: ["Next.js", "LangChain.js", "Pinecone", "Gemini"],
    category: "RAG AI Assistant",
    terrain: "AI · RAG · Portfolio",
    liveUrl: "https://chat-with-remus.vercel.app/",
    githubUrl: "https://github.com/Weayabo/chat-with-remus",
  },
];

/* ================================================================
   ROUTE
   ================================================================ */

function ExpeditionRoute({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 lg:block">
      <svg
        width="150"
        height="100%"
        viewBox="0 0 150 1600"
        preserveAspectRatio="none"
        className="h-full overflow-visible"
      >
        {/* Existing route */}
        <path
          d="
            M75 0
            C20 130 130 210 75 330
            C20 450 130 520 75 650
            C20 780 130 860 75 1000
            C20 1140 125 1270 75 1600
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5 9"
          className="text-[var(--green-accent)]/15"
        />

        {/* Active route */}
        <motion.path
          d="
            M75 0
            C20 130 130 210 75 330
            C20 450 130 520 75 650
            C20 780 130 860 75 1000
            C20 1140 125 1270 75 1600
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          pathLength={1}
          style={{ pathLength }}
          className="text-[var(--green-accent)]/45"
        />
      </svg>
    </div>
  );
}

/* ================================================================
   WAYPOINT
   ================================================================ */

function Waypoint({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="relative z-20 flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.08 }}
        className={[
          "flex h-16 w-16 items-center justify-center rounded-full",
          "border bg-background",
          active ? "border-[var(--green-accent)]/40" : "border-border",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full border",
            active ? "border-[var(--green-accent)]/40" : "border-border",
          ].join(" ")}
        >
          <CircleDot
            size={13}
            className={
              active ? "text-[var(--green-accent)]" : "text-foreground/25"
            }
          />
        </div>
      </motion.div>

      <span className="mt-3 text-[9px] tracking-[0.25em] text-foreground/25 uppercase">
        {number}
      </span>
    </div>
  );
}

/* ================================================================
   PROJECT META
   ================================================================ */

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border/70 py-6 sm:grid-cols-3">
      <div>
        <p className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
          Terrain
        </p>

        <p className="mt-2 text-xs text-foreground/65">{project.terrain}</p>
      </div>

      <div>
        <p className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
          Type
        </p>

        <p className="mt-2 text-xs text-foreground/65">{project.category}</p>
      </div>

      <div>
        <p className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
          Equipment
        </p>

        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs text-foreground/55">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   LINK BUTTONS
   ================================================================ */

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.githubUrl) {
    return null;
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Visit Project
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-medium text-foreground/65 transition-colors hover:border-[var(--green-accent)]/40 hover:text-foreground"
        >
          <Github size={14} />
          Repository
        </a>
      )}
    </div>
  );
}

/* ================================================================
   IMAGE
   ================================================================ */

function ProjectImage({ project, index }: { project: Project; index: number }) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <div ref={imageRef} className="relative">
      {/* Decorative map rings */}
      <div className="absolute -inset-5 rounded-[2rem] border border-[var(--green-accent)]/10" />

      <div className="absolute -inset-10 rounded-[3rem] bg-[var(--green-accent)]/[0.025] blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div style={{ y, scale }} className="h-full w-full">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

          {/* Expedition marker */}
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
            <Map size={11} className="text-[var(--green-bright)]" />

            <span className="text-[9px] tracking-[0.18em] text-white/60 uppercase">
              Expedition {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-background/80 px-5 py-4">
          <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
            {project.category}
          </span>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="text-foreground/35 transition-colors hover:text-[var(--green-accent)]"
              >
                <Github size={15} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live project`}
                className="text-foreground/35 transition-colors hover:text-[var(--green-accent)]"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FEATURED EXPEDITION
   ================================================================ */

function FeaturedExpedition({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className={[
          "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
          index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <ProjectImage project={project} index={index} />

        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[10px] font-medium tracking-[0.28em] text-[var(--green-accent)] uppercase">
              Expedition {String(index + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-10 bg-[var(--green-accent)]/30" />
          </div>

          <h3 className="text-4xl tracking-tight text-foreground md:text-5xl">
            {project.title}
          </h3>

          <p className="mt-6 max-w-xl text-base leading-8 text-foreground/55 md:text-lg">
            {project.description}
          </p>

          <div className="mt-8">
            <ProjectMeta project={project} />
          </div>

          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

/* ================================================================
   ALS GALLERY
   ================================================================ */

function LibrarySystemGallery() {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      {alsImages.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.08,
            duration: 0.5,
          }}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/3]"
          >
            <ImageWithFallback
              src={image}
              alt={`Library Attendance System screenshot ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================================
   AI EXPEDITION
   ================================================================ */

function AIExpedition({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
      }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm transition-colors duration-500 hover:border-[var(--green-accent)]/25">
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.035 }}
            transition={{ duration: 0.7 }}
            className="h-full w-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[var(--green-accent)]/20 bg-background/40 px-3 py-1.5 backdrop-blur-md">
            <Sparkles size={11} className="text-[var(--green-bright)]" />

            <span className="text-[9px] tracking-[0.18em] text-foreground/60 uppercase">
              AI terrain
            </span>
          </div>
        </div>

        <div className="relative -mt-12 p-6 md:p-8">
          <div className="rounded-xl border border-border/70 bg-background/90 p-6 backdrop-blur-xl md:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-[9px] tracking-[0.2em] text-[var(--green-accent)] uppercase">
                  AI Expedition {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-2xl tracking-tight text-foreground md:text-3xl">
                  {project.title}
                </h3>
              </div>

              <Sparkles
                size={18}
                className="shrink-0 text-[var(--green-accent)]/40"
              />
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/50 md:text-base">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border px-2.5 py-1 text-[10px] text-foreground/45"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
                >
                  Explore
                  <ArrowUpRight size={13} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-foreground/60 transition-colors hover:text-foreground"
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ================================================================
   MAIN
   ================================================================ */

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const atmosphereY = useTransform(scrollYProgress, [0, 1], [100, -120]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: atmosphereY }}
          className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[var(--green-accent)]/[0.025] blur-3xl"
        />

        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--green-accent)]/30 to-transparent" />

        {/* Topographic rings */}
        <svg
          className="absolute right-[-15%] top-[8%] h-[800px] w-[70%] opacity-[0.035]"
          viewBox="0 0 1000 800"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="500"
            cy="400"
            rx="470"
            ry="300"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="400"
            rx="390"
            ry="250"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="400"
            rx="315"
            ry="200"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="400"
            rx="240"
            ry="150"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="400"
            rx="165"
            ry="100"
            stroke="var(--green-accent)"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-20">
        {/* ==========================================================
            INTRO
            ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--green-accent)]/40" />

            <span className="flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] text-[var(--green-accent)] uppercase font-['Cinzel']">
              <Compass size={12} />
              The expedition log
            </span>

            <span className="h-px w-10 bg-[var(--green-accent)]/40" />
          </div>

          <h2 className="text-5xl tracking-tight text-foreground md:text-7xl font-['Cinzel']">
            The
            <span className="block text-foreground/30">Expeditions</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-foreground/50 md:text-lg">
            Every build is a trail I have taken — from academic systems and
            software applications to experiments with AI.
          </p>
        </motion.div>

        {/* ==========================================================
            CORE EXPEDITIONS
            ========================================================== */}

        <div className="relative mx-auto mt-32 max-w-6xl">
          <div className="mb-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bike
                size={17}
                strokeWidth={1.4}
                className="text-[var(--green-accent)]"
              />

              <span className="text-[10px] tracking-[0.22em] text-foreground/35 uppercase">
                The main route
              </span>
            </div>

            <span className="text-[9px] tracking-[0.2em] text-foreground/20">
              FIELD NOTES / 01—03
            </span>
          </div>

          <div className="relative">
            <ExpeditionRoute progress={scrollYProgress} />

            <div className="space-y-40 lg:space-y-56">
              {projects.map((project, index) => (
                <div key={project.title} className="relative">
                  {/* Desktop waypoint */}
                  <div className="mb-10 mt-2 hidden lg:absolute lg:left-1/2 lg:top-0 lg:block lg:-translate-x-1/2">
                    <Waypoint
                      number={String(index + 1).padStart(2, "0")}
                      label={project.category}
                      active
                    />
                  </div>

                  <FeaturedExpedition project={project} index={index} />

                  {/* ALS receives its full visual record */}
                  {project.title === "Library Attendance System" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                      className="lg:ml-auto lg:w-[calc(50%-2.5rem)]"
                    >
                      <p className="mb-3 mt-8 text-[9px] tracking-[0.2em] text-foreground/25 uppercase">
                        Field documentation
                      </p>

                      <LibrarySystemGallery />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================================
            AI TERRAIN
            ========================================================== */}

        <div className="relative mt-56">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <Sparkles size={15} className="text-[var(--green-accent)]" />

              <span className="text-[10px] font-medium tracking-[0.28em] text-[var(--green-accent)] uppercase font-['Cinzel']">
                A different terrain
              </span>
            </div>

            <h3 className="text-4xl tracking-tight text-foreground md:text-6xl font-['Cinzel']">
              AI & LLM
              <span className="block text-foreground/30">Expeditions</span>
            </h3>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-foreground/45 md:text-base">
              A newer part of the trail — exploring practical applications of
              AI, LLMs, retrieval, and intelligent software development.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {aiProjects.map((project, index) => (
              <AIExpedition
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ==========================================================
            END OF MAP
            ========================================================== */}

        <div className="relative mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1 }}
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <div className="relative mb-10">
              <div className="absolute -inset-6 rounded-full bg-[var(--green-accent)]/5 blur-xl" />

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--green-accent)]/20">
                <Mountain
                  size={19}
                  strokeWidth={1.4}
                  className="text-[var(--green-accent)]"
                />
              </div>
            </div>

            <p className="text-[10px] font-medium tracking-[0.3em] text-[var(--green-accent)] uppercase font-['Cinzel']">
              End of the current map, But not the journey.
            </p>

            <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/40 md:text-base">
              There are still plenty of roads I have not taken, problems I have
              not solved, and things I have not built yet.
            </p>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-10"
            >
              <ArrowDown size={20} className="text-[var(--green-accent)]/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
