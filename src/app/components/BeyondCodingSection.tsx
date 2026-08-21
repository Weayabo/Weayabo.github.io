import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bike,
  Gamepad2,
  Mountain,
  Footprints,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";
import cyclingImage from "@/assets/cycling.png";
import gamingImage from "@/assets/gaming.png";
import natureImage from "@/assets/nature.png";
type Activity = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  details: string[];
  icon: typeof Bike;
  image?: string;
};

const activities: Activity[] = [
  {
    number: "01",
    title: "Cycling",
    eyebrow: "The road outside",
    description:
      "When I need to step away from the screen, I get on a bike. There's something about moving through unfamiliar roads that makes it easier to clear my head and reset.",
    details: ["Ride", "Explore", "Reset"],
    icon: Bike,
    image: cyclingImage,
  },
  {
    number: "02",
    title: "Gaming",
    eyebrow: "After hours",
    description:
      "Not everything has to be productive. Gaming is one of the ways I disconnect, have fun, and spend time away from development.",
    details: ["Play", "Compete", "Unwind"],
    icon: Gamepad2,
    image: gamingImage,
  },
  {
    number: "03",
    title: "Nature",
    eyebrow: "Beyond the screen",
    description:
      "Nature trips give me another reason to leave the desk. Sometimes a change of scenery is all it takes to come back with a clearer mind.",
    details: ["Wander", "Breathe", "Explore"],
    icon: Mountain,
    image: natureImage,
  },
];

/* ================================================================
   ACTIVITY IMAGE / VISUAL
   ================================================================ */

