import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Compass,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";

type ContactRoute = {
  label: string;
  value: string;
  href: string;
  icon: typeof Mail;
};

const contactRoutes: ContactRoute[] = [
  {
    label: "Email",
    value: "remuszamora@gmail.com",
    href: "mailto:remuszamora@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "Weayabo",
    href: "https://github.com/Weayabo",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Remus Zamora",
    href: "https://www.linkedin.com/in/remus-zamora-507768374/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "@re.myths",
    href: "https://www.instagram.com/re.myths/",
    icon: Instagram,
  },
];

const contourLines = [
  {
    cx: "50%",
    cy: "50%",
    rx: "44%",
    ry: "38%",
  },
  {
    cx: "50%",
    cy: "50%",
    rx: "36%",
    ry: "31%",
  },
  {
    cx: "50%",
    cy: "50%",
    rx: "28%",
    ry: "24%",
  },
  {
    cx: "50%",
    cy: "50%",
    rx: "20%",
    ry: "17%",
  },
  {
    cx: "50%",
    cy: "50%",
    rx: "12%",
    ry: "10%",
  },
];

function WaypointVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Outer atmosphere */}
      <motion.div
        className="absolute inset-[12%] rounded-full bg-[var(--green-accent)]/[0.025] blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Topographic rings */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {contourLines.map((line, index) => (
          <ellipse
            key={index}
            cx={line.cx}
            cy={line.cy}
            rx={line.rx}
            ry={line.ry}
            stroke="var(--green-accent)"
            strokeOpacity={0.06 + index * 0.01}
            strokeWidth="1"
          />
        ))}

        {/* Route */}
        <motion.path
          d="
            M 55 395
            C 105 350, 105 280, 165 290
            C 220 300, 210 365, 275 350
            C 335 336, 310 245, 365 215
            C 400 196, 420 170, 445 105
          "
          stroke="var(--green-accent)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />

        {/* Small route branches */}
        <path
          d="M 165 290 C 135 250, 150 210, 125 170"
          stroke="var(--green-accent)"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="3 8"
        />

        <path
          d="M 275 350 C 300 380, 350 395, 375 430"
          stroke="var(--green-accent)"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
      </svg>

      {/* Start point */}
      <div className="absolute bottom-[18%] left-[9%]">
        <div className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="absolute left-4 top-[-4px] whitespace-nowrap text-[8px] uppercase tracking-[0.2em] text-foreground/20">
          Start
        </span>
      </div>

      {/* Destination */}
      <div className="absolute right-[8%] top-[15%]">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-3 rounded-full border border-[var(--green-accent)]/20"
        />

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--green-accent)]/40 bg-background">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--green-accent)]" />
        </div>

        <span className="absolute left-10 top-1 whitespace-nowrap text-[8px] uppercase tracking-[0.2em] text-[var(--green-accent)]/60">
          You are here
        </span>
      </div>

      {/* Compass */}
      <motion.div
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm">
          <Compass
            size={34}
            strokeWidth={1}
            className="text-[var(--green-accent)]/50"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const res = await fetch("https://formspree.io/f/xnjbvqel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage("Your message has reached the trail.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("The message couldn't be sent. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      {/* ============================================================
          ATMOSPHERE
          ============================================================ */}

      <div className="pointer-events-none absolute inset-0">
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />

        {/* Central atmosphere */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--green-accent)]/[0.018] blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fine horizontal lines */}
        <div className="absolute left-0 top-[20%] h-px w-full bg-gradient-to-r from-transparent via-[var(--green-accent)]/[0.05] to-transparent" />

        <div className="absolute left-0 top-[80%] h-px w-full bg-gradient-to-r from-transparent via-[var(--green-accent)]/[0.05] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-10">
        {/* ============================================================
            INTRO
            ============================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--green-accent)]/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--green-accent)] font-['Cinzel']">
              Final waypoint
            </span>

            <span className="h-px w-10 bg-[var(--green-accent)]/30" />
          </div>

          <h2 className="font-['Cinzel'] text-5xl tracking-tight text-foreground md:text-7xl">
            The road doesn't
            <span className="block text-foreground/25">have to end here.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-foreground/45 md:text-lg">
            If you've made it this far, perhaps our paths are meant to cross.
            Have an opportunity, a project, or simply something worth talking
            about? Send a message.
          </p>
        </motion.div>

        {/* ============================================================
            MAIN CONTACT AREA
            ============================================================ */}

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ----------------------------------------------------------
              WAYPOINT
              ---------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <WaypointVisual />

            {/* Contact routes */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {contactRoutes.map((route, index) => {
                const Icon = route.icon;

                return (
                  <motion.a
                    key={route.label}
                    href={route.href}
                    target={
                      route.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      route.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={
                      isVisible
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{
                      delay: 0.35 + index * 0.08,
                      duration: 0.5,
                    }}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card/20 p-3 transition-all duration-300 hover:border-[var(--green-accent)]/25 hover:bg-[var(--green-accent)]/[0.03]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border">
                      <Icon
                        size={15}
                        strokeWidth={1.4}
                        className="text-foreground/35 transition-colors group-hover:text-[var(--green-accent)]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/25">
                        {route.label}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-foreground/55">
                        {route.value}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={12}
                      className="ml-auto shrink-0 text-foreground/15 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--green-accent)]"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ----------------------------------------------------------
              MESSAGE FORM
              ---------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/20">
              {/* Form header */}
              <div className="border-b border-border px-6 py-5 md:px-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={13}
                        strokeWidth={1.5}
                        className="text-[var(--green-accent)]"
                      />

                      <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--green-accent)]">
                        Send a signal
                      </span>
                    </div>

                    <h3 className="mt-2 font-['Cinzel'] text-2xl text-foreground md:text-3xl">
                      Start a conversation
                    </h3>
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/15">
                    01 / 01
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>

                <Field
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What are we talking about?"
                />

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-foreground/30"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me a little about it..."
                    className="
                      w-full resize-none rounded-xl
                      border border-border
                      bg-background/40
                      px-4 py-3.5
                      text-sm text-foreground
                      placeholder:text-foreground/20
                      outline-none
                      transition-all duration-300
                      focus:border-[var(--green-accent)]/40
                      focus:bg-[var(--green-accent)]/[0.015]
                    "
                  />
                </div>

                <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-foreground/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--green-accent)]" />

                    <span className="text-[9px] uppercase tracking-[0.18em]">
                      Open to opportunities
                    </span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            y: -2,
                          }
                        : {}
                    }
                    whileTap={
                      !isSubmitting
                        ? {
                            scale: 0.98,
                          }
                        : {}
                    }
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-xl
                      bg-[var(--green-accent)]
                      px-6 py-3
                      text-sm font-medium
                      text-white
                      transition-all duration-300
                      hover:bg-[var(--green-bright)]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                        />
                        Sending
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </motion.button>
                </div>

                {statusMessage && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-center gap-2 text-xs text-[var(--green-bright)]"
                  >
                    <Check size={14} />
                    {statusMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FIELD
   ================================================================ */

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-foreground/30"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="
          w-full rounded-xl
          border border-border
          bg-background/40
          px-4 py-3.5
          text-sm text-foreground
          placeholder:text-foreground/20
          outline-none
          transition-all duration-300
          focus:border-[var(--green-accent)]/40
          focus:bg-[var(--green-accent)]/[0.015]
        "
      />
    </div>
  );
}
