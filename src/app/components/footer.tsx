import { motion } from 'motion/react';
import { Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Navigation: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    Social: [
      { label: 'GitHub', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Dribbble', href: '#' },
    ],
    Resources: [
      { label: 'Blog', href: '#' },
      { label: 'Resume', href: '#' },
      { label: 'Uses', href: '#' },
      { label: 'Testimonials', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-[#0A0E27] border-t border-[#00D9FF]/10">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00D9FF]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="text-2xl font-['Space_Grotesk'] tracking-tight">
                  <span className="text-[#00D9FF]">REMUS</span>
                </span>
              </div>
              <p className="text-[#F5F5F5]/60 mb-6 leading-relaxed">
                Crafting exceptional digital experiences with modern web technologies.
              </p>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 flex items-center justify-center bg-[#1A1F3A]/50 border border-[#00D9FF]/20 rounded-lg text-[#F5F5F5]/60 hover:text-[#00D9FF] hover:border-[#00D9FF]/50 hover:bg-[#1A1F3A]/80 transition-all duration-300"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            >
              <h4 className="text-[#F5F5F5] mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      className="text-[#F5F5F5]/60 hover:text-[#00D9FF] transition-colors duration-300 inline-block group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00D9FF] group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#F5F5F5]/60 text-sm flex items-center gap-2"
          >
            © {currentYear} John Developer. Made with{' '}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={16} className="text-[#00D9FF] fill-[#00D9FF]" />
            </motion.span>
            and lots of coffee
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 text-sm text-[#F5F5F5]/60"
          >
            <a href="#" className="hover:text-[#00D9FF] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00D9FF] transition-colors duration-300">
              Terms of Service
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -5 }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-[#00D9FF] to-[#A78BFA] rounded-full text-[#0A0E27] shadow-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 z-50"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  );
}
