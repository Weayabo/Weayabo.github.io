import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Moon } from "lucide-react";
import { MoonPhase } from "./moon-phase";
import { useIdle } from "@/app/hooks/useIdle";

const navItems = [
  { label: "TRAILHEAD", href: "#home" },
  { label: "THE PATH", href: "#about" },
  { label: "WAYPOINTS", href: "#projects" },
  { label: "SIDEQUEST", href: "#beyond-coding" },
  { label: "SIGNAL", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 10 seconds of inactivity
  const isIdle = useIdle(10_000);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * If the user becomes active again,
   * make sure the mobile menu isn't left open.
   */
  useEffect(() => {
    if (!isIdle) {
      setIsMobileMenuOpen(false);
    }
  }, [isIdle]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });

      setIsMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light",
    );
  };

  return (
    <>
      <AnimatePresence>
        {!isIdle && (
          <motion.nav
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -100,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg"
                : "bg-transparent"
            }`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex h-20 items-center justify-between">

                {/* =====================================================
                    LOGO
                   ===================================================== */}

                <motion.a
                  href="#home"
                  onClick={(e) =>
                    handleNavClick(e, "#home")
                  }
                  className="relative flex items-center gap-2"
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <span className="font-['Space_Grotesk'] text-2xl tracking-tight text-foreground">
                    REMUS
                  </span>

                  <MoonPhase size={10} />
                </motion.a>

                {/* =====================================================
                    DESKTOP NAVIGATION
                   ===================================================== */}

                <div className="hidden items-center gap-1 md:flex">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) =>
                        handleNavClick(e, item.href)
                      }
                      className="
                        group
                        relative
                        px-4
                        py-2
                        text-sm
                        text-foreground/60
                        transition-colors
                        duration-200
                        hover:text-foreground
                      "
                      initial={{
                        opacity: 0,
                        y: -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                    >
                      {item.label}

                      <span
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-0.5
                          w-0
                          bg-foreground
                          transition-all
                          duration-300
                          group-hover:w-full
                        "
                      />
                    </motion.a>
                  ))}
                </div>

                {/* =====================================================
                    DESKTOP CONTROLS
                   ===================================================== */}

                <div className="hidden items-center gap-2 md:flex">

                  {/* Theme */}

                  <motion.button
                    className="
                      flex
                      h-10
                      w-10
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/10
                      bg-background
                      text-foreground
                      transition-colors
                      duration-200
                      hover:bg-white
                      hover:text-black
                    "
                    whileHover={{
                      scale: 1.05,
                    }}
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    <Moon size={16} />
                  </motion.button>

                  {/* CTA */}

                  <motion.a
                    href="#contact"
                    onClick={(e) =>
                      handleNavClick(e, "#contact")
                    }
                    className="
                      rounded-lg
                      border
                      border-white/10
                      bg-foreground
                      px-6
                      py-2.5
                      text-sm
                      font-medium
                      text-background
                      transition-colors
                      duration-200
                      hover:bg-white
                      hover:text-black
                    "
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.6,
                      duration: 0.4,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                  >
                    Send a Signal
                  </motion.a>
                </div>

                {/* =====================================================
                    MOBILE MENU BUTTON
                   ===================================================== */}

                <button
                  onClick={() =>
                    setIsMobileMenuOpen(
                      !isMobileMenuOpen,
                    )
                  }
                  className="
                    rounded-lg
                    p-2
                    text-foreground
                    transition-colors
                    hover:bg-foreground/10
                    md:hidden
                  "
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} />
                  )}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ===============================================================
          MOBILE MENU
         =============================================================== */}

      <AnimatePresence>
        {!isIdle && isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-y-0
              right-0
              z-40
              w-full
              max-w-sm
              border-l
              border-white/10
              bg-background/95
              backdrop-blur-md
              md:hidden
            "
          >
            <div className="flex flex-col gap-2 p-8 pt-24">

              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) =>
                    handleNavClick(e, item.href)
                  }
                  className="
                    rounded-lg
                    px-4
                    py-3
                    text-lg
                    text-foreground/70
                    transition-all
                    duration-200
                    hover:bg-foreground/5
                    hover:text-foreground
                  "
                  initial={{
                    opacity: 0,
                    x: 50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.3,
                  }}
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Mobile Theme */}

              <motion.button
                className="
                  flex
                  h-10
                  w-10
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10
                  bg-black
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-white
                  hover:text-black
                "
                whileHover={{
                  scale: 1.05,
                }}
                onClick={toggleTheme}
              >
                <Moon size={16} />
              </motion.button>

              {/* Mobile CTA */}

              <motion.a
                href="#contact"
                onClick={(e) =>
                  handleNavClick(e, "#contact")
                }
                className="
                  mt-4
                  rounded-lg
                  border
                  border-white/10
                  bg-black
                  px-4
                  py-3
                  text-center
                  text-lg
                  font-medium
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-white
                  hover:text-black
                "
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: navItems.length * 0.1,
                  duration: 0.3,
                }}
              >
                Send a Signal
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}