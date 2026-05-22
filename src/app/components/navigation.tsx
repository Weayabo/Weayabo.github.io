import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, Moon } from "lucide-react";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-['Space_Grotesk'] tracking-tight text-foreground">
                REMUS
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-4 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Desktop Right Controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-background text-foreground border border-white/10 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={toggleTheme}
              >
                <Moon size={16} />
              </motion.button>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium border border-white/10 hover:bg-white hover:text-black transition-colors duration-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-foreground/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-background/95 backdrop-blur-md md:hidden border-l border-white/10"
        >
          <div className="flex flex-col gap-2 p-8 pt-24">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 text-lg text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {item.label}
              </motion.a>
            ))}

            {/* Mobile Theme Toggle */}
            <motion.button
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white border border-white/10 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={toggleTheme}
            >
              <Moon size={16} />
            </motion.button>

            {/* Mobile CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="mt-4 px-4 py-3 text-lg text-center bg-black text-white font-medium rounded-lg border border-white/10 hover:bg-white hover:text-black transition-colors duration-200"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}