import { useId } from "react";

const SYNODIC_MONTH = 29.53058867;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);

const PHASE_NAMES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
];

function getMoonPhase(date: Date = new Date()) {
  const diffDays =
    (date.getTime() - KNOWN_NEW_MOON) / 86400000;

  const raw =
    (diffDays % SYNODIC_MONTH) / SYNODIC_MONTH;

  const phase = raw < 0 ? raw + 1 : raw;

  const illumination =
    (1 - Math.cos(phase * 2 * Math.PI)) / 2;

  const isWaxing = phase < 0.5;

  const nameIndex =
    Math.round(phase * 8) % 8;

  return {
    phase,
    illumination,
    isWaxing,
    name: PHASE_NAMES[nameIndex],
  };
}

export function MoonPhase({ size = 14 }: { size?: number }) {
  const { phase, illumination, name } = getMoonPhase();

  const maskId = useId();
  const gradientId = useId();
  const glowId = useId();

  /*
   * Controls the illuminated portion of the moon.
   *
   * 0       = New Moon
   * 0.25    = First Quarter
   * 0.5     = Full Moon
   * 0.75    = Last Quarter
   */
  const shadowOffset =
    Math.cos(phase * 2 * Math.PI) * 9;

  return (
    <span
      title={name}
      aria-label={`Current moon phase: ${name}`}
      className="
        inline-flex
        shrink-0
        align-middle
        opacity-80
        transition-opacity
        duration-500
        hover:opacity-100
      "
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          {/* --------------------------------------------------
              Lunar surface
             -------------------------------------------------- */}

          <radialGradient
            id={gradientId}
            cx="35%"
            cy="30%"
            r="75%"
          >
            <stop
              offset="0%"
              stopColor="var(--green-bright)"
            />

            <stop
              offset="55%"
              stopColor="var(--green-accent)"
            />

            <stop
              offset="100%"
              stopColor="#315b3c"
            />
          </radialGradient>

          {/* --------------------------------------------------
              Soft atmospheric glow
             -------------------------------------------------- */}

          <filter
            id={glowId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              stdDeviation="0.8"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* --------------------------------------------------
              Moon phase mask
             -------------------------------------------------- */}

          <mask id={maskId}>
            <rect
              width="24"
              height="24"
              fill="black"
            />

            {/* Moon disk */}
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="white"
            />

            {/* Lunar shadow */}
            <ellipse
              cx={12 + shadowOffset}
              cy="12"
              rx="9"
              ry="9"
              fill="black"
            />
          </mask>
        </defs>

        {/* ==================================================
            DARK MOON BODY
           ================================================== */}

        <circle
          cx="12"
          cy="12"
          r="9"
          fill="#17241b"
          opacity="0.9"
        />

        {/* ==================================================
            ILLUMINATED MOON
           ================================================== */}

        <circle
          cx="12"
          cy="12"
          r="9"
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
          filter={`url(#${glowId})`}
        />

        {/* ==================================================
            CRATERS
           ================================================== */}

        <g
          mask={`url(#${maskId})`}
          fill="none"
          stroke="rgba(10,30,18,0.25)"
        >
          <circle
            cx="8"
            cy="8"
            r="1.4"
            strokeWidth="0.45"
          />

          <circle
            cx="15.5"
            cy="7"
            r="1"
            strokeWidth="0.35"
          />

          <circle
            cx="16"
            cy="15"
            r="1.6"
            strokeWidth="0.45"
          />

          <circle
            cx="8"
            cy="16"
            r="0.8"
            strokeWidth="0.3"
          />

          <circle
            cx="12"
            cy="12"
            r="0.6"
            strokeWidth="0.25"
          />
        </g>

        {/* ==================================================
            SUBTLE MOON EDGE
           ================================================== */}

        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="var(--green-bright)"
          strokeWidth="0.35"
          opacity="0.5"
        />
      </svg>
    </span>
  );
}