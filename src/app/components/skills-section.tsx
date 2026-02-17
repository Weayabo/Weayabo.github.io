import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML/CSS', level: 98 },
      { name: 'Angular.js', level: 95 },
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'React', level: 70 },
      { name: 'Tailwind CSS', level: 60 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'REST APIs', level: 90 },
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 75 },
      { name: 'PHP', level: 70 },
      { name: 'Java', level: 65 },
    ],
  },
  {
    category: 'Database & Tools',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'Git/GitHub', level: 92 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 88 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Google Cloud Run', level: 75 },
      { name: 'CI/CD', level: 70 },
      { name: 'Google Cloud', level: 60 },
    ],
  },
];

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

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
              Skills & Expertise
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="mt-6 text-lg text-foreground/100 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/80 to-accent/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
                {/* Glassmorphism Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Title */}
                <h3 className="text-xl md:text-2xl mb-6 text-foreground relative">
                  {category.category}
                </h3>

                {/* Skills */}
                <div className="space-y-5 relative">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm md:text-base text-foreground/80">
                          {skill.name}
                        </span>
                        <span className="text-sm text-accent">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar Background */}
                      <div className="h-2 bg-foreground/20 rounded-full overflow-hidden">
                        {/* Progress Bar Fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : {}}
                          transition={{
                            delay: categoryIndex * 0.15 + skillIndex * 0.1,
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative overflow-hidden"
                        >
                          {/* Shimmer Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              delay: categoryIndex * 0.15 + skillIndex * 0.1 + 1,
                              duration: 1.5,
                              ease: 'easeInOut',
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Circular Skill Indicators (Alternative Visual) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl text-center mb-12 text-[#F5F5F5]">
            Core Competencies
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              { name: 'Angular.js', percentage: 90, color: '#00D9FF' },
              { name: 'Node.js', percentage: 80, color: '#A78BFA' },
              { name: 'TypeScript', percentage: 80, color: '#00D9FF' },
              { name: 'UI/UX', percentage: 75, color: '#A78BFA' },
              { name: 'DevOps', percentage: 75, color: '#00D9FF' },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center group"
              >
                {/* Circular Progress */}
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgba(117, 117, 117, 0.53)"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke={skill.color}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 251.2' }}
                      animate={
                        isVisible
                          ? {
                              strokeDasharray: `${(skill.percentage / 100) * 251.2} 251.2`,
                            }
                          : {}
                      }
                      transition={{
                        delay: 0.9 + index * 0.1,
                        duration: 1.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </svg>
                  {/* Percentage Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
                
                {/* Skill Name */}
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
