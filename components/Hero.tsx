import React from "react";
import { Code, PenTool, ArrowRight } from "lucide-react";

interface HeroProps {
  navigateTo: (view: "home" | "order", sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  return (
    <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-50 group">
      {/* Background Code Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 select-none overflow-hidden font-mono text-sm leading-relaxed p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            <span className="text-stone-400 mr-4">{i + 1}</span>
            <span className="text-stone-800">import</span>{" "}
            <span className="text-blue-600">Reaction</span>{" "}
            <span className="text-stone-800">from</span>{" "}
            <span className="text-green-600">'life'</span>;
          </div>
        ))}
      </div>

      {/* Ink Layer - Set to z-0 to stay behind text */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Radial gradient mask to clear the center for text visibility */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(250,250,249,0.92)_0%,rgba(250,250,249,0)_70%)]"></div>

        <div className="absolute inset-[-10%] w-[120%] h-[120%] liquid-container opacity-80 mix-blend-multiply">
          {/* Deep Black Ink - Left Corner */}
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-ink-900 rounded-[40%] ink-float-1"></div>

          {/* Gray Wash - Right Corner */}
          <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] bg-ink-500 opacity-60 rounded-[45%] ink-float-2"></div>

          {/* Mid Tone - Bottom Left */}
          <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-ink-800 opacity-80 rounded-[35%] ink-float-3"></div>

          {/* Light Splash - Top Right */}
          <div className="absolute top-[0%] right-[10%] w-[400px] h-[400px] bg-stone-400 opacity-40 rounded-[50%] ink-float-1"></div>
        </div>
      </div>

      {/* Content - Set to z-20 to stay above ink */}
      <div className="relative z-20 text-center px-4 animate-ink max-w-5xl mx-auto hero-text-glow">
        <div className="flex justify-center items-center gap-4 mb-8 text-stone-500">
          <div className="p-2 border border-stone-400/50 rounded-full bg-white/60 backdrop-blur-sm shadow-sm tech-corner">
            <Code className="w-5 h-5 text-stone-900" />
          </div>
          <span className="w-24 h-[1px] bg-stone-900/20 relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-stone-900 rounded-full"></span>
          </span>
          <div className="p-2 border border-stone-400/50 rounded-full bg-white/60 backdrop-blur-sm shadow-sm tech-corner">
            <PenTool className="w-5 h-5 text-stone-900" />
          </div>
        </div>

        <div className="mb-8 relative inline-block">
          <div className="font-mono text-sm md:text-base text-stone-400 mb-2 text-left w-full border-b border-stone-200 pb-2">
            <span className="text-stone-300">01</span>{" "}
            <span className="text-neon-blue">const</span>{" "}
            <span className="text-yellow-600">project</span>{" "}
            <span className="text-stone-600">=</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tighter text-stone-900 leading-none drop-shadow-2xl font-serif">
            <span className="text-stone-800">寫字; 寫字</span>
            <span className="inline-block w-4 h-16 md:h-24 bg-stone-900 ml-4 animate-cursor-blink align-middle"></span>
          </h1>
          <div className="font-mono text-sm md:text-base text-stone-400 mt-2 text-right w-full">
            <span className="text-stone-300">02</span>{" "}
            <span className="text-stone-400">;</span>
          </div>
        </div>

        <div className="inline-block relative p-4 mb-12">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-stone-300"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-stone-300"></div>
          <span className="block font-mono text-sm md:text-base text-stone-500 tracking-wider">
            <span className="text-stone-400">// </span>THE SYMPHONY OF LOGIC
            & ART
          </span>
        </div>

        <p className="font-mono text-stone-800 font-bold tracking-wider mb-12 text-sm md:text-base bg-white/50 backdrop-blur-md inline-block px-8 py-3 rounded-sm border-l-4 border-stone-900 shadow-sm">
          <span className="text-blue-600">&lt;Engineer /&gt;</span> meets{" "}
          <span className="italic font-serif">Calligraphy</span>
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigateTo("home", "shop")}
            className="group relative px-10 py-4 bg-stone-900 text-white overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 shadow-lg border border-stone-900"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg tracking-[0.2em] font-light font-mono">
              <span className="text-terminal-green">&gt;</span> 選購春聯{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-red-900/90 rounded-full origin-center opacity-90"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
