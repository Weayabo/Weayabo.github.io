import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 font-medium text-sm shadow-lg transition-transform hover:scale-105"
        style={{
          background: "var(--accent)",
          color: "var(--accent-foreground)",
          boxShadow: "0 4px 20px rgba(74,144,217,0.4)",
        }}
      >
        <MessageCircle size={18} />
        Chat with my AI
        <span
          className="absolute -top-1.5 -left-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white animate-pulse"
          style={{ background: "#22c55e" }}
        >
          NEW
        </span>
      </button>

      {open && (
        // Wrapper: dims + centers on mobile (blocks page interaction).
        // On desktop: transparent + pointer-events-none, so the portfolio
        // behind it stays fully scrollable/clickable except over the panel itself.
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 pointer-events-auto md:bg-transparent md:pointer-events-none md:items-start md:justify-start md:p-3 md:pt-30"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg h-[80vh] md:w-[400px] md:h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0 z-10 rounded-full p-1.5 bg-black/40 hover:bg-black/60 text-white transition-colors"
            >
              <X size={18} />
            </button>
            <iframe
              src="https://chat-with-remus.vercel.app"
              className="w-full h-full border-0"
              title="Chat with Remus AI"
            />
          </div>
        </div>
      )}
    </>
  );
}