import { motion } from "motion/react";
import {
  ArrowUp,
  Compass,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Beyond Coding", href: "#beyond-coding" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Weayabo",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/remus-zamora-507768374/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/re.myths/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/remuszamora",
    icon: Facebook,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* ============================================================
          ATMOSPHERE
          ============================================================ */}

      <div className="pointer-events-none absolute inset-0">
        {/* Top transition */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />

        {/* Subtle green atmosphere */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--green-accent)]/[0.015] blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Topographic lines */}
        <svg
          className="absolute -right-[15%] top-[5%] h-[700px] w-[700px] opacity-[0.025]"
          viewBox="0 0 700 700"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="350"
            cy="350"
            rx="320"
            ry="245"
            stroke="var(--green-accent)"
          />

          <ellipse
            cx="350"
            cy="350"
            rx="260"
            ry="195"
            stroke="var(--green-accent)"
          />

          <ellipse
            cx="350"
            cy="350"
            rx="200"
            ry="150"
            stroke="var(--green-accent)"
          />

          <ellipse
            cx="350"
            cy="350"
            rx="140"
            ry="105"
            stroke="var(--green-accent)"
          />

          <ellipse
            cx="350"
            cy="350"
            rx="80"
            ry="60"
            stroke="var(--green-accent)"
          />
        </svg>
      </div>

      {/* ============================================================
          MAIN FOOTER
          ============================================================ */}

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        {/* ============================================================
            END OF TRAIL
            ============================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green-accent)]/25" />

            <span className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.3em] text-[var(--green-accent)]">
              <Compass
                size={12}
                strokeWidth={1.3}
              />
              End of the trail
            </span>

            <span className="h-px w-12 bg-[var(--green-accent)]/25" />
          </div>

          <h2 className="font-['Cinzel'] text-3xl tracking-tight text-foreground md:text-4xl">
            Until the next journey.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-foreground/30">
            Thanks for taking the time to explore my little corner of the
            internet.
          </p>
        </motion.div>

        {/* ============================================================
            NAVIGATION GRID
            ============================================================ */}

        <div className="grid gap-12 border-y border-border py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* ----------------------------------------------------------
              BRAND
              ---------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <a
              href="#home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--green-accent)]/25 transition-colors duration-300 group-hover:border-[var(--green-accent)]/50">
                <span className="h-2 w-2 rounded-full bg-[var(--green-accent)]" />
              </span>

              <span className="font-['Cinzel'] text-lg tracking-[0.12em] text-foreground">
                REMUS
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-foreground/30">
              Developer, builder, cyclist, gamer, and someone who is always
              curious about what lies beyond the next turn.
            </p>
          </motion.div>

          {/* ----------------------------------------------------------
              NAVIGATION
              ---------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
              duration: 0.6,
            }}
          >
            <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-foreground/25">
              Navigate
            </p>

            <nav className="space-y-3">
              {navigation.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-foreground/40 transition-colors duration-300 hover:text-foreground"
                >
                  <span className="h-px w-0 bg-[var(--green-accent)] transition-all duration-300 group-hover:w-3" />

                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ----------------------------------------------------------
              SOCIAL
              ---------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
          >
            <p className="mb-5 text-[9px] uppercase tracking-[0.25em] text-foreground/25">
              Find me elsewhere
            </p>

            <div className="space-y-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit items-center gap-3 text-sm text-foreground/40 transition-colors duration-300 hover:text-foreground"
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.4}
                      className="text-foreground/25 transition-colors duration-300 group-hover:text-[var(--green-accent)]"
                    />

                    {social.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            BOTTOM BAR
            ============================================================ */}

        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="text-[9px] uppercase tracking-[0.18em] text-foreground/20"
          >
            © {currentYear} Remus Zamora
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-foreground/20"
          >
            <span>Built with curiosity</span>

            <span className="h-1 w-1 rounded-full bg-[var(--green-accent)]/50" />

            <span>Always exploring</span>
          </motion.div>

          {/* Return to beginning */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              group
              flex items-center gap-3
              rounded-full
              border border-border
              px-4 py-2.5
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-foreground/30
              transition-all duration-300
              hover:border-[var(--green-accent)]/30
              hover:text-[var(--green-accent)]
            "
            aria-label="Return to top"
          >
            <ArrowUp
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            Return to beginning
          </motion.button>
        </div>
      </div>

      {/* ============================================================
          ROUTE MARKER
          ============================================================ */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="relative h-8 w-px bg-gradient-to-b from-[var(--green-accent)]/30 to-transparent">
          <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--green-accent)]/50" />
        </div>
      </motion.div>
    </footer>
  );
}