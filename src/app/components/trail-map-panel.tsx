import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Crosshair } from "lucide-react";
import { useIdle } from "@/app/hooks/useIdle";

type TrailNode = {
  id: string;
  label: string;
  shortLabel: string;
  x: number;
  y: number;
};

/*
 * The coordinates are intentionally kept inside the circle.
 * This gives the map the same breathing room as your reference image.
 */
const trailNodes: TrailNode[] = [
  {
    id: "home",
    label: "Trailhead",
    shortLabel: "01",
    x: 20,
    y: 68,
  },
  {
    id: "about",
    label: "The Path",
    shortLabel: "02",
    x: 38,
    y: 20,
  },
  {
    id: "projects",
    label: "Waypoints",
    shortLabel: "03",
    x: 55,
    y: 58,
  },
  {
    id: "beyond-coding",
    label: "Sidequest",
    shortLabel: "04",
    x: 72,
    y: 32,
  },
  {
    id: "contact",
    label: "Signal",
    shortLabel: "05",
    x: 80,
    y: 68,
  },
];

const sectionAliases: Record<string, string[]> = {
  home: ["home"],
  about: ["about"],
  projects: ["projects"],
  "beyond-coding": ["beyond-coding"],
  contact: ["contact"],
};

export function TrailMapPanel() {
  const [activeSection, setActiveSection] = useState("home");
  const isIdle = useIdle(10_000);

  /*
   * Detect the section currently closest to the viewport center.
   */
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45;

      let closestId = "home";
      let closestDistance = Infinity;

      trailNodes.forEach((node) => {
        const aliases = sectionAliases[node.id] ?? [node.id];

        for (const id of aliases) {
          const element = document.getElementById(id);

          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;

          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestId = node.id;
          }
        }
      });

      setActiveSection(closestId);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        trailNodes.findIndex((node) => node.id === activeSection),
      ),
    [activeSection],
  );

  /*
   * Irregular trail.
   *
   * Notice that the route now follows the same general composition
   * as your reference image:
   *
   * 01 → upper-left → 02 → dip → 03 → climb → 04 → dip → 05
   */
  const routePath = `
  M 20 68
  C 26 62, 32 38, 38 20
  C 44 27, 49 51, 55 58
  C 61 65, 67 39, 72 32
  C 77 28, 78 58, 80 68
`;

  const scrollToNode = (node: TrailNode) => {
    const aliases = sectionAliases[node.id] ?? [node.id];

    for (const id of aliases) {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        break;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: -10 }}
      animate={{
        opacity: isIdle ? 0 : 1,
        x: isIdle ? -12 : 0,
        y: 0,
      }}
      transition={{
        duration: isIdle ? 0.5 : 0.8,
        delay: isIdle ? 0 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        fixed
        left-5
        top-24
        z-40
        hidden
        lg:block
        w-[clamp(180px,14vw,280px)]
        aspect-square
        ${isIdle ? "pointer-events-none" : ""}
      `}
    >
      {/* =========================================================
          CIRCULAR MAP
         ========================================================= */}

      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-full

          border
          border-[var(--green-accent)]/15

          bg-background/80

          shadow-[0_10px_40px_rgba(0,0,0,0.25)]

          backdrop-blur-md
        "
      >
        {/* =======================================================
            MAP GRID
           ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.055]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--green-accent) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--green-accent) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "28px 28px",
          }}
        />

        {/* =======================================================
            TERRAIN / TOPOGRAPHIC RINGS
           ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -left-10
            -top-10
            h-32
            w-32
            rounded-full
            border
            border-[var(--green-accent)]/[0.045]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-5
            top-0
            h-24
            w-24
            rounded-full
            border
            border-[var(--green-accent)]/[0.035]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-45px]
            bottom-[-40px]
            h-36
            w-36
            rounded-full
            border
            border-[var(--green-accent)]/[0.045]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-20px]
            bottom-[-10px]
            h-24
            w-24
            rounded-full
            border
            border-[var(--green-accent)]/[0.035]
          "
        />

        {/* =======================================================
            TRAIL SVG
           ======================================================= */}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        >
          {/* -----------------------------------------------------
              Faint unexplored route
             ----------------------------------------------------- */}

          <path
            d={routePath}
            fill="none"
            stroke="var(--green-accent)"
            strokeOpacity="0.10"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* -----------------------------------------------------
              Completed route
             ----------------------------------------------------- */}

          <motion.path
            d={routePath}
            fill="none"
            stroke="var(--green-accent)"
            strokeWidth="1.2"
            strokeLinecap="round"
            pathLength={1}
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: Math.min(
                1,
                activeIndex / (trailNodes.length - 1) + 0.04,
              ),
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />

          {/* =====================================================
    TRAVELER / USER POSITION
   ===================================================== */}

          {(() => {
            const current = trailNodes[activeIndex];
            const next =
              trailNodes[Math.min(activeIndex + 1, trailNodes.length - 1)];

            const dx = next.x - current.x;
            const dy = next.y - current.y;

            const angle =
              activeIndex === trailNodes.length - 1
                ? Math.atan2(
                    current.y - trailNodes[Math.max(0, activeIndex - 1)].y,
                    current.x - trailNodes[Math.max(0, activeIndex - 1)].x,
                  ) *
                  (180 / Math.PI)
                : Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <motion.g
                initial={false}
                animate={{
                  x: current.x,
                  y: current.y,
                  rotate: angle + 90,
                }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Glow */}

                <circle
                  r="5"
                  fill="var(--green-accent)"
                  opacity="0.16"
                  filter="blur(2px)"
                />

                {/* Arrow */}

                <path
                  d="
                  M 0 -4
                  L 3 3
                  L 0 1.5
                  L -3 3
                  Z
                "
                  fill="var(--green-bright)"
                  stroke="var(--green-accent)"
                  strokeWidth="0.7"
                  strokeLinejoin="round"
                />
              </motion.g>
            );
          })()}

          {/* Traveler glow */}

          <motion.circle
            r="5"
            fill="var(--green-accent)"
            opacity="0.16"
            filter="blur(2px)"
            initial={{
              cx: trailNodes[0].x,
              cy: trailNodes[0].y,
            }}
            animate={{
              cx: trailNodes[activeIndex].x,
              cy: trailNodes[activeIndex].y,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        {/* =======================================================
            WAYPOINTS
           ======================================================= */}

        {trailNodes.map((node, index) => {
          const isActive = node.id === activeSection;
          const isVisited = index <= activeIndex;

          return (
            <button
              key={node.id}
              onClick={() => scrollToNode(node)}
              className="
                absolute
                -translate-x-1/2
                -translate-y-1/2
                cursor-pointer
              "
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              aria-label={`Go to ${node.label}`}
            >
              {/* Active pulse */}

              {isActive && (
                <motion.div
                  className="
                    absolute
                    inset-[-7px]
                    rounded-full
                    border
                    border-[var(--green-accent)]/30
                  "
                  animate={{
                    scale: [0.8, 1.25, 0.8],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Node */}

              <motion.div
                whileHover={{
                  scale: 1.25,
                }}
                className={`
                  relative
                  flex
                  h-3
                  w-3
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        border-[var(--green-bright)]
                        bg-[var(--green-bright)]
                        shadow-[0_0_12px_rgba(111,191,122,0.65)]
                      `
                      : isVisited
                        ? `
                          border-[var(--green-accent)]/70
                          bg-[var(--green-accent)]/40
                        `
                        : `
                          border-foreground/20
                          bg-background
                        `
                  }
                `}
              />

              {/* Number */}

              <span
                className={`
                  pointer-events-none
                  absolute
                  top-4
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap

                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.18em]

                  transition-colors
                  duration-300

                  ${
                    isActive
                      ? "text-[var(--green-accent)]"
                      : "text-foreground/20"
                  }
                `}
              >
                {node.shortLabel}
              </span>
            </button>
          );
        })}

        {/* =======================================================
            NORTH INDICATOR
           ======================================================= */}

        <div
          className="
            absolute
            bottom-[11%]
            right-[20%]
            flex
            items-center
            gap-1
            opacity-30
          "
        >
          <Crosshair size={10} />

          <span
            className="
              font-mono
              text-[6px]
              tracking-wider
            "
          >
            NORTH
          </span>
        </div>
      </div>
    </motion.div>
  );
}
