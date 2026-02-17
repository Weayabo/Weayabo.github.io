import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Code2,
  Database,
  Layout,
  Server,
  Cloud,
  GitBranch,
} from "lucide-react";
import logo from "@/assets/my-avatar.png";

const techStack = [
  { name: "Angular", icon: Code2, category: "Frontend" },
  { name: "React", icon: Code2, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express.js", icon: Server, category: "Backend" },
  { name: "PHP", icon: Server, category: "Backend" },
  { name: "Java", icon: Server, category: "Backend" },
  { name: "MySQL", icon: Database, category: "Database" },
  { name: "Docker", icon: Cloud, category: "DevOps" },
  { name: "Google Cloud", icon: Cloud, category: "DevOps" },
  { name: "GitHub", icon: GitBranch, category: "Tools" },
  { name: "Figma", icon: Layout, category: "Tools" },
  { name: "VS Code", icon: Code2, category: "Tools" },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl mb-4 inline-block">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar/Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent p-1"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-background rounded-2xl" />
              </motion.div>

              {/* Avatar Placeholder */}
              <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent rounded-2xl flex items-center justify-center overflow-hidden">
                <motion.div
                  className="text-primary/20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img src={logo} alt="Logo" className="w-200 h-150" />
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm a passionate Full-Stack Developer with a strong focus on
              Frontend Development. With expertise in modern web technologies, I
              create seamless user experiences that combine beautiful design
              with robust functionality.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              My journey in web development has equipped me with a diverse skill
              set spanning frontend frameworks like React and Angular, backend
              technologies including Node.js and PHP, and cloud infrastructure
              with Google Cloud Platform.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              I thrive on solving complex problems and continuously learning new
              technologies to deliver cutting-edge solutions that exceed
              expectations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { value: "1+", label: "Year Experience" },
                { value: "2", label: "Projects Completed" },
                { value: "100+", label: "Happy Clients" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="relative p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center group hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="text-2xl md:text-3xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-foreground/60">
                    {stat.label}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl text-center mb-12">
            <span className="text-foreground">Tech Stack</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="relative p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col items-center gap-3">
                  <tech.icon
                    className="text-primary group-hover:text-accent transition-colors duration-300"
                    size={32}
                  />
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {tech.name}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
