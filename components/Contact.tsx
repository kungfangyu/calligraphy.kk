import React from "react";
import { ArrowRight } from "lucide-react";
import Section from "./Section";

const Contact: React.FC = () => {
  return (
    <Section id="custom" className="bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-sm text-stone-400 mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terminal-green inline-block"></span>
            <span className="text-stone-300">04</span> Contact.tsx
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 font-serif">
            客製化需求
          </h2>
          <div className="w-24 h-1 bg-stone-900 mx-auto mb-6"></div>
        </div>

        {/* Content Card */}
        <div className="relative p-8 md:p-12 border border-stone-200 bg-stone-50/50 tech-corner">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-stone-300"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-stone-300"></div>

          {/* Message */}
          <p className="text-stone-600 text-lg leading-relaxed mb-8 font-serif">
            若您有特殊的書法作品需求，如婚禮佈置、企業題字、禮品訂製等，
            <br className="hidden md:block" />
            歡迎來信洽詢，我將為您量身打造專屬的藝術作品。
          </p>

          {/* Email Button */}
          <a
            href="mailto:fish19921026@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white font-mono text-sm hover:bg-neon-blue hover:text-stone-900 transition-all duration-300 shadow-lg group"
          >
            <span className="opacity-70 group-hover:opacity-100">&gt;_</span>
            <span>fish19921026@gmail.com</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>

          {/* Additional Info */}
          <p className="mt-6 text-stone-400 text-sm font-mono">
            // 通常會在 3-5 個工作日內回覆
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
