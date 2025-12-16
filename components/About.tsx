import React from "react";
import { ArrowRight } from "lucide-react";
import Section from "./Section";
import { SOCIAL_LINKS } from "../constants";

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-stone-50/50">
      <div className="relative flex flex-col md:flex-row items-center gap-16">
        {/* Image Section */}
        <div className="md:w-5/12 relative group">
          {/* Abstract decoration - Tech + Ink */}
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-[1px] border-l-[1px] border-stone-300 opacity-50 transition-all duration-500 group-hover:border-stone-800"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-[1px] border-r-[1px] border-stone-300 opacity-50 transition-all duration-500 group-hover:border-stone-800"></div>

          {/* Main Image Container */}
          <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-out">
            <img
              src="./kk.jpg"
              alt="Artist working"
              className="w-full h-[500px] object-cover"
            />
            {/* Tech Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.1)_2px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
          </div>

          {/* Floating Tag */}
          <div className="absolute bottom-8 -left-4 bg-white px-4 py-2 shadow-xl border-l-2 border-stone-900 hidden md:block">
            <span className="font-mono text-xs tracking-widest text-stone-500">
              Scanning...{" "}
              <span className="animate-pulse text-green-600">100%</span>
            </span>
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-7/12 space-y-8">
          {/* Header */}
          <div className="relative">
            <p className="font-mono text-sm text-stone-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-blue inline-block"></span>
              <span className="text-stone-300">03</span> About.tsx
            </p>
            <h2 className="text-3xl md:text-3xl font-sans font-bold text-stone-900 tracking-tight leading-none mb-6">
              工程師寫書法<span className="text-neon-blue">.</span>
            </h2>
          </div>

          {/* The "Code vs Art" Concept Block - Simplified */}
          <div className="relative pl-4 md:pl-8 border-l border-stone-200 py-2 hover:border-stone-400 transition-colors duration-500">
            {/* Code Logic - Minimalist */}
            <div className="font-mono text-sm text-stone-500 space-y-2 mb-6 bg-stone-100/50 p-4 rounded-sm border border-stone-100 inline-block w-full">
              <p>
                <span className="text-purple-600">const</span>{" "}
                <span className="text-blue-600">core</span> ={" "}
                <span className="text-stone-900">{"["}</span>
              </p>
              <p className="pl-4 text-stone-600">
                'Logic', <span className="text-stone-400">// The Engineer</span>
              </p>
              <p className="pl-4 text-stone-600">
                'Aesthetics'{" "}
                <span className="text-stone-400">// The Artist</span>
              </p>
              <p>
                <span className="text-stone-900">{"]"}</span>.reduce((
                <span className="text-orange-600">a, b</span>) =&gt; a + b);
              </p>
            </div>

            {/* Descriptive Text */}
            <div className="space-y-4 max-w-lg">
              {[
                "2017 年的某一天,在一個很平凡的瞬間,我開始想把自己的書法作品慢慢收集起來,也替自己留下一條持續創作的路。",
                "我是一名軟體工程師,日常在邏輯與系統之間工作。書法成了讓我靜心、也讓節奏慢下來的方式。",
                "上班寫程式, 下班寫寫字。",
                "於是「工程師寫書法」成為這個品牌最直接的名字。",
                "希望你們會喜歡我的作品！",
              ].map((text, index) => (
                <p
                  key={index}
                  className="text-stone-600 leading-8 font-serif text-lg text-justify"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Signature / CTA */}
          <div className="pt-4 flex items-center gap-6">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-stone-900 font-mono text-xs md:text-sm uppercase tracking-widest hover:text-neon-blue transition-colors"
            >
              <span className="w-8 h-[1px] bg-stone-900 group-hover:bg-neon-blue transition-colors"></span>
              Follow My Instagram @calligraphy.kk{" "}
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
