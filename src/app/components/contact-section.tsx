import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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

  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const res = await fetch("https://formspree.io/f/xnjbvqel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatusMessage("Something went wrong, please try again.");
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to send message. Please try later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "remuszamora@gmail.com",
      href: "mailto:remuszamora@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+63 969 142 4672",
      href: "tel:+639691424672",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Fernando. Pampanga, Philippines",
      href: "https://maps.app.goo.gl/hz7pq2WP9gaGiahZ7",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 from-primary to-accent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              Get In Touch
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="mt-6 text-lg text-foreground/100 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something
            amazing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl text-foreground mb-6">
                Let's Talk
              </h3>
              <p className="text-lg text-foreground/100 leading-relaxed mb-8">
                I'm always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-primary/50 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 group"
                >
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <info.icon className="text-foreground" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60 group-hover:text-primary transition-colors duration-300">
                      {info.label}
                    </div>
                    <div className="text-foreground group-hover:text-primary transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="pt-8"
            >
              <p className="text-foreground/60 mb-4">
                Follow me on social media
              </p>
              <div className="flex gap-4 flex-wrap">
                {["GitHub", "LinkedIn", "Instagram", "Facebook"].map(
                  (social, index) => (
                    <motion.a
                      key={social}
                      href={
                        social === "GitHub"
                          ? "https://github.com/Weayabo"
                          : social === "LinkedIn"
                            ? "https://www.linkedin.com/in/remus-zamora-507768374/"
                            : social === "Instagram"
                              ? "https://www.instagram.com/re.myths/"
                              : social === "Facebook"
                                ? "https://www.facebook.com/remuszamora"
                                : "#"
                      }
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="px-6 py-3 bg-gradient-to-br from-background/80 to-background/40 border border-primary/50 rounded-lg text-foreground/80 hover:text-primary hover:border-primary/50 transition-all duration-300"
                    >
                      {social}
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-background/50 border border-primary/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-background/20 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-background/50 border border-primary/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-background/20 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full px-6 py-4 bg-background/50 border border-primary/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-background/20 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-6 py-4 bg-background/50 border border-primary/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-background/20 transition-all duration-300 resize-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full px-8 py-4 rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-foreground font-medium flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-[#0A0E27] border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 shadow-[0_0_30px_rgba(0,217,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              {statusMessage && (
                <p className="text-sm text-[#00D9FF] mt-2">{statusMessage}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
