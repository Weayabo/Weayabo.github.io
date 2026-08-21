import { motion } from "motion/react";

export function MountainAmbient() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* =========================================================
          ATMOSPHERIC GLOW
         ========================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_50%_15%,
            var(--green-accent)/[0.055],
            transparent_45%
          )]
        "
      />

      {/* =========================================================
          DISTANT MOUNTAINS
         ========================================================= */}

      <motion.svg
        className="
          absolute
          bottom-0
          left-0
          h-[55%]
          w-[140%]
          opacity-[0.025]
        "
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        animate={{
          x: ["0%", "-6%"],
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <path
          d="
            M0 390
            L100 330
            L180 370
            L280 280
            L370 350
            L470 250
            L560 340
            L660 270
            L750 350
            L850 240
            L950 330
            L1060 260
            L1160 340
            L1280 250
            L1380 320
            L1440 280
            V500
            H0
            Z
          "
          fill="var(--green-accent)"
        />
      </motion.svg>

      {/* =========================================================
          MIDDLE MOUNTAINS
         ========================================================= */}

      <motion.svg
        className="
          absolute
          bottom-0
          left-0
          h-[43%]
          w-[125%]
          opacity-[0.045]
        "
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        animate={{
          x: ["0%", "-3%"],
        }}
        transition={{
          duration: 65,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <path
          d="
            M0 330
            L140 220
            L240 300
            L360 170
            L470 290
            L600 190
            L720 300
            L850 160
            L970 280
            L1100 180
            L1230 270
            L1350 150
            L1440 230
            V400
            H0
            Z
          "
          fill="var(--green-accent)"
        />
      </motion.svg>

      {/* =========================================================
          NEAR MOUNTAINS
         ========================================================= */}

      <motion.svg
        className="
          absolute
          bottom-0
          left-0
          h-[34%]
          w-[115%]
          opacity-[0.065]
        "
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        animate={{
          x: ["0%", "-2%"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <path
          d="
            M0 270
            L120 180
            L230 245
            L350 140
            L470 230
            L590 155
            L720 250
            L840 130
            L960 225
            L1090 145
            L1210 235
            L1330 125
            L1440 200
            V320
            H0
            Z
          "
          fill="var(--green-accent)"
        />
      </motion.svg>

      {/* =========================================================
          FOREGROUND TERRAIN
         ========================================================= */}

      <svg
        className="
          absolute
          bottom-0
          left-0
          h-[25%]
          w-full
          opacity-[0.075]
        "
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
      >
        <path
          d="
            M0 190
            C130 150 230 205 350 165
            C470 125 550 190 670 150
            C800 110 900 175 1010 135
            C1140 95 1280 160 1440 110
            V250
            H0
            Z
          "
          fill="var(--green-accent)"
        />
      </svg>

      {/* =========================================================
          SUBTLE ATMOSPHERIC PARTICLES
         ========================================================= */}

      <motion.div
        className="
          absolute
          left-[18%]
          top-[24%]
          h-1
          w-1
          rounded-full
          bg-[var(--green-accent)]/20
        "
        animate={{
          opacity: [0.15, 0.4, 0.15],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          left-[72%]
          top-[18%]
          h-1
          w-1
          rounded-full
          bg-[var(--green-accent)]/15
        "
        animate={{
          opacity: [0.1, 0.35, 0.1],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          left-[82%]
          top-[38%]
          h-0.5
          w-0.5
          rounded-full
          bg-[var(--green-accent)]/20
        "
        animate={{
          opacity: [0.1, 0.3, 0.1],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}