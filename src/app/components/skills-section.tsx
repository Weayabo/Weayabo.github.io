import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Tier = "core" | "comfortable" | "growing";

interface Skill {
  name: string;
  tier: Tier;
}

const skillCategories: { category: string; skills: Skill[] }[] = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML/CSS", tier: "core" },
      { name: "Angular.js", tier: "core" },
      { name: "JavaScript/TypeScript", tier: "core" },
      { name: "React", tier: "comfortable" },
      { name: "Tailwind CSS", tier: "growing" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Express.js", tier: "core" },
      { name: "Node.js", tier: "core" },
      { name: "REST APIs", tier: "comfortable" },
      { name: "PHP", tier: "comfortable" },
      { name: "Java", tier: "comfortable" },
    ],
  },
  {
    category: "Database & Tools",
    skills: [
      { name: "MySQL", tier: "core" },
      { name: "Git/GitHub", tier: "core" },
      { name: "VS Code", tier: "core" },
      { name: "Figma", tier: "comfortable" },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "Docker", tier: "core" },
      { name: "Vercel", tier: "core" },
      { name: "Google Cloud Run", tier: "comfortable" },
      { name: "CI/CD", tier: "growing" },
      { name: "Google Cloud", tier: "growing" },
    ],
  },
];

const currentlyExploring = [
  "System design",
  "Django",
  "Advanced TypeScript patterns",
  "AI/ML integration",
  "Serverless architecture",
  "GraphQL",
];

const tierStyles: Record<Tier, string> = {
  core: "border-2 text-background",
  comfortable: "border border-foreground/40 text-foreground bg-transparent",
  growing:
    "border border-dashed border-foreground/25 text-foreground/60 bg-transparent",
};

function SkillPill({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm ${tierStyles[skill.tier]}`}
      style={
        skill.tier === "core"
          ? { backgroundColor: "#4f8a5f", borderColor: "#4f8a5f" }
          : undefined
      }
    >
      {skill.name}
    </motion.span>
  );
}

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            Skills & Expertise
          </h2>
          <div className="h-1 w-24 bg-foreground mx-auto rounded-full" />
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
            Tools and technologies I work with, grouped by how deep that
            experience runs
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-14 text-sm text-foreground/60"
        >
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#4f8a5f" }}
            />
            Core 
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-foreground/40" />
            Comfortable
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-dashed border-foreground/25" />
            Growing
          </span>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="p-8 rounded-2xl border border-foreground/10 hover:border-foreground/25 transition-colors duration-300"
            >
              <h3 className="text-xl mb-5 text-foreground">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillPill
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently exploring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-foreground/50 mb-3">Currently exploring</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {currentlyExploring.map((item, i) => (
              <SkillPill
                key={item}
                skill={{ name: item, tier: "growing" }}
                delay={0.55 + i * 0.05}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}