import React from "react";
import { Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "../constants/constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-6 text-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>No Problems</span>
          </div>
          <span className="text-stone-600">|</span>
          <span className="text-stone-300">UTF-8</span>
          <span className="text-stone-600">|</span>
          <span className="text-stone-300">Ln 1, Col 1</span>
        </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <a
              href={SOCIAL_LINKS.instagram}
              className="hover:text-white transition-colors flex items-center gap-2"
              title="Instagram"
            >
              <Instagram size={16} /> @calligraphy.kk
            </a>
            <span className="text-stone-600">
              © {new Date().getFullYear()} 工程師寫書法 All rights reserved.
            </span>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
