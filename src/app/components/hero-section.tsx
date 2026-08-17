import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { ParticleBackground } from "./particle-background";
import Resume from "@/assets/pdf_CV/Remus_Kinilitan_CV.pdf";

export function HeroSection() {
  const handleScrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const roles = [
    "Fullstack",
    "Frontend Engineer",
    "Backend ",
    "Web ",
    "UI/UX ",
    "Angular ",
    "React ",
    "Node.js ",
    "Python ",
    "Django ",
    "REST API ",
    "Database ",
    "CI/CD ",
    "Figma Designer",
    "Responsive Dev",
    "Software ",
    "Open Source Contributor",
  ];

  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[wordIndex];
    const delay = deleting ? 80 : charIndex === current.length ? 1400 : 200;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) setDeleting(true);
        else setCharIndex((c) => c + 1);
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % roles.length);
          setCharIndex(0);
        } else setCharIndex((c) => c - 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary">
        <div
          className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div> */}

      {/* Particle Background */}
      {/* <ParticleBackground /> */}

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/20 rounded-lg"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-accent/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-foreground bg-clip-text text-transparent">
              Remus Kinilitan
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl text-accent/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="text-[#4a90d9] border-r-2 border-[#4a90d9] pr-0.5 animate-pulse">
              {displayed}
            </span>
            <span className="text-primary">|</span>{" "}
            <span className="bg-foreground bg-clip-text text-transparent">
              Software Engineer
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/100 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I craft exceptional digital experiences with modern web
            technologies. Specializing in building responsive, high-performance
            applications that users love.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="relative px-8 py-4 rounded-lg bg-foreground text-background text-sm font-medium border border-white/10 hover:bg-white hover:text-black transition-colors duration-200 overflow-hidden group w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Me</span>
            </motion.a>

            <motion.a
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-4 rounded-lg border-accent text-foreground text-sm font-medium border hover:bg-white hover:text-black transition-colors duration-200 group w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative font-medium">View Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/Weayabo",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/remus-zamora-507768374/",
                label: "LinkedIn",
              },
              { icon: Mail, href: "#contact", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 text-foreground/100 hover:text-primary transition-colors duration-300 relative group"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
              >
                <social.icon size={24} />
                <div className="absolute inset-0 bg-primary/100 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary cursor-pointer group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={32} />
        </motion.div>
        <div className="absolute inset-0 bg-[#00D9FF]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </section>
  );
}
