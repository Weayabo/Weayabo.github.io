import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const INTRO_KEY = "remus-intro-seen";

export function IntroLoader() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return false;

    return sessionStorage.getItem(INTRO_KEY) !== "true";
  });

  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const stage1 = setTimeout(() => {
      setStage(1);
    }, 400);

    const stage2 = setTimeout(() => {
      setStage(2);
    }, 900);

    const stage3 = setTimeout(() => {
      setStage(3);
    }, 1300);

    const finish = setTimeout(() => {
      sessionStorage.setItem(INTRO_KEY, "true");
      setIsLoading(false);
    }, 1800);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(finish);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background"
        >
          {/* Atmospheric glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--green-accent)]/[0.025] blur-3xl" />

          {/* Route line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full origin-left bg-[var(--green-accent)]/50"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-['Cinzel'] text-4xl tracking-tight text-foreground"
            >
              REMUS
              <span className="ml-1 text-[var(--green-accent)]">●</span>
            </motion.div>

            {/* Waypoint */}
            <div className="relative my-10 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--green-accent)]/30 bg-background">
              <motion.div
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [1, 0.2, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-2.5 w-2.5 rounded-full bg-[var(--green-accent)]"
              />

              <motion.div
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-3 rounded-full border border-[var(--green-accent)]/30"
              />
            </div>

            {/* Status */}
            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stage}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="text-[9px] uppercase tracking-[0.3em] text-[var(--green-accent)]"
                >
                  {stage === 0 && "Initializing route"}
                  {stage === 1 && "Checking waypoints"}
                  {stage === 2 && "Route ready"}
                  {stage >= 3 && "Begin the journey"}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="mt-5 flex items-center gap-3">
              <span className="font-mono text-[8px] tracking-[0.2em] text-foreground/20">
                01
              </span>

              <div className="h-px w-20 bg-border">
                <motion.div
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                  }}
                  className="h-full bg-[var(--green-accent)]/60"
                />
              </div>

              <span className="font-mono text-[8px] tracking-[0.2em] text-foreground/20">
                01
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="absolute bottom-8 left-8 text-[8px] uppercase tracking-[0.25em] text-foreground/15">
            Personal portfolio
          </div>

          <div className="absolute bottom-8 right-8 font-mono text-[8px] tracking-[0.2em] text-foreground/15">
            EST. 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
