import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading frontend development for enterprise applications using React and Angular. Architecting scalable solutions and mentoring junior developers.',
    highlights: [
      'Improved app performance by 40%',
      'Led migration to React 18',
      'Mentored team of 5 developers',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2020 - 2022',
    description: 'Developed and maintained full-stack web applications using Node.js, Express, and React. Implemented CI/CD pipelines and cloud deployment strategies.',
    highlights: [
      'Built 15+ client projects',
      'Implemented automated testing',
      'Deployed to Google Cloud Platform',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Web Agency',
    period: '2018 - 2020',
    description: 'Created responsive web interfaces and interactive user experiences. Collaborated with designers to bring mockups to life with pixel-perfect precision.',
    highlights: [
      'Delivered 30+ responsive websites',
      'Optimized page load times by 50%',
      'Implemented modern CSS frameworks',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'StartUp Ventures',
    period: '2017 - 2018',
    description: 'Assisted in building MVP products and prototypes. Gained hands-on experience with various web technologies and agile development practices.',
    highlights: [
      'Contributed to 10+ projects',
      'Learned modern dev workflows',
      'Gained full-stack experience',
    ],
  },
];

export function ExperienceSection() {
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00D9FF]/50 to-transparent" />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-[#A78BFA]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] mx-auto rounded-full" />
          <p className="mt-6 text-lg text-[#F5F5F5]/60 max-w-2xl mx-auto">
            My professional journey in web development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D9FF]/50 via-[#A78BFA]/50 to-[#00D9FF]/50" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative grid md:grid-cols-2 gap-8 ${
                    isEven ? '' : 'md:grid-flow-dense'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`relative ${
                      isEven ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1A1F3A]/80 to-[#1A1F3A]/40 backdrop-blur-sm border border-[#00D9FF]/10 hover:border-[#00D9FF]/30 transition-all duration-300 group"
                    >
                      {/* Glassmorphism Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#A78BFA]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative">
                        {/* Period */}
                        <div className={`flex items-center gap-2 text-[#00D9FF] mb-3 ${
                          isEven ? 'md:justify-end' : ''
                        }`}>
                          <Calendar size={16} />
                          <span className="text-sm">{exp.period}</span>
                        </div>

                        {/* Role */}
                        <h3 className="text-xl md:text-2xl text-[#F5F5F5] mb-2">
                          {exp.role}
                        </h3>

                        {/* Company */}
                        <div className={`flex items-center gap-2 text-[#A78BFA] mb-4 ${
                          isEven ? 'md:justify-end' : ''
                        }`}>
                          <Briefcase size={16} />
                          <span className="text-sm md:text-base">{exp.company}</span>
                        </div>

                        {/* Description */}
                        <p className="text-[#F5F5F5]/70 mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        <ul className={`space-y-2 ${isEven ? 'md:text-right' : ''}`}>
                          {exp.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-sm text-[#F5F5F5]/60 flex items-start gap-2"
                            >
                              <span className={`text-[#00D9FF] ${isEven ? 'md:order-2' : ''}`}>
                                •
                              </span>
                              <span className={isEven ? 'md:order-1' : ''}>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Glow Effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D9FF]/0 to-[#A78BFA]/0 group-hover:from-[#00D9FF]/20 group-hover:to-[#A78BFA]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className={`hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 ${
                      isEven ? '' : ''
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                      className="relative"
                    >
                      {/* Outer Ring */}
                      <motion.div
                        className="w-6 h-6 rounded-full border-2 border-[#00D9FF] bg-[#0A0E27]"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(0, 217, 255, 0.4)',
                            '0 0 0 8px rgba(0, 217, 255, 0)',
                          ],
                        }}
                        transition={{
                          delay: index * 0.2 + 0.5,
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      {/* Inner Dot */}
                      <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A78BFA]" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
