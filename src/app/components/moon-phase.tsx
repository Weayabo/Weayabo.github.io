// Tiny, quiet lunar-phase mark. Computes the real current moon phase —
// no library, just the synodic month against a known new moon reference.
// Meant to be barely noticeable: a detail for anyone who looks closely,
// not a banner for anyone who doesn't.

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
  const diffDays = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  const raw = (diffDays % SYNODIC_MONTH) / SYNODIC_MONTH;
  const k = raw < 0 ? raw + 1 : raw; // 0 = new, 0.5 = full, 1 = new again

  const illumination = (1 - Math.cos(k * 2 * Math.PI)) / 2; // 0..1 lit fraction
  const isWaxing = k < 0.5;
  const nameIndex = Math.round(k * 8) % 8;

  return {
    illumination,
    isWaxing,
    name: PHASE_NAMES[nameIndex],
  };
}

export function MoonPhase({ size = 12 }: { size?: number }) {
  const { illumination, isWaxing, name } = getMoonPhase();
  const shadowWidth = (1 - illumination) * 100;

  return (
    <span
      title={name}
      aria-label={`Current moon phase: ${name}`}
      className="relative inline-block align-middle opacity-40 hover:opacity-90 transition-opacity duration-500"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--green-bright)",
        overflow: "hidden",
      }}
    >
      <span
        className="absolute top-0 h-full"
        style={{
          width: `${shadowWidth}%`,
          left: isWaxing ? 0 : "auto",
          right: isWaxing ? "auto" : 0,
          background: "var(--background)",
          borderRadius: "50%",
        }}
      />
    </span>
  );
}