function ActivityVisual({ activity }: { activity: Activity }) {
  const Icon = activity.icon;

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden bg-[var(--near-black)] md:min-h-[400px]">
      {/* Real image */}
      {activity.image ? (
        <motion.img
          key={activity.image}
          src={activity.image}
          alt={`${activity.title} - personal activity`}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        /* Placeholder atmosphere until real image is supplied */
        <motion.div
          key={activity.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-accent)]/[0.10] via-background to-background" />

          <div className="absolute inset-0 opacity-[0.06]">
            <svg
              viewBox="0 0 800 600"
              className="h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <ellipse
                cx="400"
                cy="300"
                rx="340"
                ry="230"
                stroke="var(--green-accent)"
              />
              <ellipse
                cx="400"
                cy="300"
                rx="275"
                ry="185"
                stroke="var(--green-accent)"
              />
              <ellipse
                cx="400"
                cy="300"
                rx="210"
                ry="140"
                stroke="var(--green-accent)"
              />
              <ellipse
                cx="400"
                cy="300"
                rx="145"
                ry="95"
                stroke="var(--green-accent)"
              />
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={activity.number}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                flex h-28 w-28 items-center justify-center
                rounded-full
                border border-[var(--green-accent)]/20
                bg-[var(--green-accent)]/[0.04]
              "
            >
              <Icon
                size={42}
                strokeWidth={1}
                className="text-[var(--green-accent)]/70"
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Image atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

      <div className="pointer-events-none absolute inset-0 bg-[var(--green-accent)]/[0.025] mix-blend-screen" />

      {/* Image label */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className="h-px w-8 bg-[var(--green-accent)]/50" />

        <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">
          Personal journal
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   ACTIVITY CAROUSEL
   ================================================================ */

export function BeyondCodingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const activeActivity = activities[activeIndex];

  /* --------------------------------------------------------------
     NAVIGATION
     -------------------------------------------------------------- */

  const goTo = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const next = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % activities.length);
  };

  const previous = () => {
    setDirection(-1);
    setActiveIndex(
      (current) => (current - 1 + activities.length) % activities.length,
    );
  };

  /* --------------------------------------------------------------
     AUTOPLAY
     -------------------------------------------------------------- */

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      next();
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isPaused, activeIndex]);

  /* --------------------------------------------------------------
     KEYBOARD
     -------------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      id="beyond-coding"
      className="relative overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ============================================================
          ATMOSPHERE
          ============================================================ */}

      <div className="pointer-events-none absolute inset-0">
        {/* Main glow */}
        <div
          className="
            absolute left-1/2 top-[20%]
            h-[700px] w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[var(--green-accent)]/[0.018]
            blur-3xl
          "
        />

        {/* Topographic map */}
        <svg
          className="
            absolute -left-[25%] top-0
            h-[1000px] w-[90%]
            opacity-[0.025]
          "
          viewBox="0 0 1000 1000"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="500"
            cy="500"
            rx="470"
            ry="350"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="500"
            rx="390"
            ry="290"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="500"
            rx="310"
            ry="230"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="500"
            rx="230"
            ry="170"
            stroke="var(--green-accent)"
          />
          <ellipse
            cx="500"
            cy="500"
            rx="150"
            ry="110"
            stroke="var(--green-accent)"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        {/* ============================================================
            INTRO
            ============================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--green-accent)]/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--green-accent)] font-['Cinzel']">
              Beyond the keyboard
            </span>

            <span className="h-px w-10 bg-[var(--green-accent)]/30" />
          </div>

          <h2 className="text-5xl tracking-tight text-foreground md:text-7xl font-['Cinzel']">
            Another side
            <span className="block text-foreground/25">of the journey.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-foreground/45 md:text-lg">
            Coding is a big part of what I do, but it isn't everything. When I'm
            away from the keyboard, these are some of the things that keep me
            moving.
          </p>
        </motion.div>

        {/* ============================================================
            CAROUSEL
            ============================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto mt-12 max-w-5xl"
        >
          {/* --------------------------------------------------------
              MAIN CAROUSEL
              -------------------------------------------------------- */}

          <div className="relative">
            {/* Progress trail */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--green-accent)]"
                />

                <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/30">
                  Personal trail
                </span>
              </div>

              <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/20">
                {activeActivity.number} /{" "}
                {String(activities.length).padStart(2, "0")}
              </span>
            </div>

            {/* Main panel */}
            <div
              className="
                relative overflow-hidden
                rounded-2xl
                border border-border
                bg-card/30
              "
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeActivity.number}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction * 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction * -40,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid md:grid-cols-[1.15fr_0.85fr]"
                  drag="x"
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) {
                      next();
                    }

                    if (info.offset.x > 60) {
                      previous();
                    }
                  }}
                >
                  {/* Image */}
                  <ActivityVisual activity={activeActivity} />

                  {/* Content */}
                  <div className="relative flex min-h-[320px] flex-col justify-between p-6 md:min-h-[400px] md:p-8">
                    {/* Background decoration */}
                    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--green-accent)]/[0.025] blur-3xl" />

                    <div className="relative">
                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--green-accent)]">
                        {activeActivity.eyebrow}
                      </p>

                      <h3 className="mt-3 text-4xl tracking-tight text-foreground md:text-5xl">
                        {activeActivity.title}
                      </h3>

                      <p className="mt-5 text-sm leading-6 text-foreground/50 md:text-base md:leading-7">
                        {activeActivity.description}
                      </p>
                    </div>

                    <div className="relative mt-7">
                      {/* Details */}
                      <div className="flex flex-wrap gap-2">
                        {activeActivity.details.map((detail) => (
                          <span
                            key={detail}
                            className="
                              rounded-full
                              border border-border
                              px-3 py-1.5
                              text-[9px]
                              uppercase
                              tracking-[0.12em]
                              text-foreground/35
                            "
                          >
                            {detail}
                          </span>
                        ))}
                      </div>

                      {/* Bottom metadata */}
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/20">
                          Outside the code
                        </span>

                        <span className="font-mono text-[9px] text-foreground/20">
                          {activeActivity.number}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ------------------------------------------------------
                CONTROLS
                ------------------------------------------------------ */}

            <div className="mt-4 flex items-center justify-between">
              {/* Activity navigation */}
              <div className="flex items-center gap-2">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={activity.number}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`View ${activity.title}`}
                      aria-current={isActive ? "true" : undefined}
                      className="
                        group flex items-center gap-2
                        rounded-full
                        px-2 py-2
                        transition-all duration-300
                      "
                    >
                      <span
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
                          isActive
                            ? "border-[var(--green-accent)]/40 bg-[var(--green-accent)]/[0.08]"
                            : "border-border bg-transparent group-hover:border-[var(--green-accent)]/20",
                        ].join(" ")}
                      >
                        <Icon
                          size={14}
                          strokeWidth={1.4}
                          className={
                            isActive
                              ? "text-[var(--green-accent)]"
                              : "text-foreground/25 group-hover:text-foreground/50"
                          }
                        />
                      </span>

                      <span
                        className={[
                          "hidden text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 sm:block",
                          isActive
                            ? "text-foreground/60"
                            : "text-foreground/20 group-hover:text-foreground/40",
                        ].join(" ")}
                      >
                        {activity.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Previous / next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous activity"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    border border-border
                    text-foreground/30
                    transition-all duration-300
                    hover:border-[var(--green-accent)]/30
                    hover:text-[var(--green-accent)]
                  "
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next activity"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    border border-border
                    text-foreground/30
                    transition-all duration-300
                    hover:border-[var(--green-accent)]/30
                    hover:text-[var(--green-accent)]
                  "
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* ------------------------------------------------------
                PROGRESS
                ------------------------------------------------------ */}

            <div className="mt-3 h-px w-full bg-border">
              <motion.div
                className="h-px bg-[var(--green-accent)]/50"
                animate={{
                  width: `${((activeIndex + 1) / activities.length) * 100}%`,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            CLOSING
            ============================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <div className="mx-auto mb-5 h-px w-16 bg-[var(--green-accent)]/30" />

          <div className="flex items-center justify-center gap-3 text-foreground/25">
            <Footprints size={14} />

            <span className="text-[9px] uppercase tracking-[0.25em]">
              Same curiosity, different roads
            </span>
          </div>

          <p className="mt-5 text-sm leading-7 text-foreground/35">
            Sometimes stepping away from the screen is part of the process too.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
