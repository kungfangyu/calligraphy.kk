import React, { useEffect } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  showToast: boolean;
  toastProduct: string;
}

const Toast: React.FC<ToastProps> = ({ showToast, toastProduct }) => {
  if (!showToast) return null;

  return (
    <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 left-4 md:left-auto z-[70] animate-slide-up">
      <div className="bg-stone-900 text-white px-4 md:px-6 py-3 md:py-4 rounded-sm shadow-2xl border border-neon-blue/50 w-full md:min-w-[320px] md:w-auto tech-corner">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 border-b border-stone-700 pb-2">
          <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
          <span className="font-mono text-xs text-stone-400">
            console.log()
          </span>
        </div>

        {/* Content */}
        <div className="font-mono text-xs md:text-sm space-y-1">
          <p className="text-terminal-green truncate">
            <span className="text-stone-500">&gt;</span> addToCart(
            <span className="text-yellow-400">"{toastProduct}"</span>)
          </p>
          <p className="text-stone-400 flex items-center gap-2">
            <Check size={14} className="text-terminal-green flex-shrink-0" />
            <span>已加入購物車 ✓</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-0.5 bg-stone-700 rounded-full overflow-hidden">
          <div className="h-full bg-neon-blue animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
