import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0E27]/80 backdrop-blur-md border-b border-[#00D9FF]/20 shadow-lg shadow-[#00D9FF]/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-['Space_Grotesk'] tracking-tight">
                <span className="text-[#00D9FF]">REMUS </span>
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00D9FF]/20 to-[#A78BFA]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-4 py-2 text-sm text-[#F5F5F5]/80 hover:text-[#00D9FF] transition-colors duration-300 group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] group-hover:w-full transition-all duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/0 to-[#A78BFA]/0 group-hover:from-[#00D9FF]/10 group-hover:to-[#A78BFA]/10 rounded-lg transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:block relative px-6 py-2.5 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#A78BFA]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#A78BFA] to-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-sm text-[#0A0E27] font-medium">Get In Touch</span>
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(0,217,255,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#00D9FF] hover:bg-[#00D9FF]/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-[#1A1F3A]/95 backdrop-blur-md md:hidden border-l border-[#00D9FF]/20"
        >
          <div className="flex flex-col gap-2 p-8 pt-24">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 text-lg text-[#F5F5F5]/80 hover:text-[#00D9FF] hover:bg-[#00D9FF]/10 rounded-lg transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-4 px-4 py-3 text-lg text-center bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] text-[#0A0E27] font-medium rounded-lg"
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
