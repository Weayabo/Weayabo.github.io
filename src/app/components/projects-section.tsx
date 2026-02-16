import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import careerlens from "@/assets/careerlens-project.png";
import als1 from "@/assets/als-project-1.png";
import als2 from "@/assets/als-project-2.png";
import als3 from "@/assets/als-project-3.png";

const alsImages = [als1, als2, als3];

const projects = [
  {
    title: "Careerlens",
    description:
      "A web application that recommend career base on family occupation and academic background, it also showcase job market trends",
    image: careerlens,
    tech: ["Angular", "Node.js", "MySQL", "GCP"],
    liveUrl: "https://careerlens-client-230445480118.asia-northeast1.run.app/homepage-page",
    githubUrl: "#",
  },
  {
    title: "Library Attendance System",
    description:
      "A software application that scan barcode based on student number when entering the premises of PSU library.",
    image: alsImages[Math.floor(Math.random() * alsImages.length)],
    tech: ["Neatbeans", "Java", "MySQL", "Xampp"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  isVisible: boolean;
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Glassmorphism Card */}
      <div className="relative h-full bg-gradient-to-br from-[#1A1F3A]/80 to-[#1A1F3A]/40 backdrop-blur-sm border border-[#00D9FF]/10 group-hover:border-[#00D9FF]/30 transition-all duration-300 overflow-hidden">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/20 via-[#A78BFA]/20 to-[#00D9FF]/20 animate-pulse" />
        </div>

        {/* Image Container with Parallax */}
        <div className="relative h-56 overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F3A] via-[#1A1F3A]/50 to-transparent" />

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 to-[#A78BFA]/20 backdrop-blur-sm flex items-center justify-center gap-4"
          >
            <motion.a
              href={project.liveUrl}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-[#00D9FF] text-[#0A0E27] rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] transition-shadow duration-300"
            >
              <ExternalLink size={20} />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-[#A78BFA] text-[#0A0E27] rounded-lg hover:shadow-[0_0_20px_rgba(167,139,250,0.6)] transition-shadow duration-300"
            >
              <Github size={20} />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          <h3 className="text-xl md:text-2xl text-[#F5F5F5] group-hover:text-[#00D9FF] transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-[#F5F5F5]/70 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: index * 0.1 + techIndex * 0.05,
                  duration: 0.3,
                }}
                className="px-3 py-1 text-xs md:text-sm bg-[#00D9FF]/10 text-[#00D9FF] rounded-full border border-[#00D9FF]/20 hover:bg-[#00D9FF]/20 hover:border-[#00D9FF]/40 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Card Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D9FF]/0 to-[#A78BFA]/0 group-hover:from-[#00D9FF]/20 group-hover:to-[#A78BFA]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A78BFA]/50 to-transparent" />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#00D9FF] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#A78BFA] to-[#00D9FF] mx-auto rounded-full" />
          <p className="mt-6 text-lg text-[#F5F5F5]/60 max-w-2xl mx-auto">
            A showcase of my recent work and technical capabilities
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            className="inline-block relative px-8 py-4 rounded-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#A78BFA]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#A78BFA] to-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-[#0A0E27] font-medium">
              View All Projects
            </span>
            <div className="absolute inset-0 shadow-[0_0_30px_rgba(0,217,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
