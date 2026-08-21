import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useIdle } from "@/app/hooks/useIdle";

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const isIdle = useIdle(10_000);

  return (
    <>
      {/* =========================================================
          CHAT INPUT
         ========================================================= */}

      <AnimatePresence>
        {!isIdle && !open && (
          <motion.button
            key="chat-input"
            type="button"
            onClick={() => setOpen(true)}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 12,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
        fixed
        bottom-6
        left-4
        right-4
        z-50

        w-auto

        sm:left-6
        sm:right-auto
        sm:w-80
        sm:bottom-8

        cursor-text

        border
        border-[var(--green-accent)]/30

        bg-black/70
        backdrop-blur-md

        px-4
        py-3

        text-left
        text-sm
        text-foreground/50

        shadow-[0_8px_30px_rgba(0,0,0,0.35)]

        transition-all
        duration-200

        hover:border-[var(--green-accent)]/60
        hover:bg-black/80
        hover:text-foreground/80

        rounded-sm
      "
          >
            <span>Chat with me</span>

            <span
              className="
          ml-1
          inline-block
          h-3
          w-px
          animate-pulse
          bg-[var(--green-accent)]
          align-middle
        "
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =========================================================
          CHAT WINDOW
         ========================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              fixed
              bottom-6
              left-6
              z-[100]

              h-[80vh]
              w-[calc(100vw-3rem)]
              max-w-lg

              overflow-hidden
              rounded-2xl

              border
              border-white/10

              bg-[var(--card)]

              shadow-2xl

              md:h-[calc(100vh-4rem)]
              md:w-[400px]
            "
          >
            {/* Close button */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                absolute
                right-3
                top-3
                z-10

                flex
                h-8
                w-8
                items-center
                justify-center

                rounded-full

                bg-black/50
                text-white/70

                transition-colors

                hover:bg-black/70
                hover:text-white
              "
              aria-label="Close chat"
            >
              <X size={16} />
            </button>

            <iframe
              src="https://chat-with-remus.vercel.app"
              className="h-full w-full border-0"
              title="Chat with Remus AI"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
