import React from "react";
import { ZoomIn, ArrowRight } from "lucide-react";
import Section from "./Section";
import { PORTFOLIO_ITEMS, SOCIAL_LINKS } from "../constants/constants";
import { PortfolioItem } from "../types";

interface PortfolioProps {
  setSelectedPortfolioItem: (item: PortfolioItem) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ setSelectedPortfolioItem }) => {
  return (
    <Section id="portfolio" className="bg-white">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-2xl font-bold tracking-widest border-b-2 border-stone-900 pb-2 mb-4 font-mono">
          <span className="text-neon-blue">&lt;</span> 墨跡 / Portfolio{" "}
          <span className="text-neon-blue">/&gt;</span>
        </h2>
        <p className="text-stone-500 text-sm font-mono">
          // 平日寫程式，假日寫寫字
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedPortfolioItem(item)}
            className={`group relative overflow-hidden bg-stone-100 cursor-pointer ${
              index === 1 || index === 2 ? "md:col-span-2" : ""
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-ink-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <div className="text-white text-center p-4 border border-white/20 m-4 tech-corner">
                <ZoomIn
                  size={32}
                  className="mx-auto mb-2 opacity-80 text-neon-blue"
                />
                <h3 className="text-2xl font-bold mb-1 font-serif">
                  {item.title}
                </h3>
                {/* <p className="font-mono text-sm opacity-80 text-terminal-green">console.log(details)</p> */}
              </div>
            </div>
            {/* Tech Markers */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* More Works Link */}
      <div className="text-center mt-12">
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 text-stone-900 font-mono text-sm md:text-base uppercase tracking-widest hover:text-neon-blue transition-colors border-b-2 border-stone-900 hover:border-neon-blue pb-1"
        >
          <span className="w-8 h-[1px] bg-stone-900 group-hover:bg-neon-blue transition-colors"></span>
          點我看更多作品
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </Section>
  );
};

export default Portfolio;
