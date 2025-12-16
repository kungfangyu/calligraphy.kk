import React from "react";
import { Menu, X, ShoppingBag, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";
import { CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
  currentView: "home" | "order";
  navigateTo: (view: "home" | "order", sectionId?: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  cart,
  currentView,
  navigateTo,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <nav className="fixed w-full z-50 bg-paper/90 backdrop-blur-sm border-b border-stone-200 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
        <div
          className="group flex items-center gap-3 cursor-pointer"
          onClick={() => navigateTo("home")}
        >
          <div className="relative">
            <img
              src="./logo.jpg"
              alt="KK Logo"
              className="w-10 h-10 rounded-full object-cover border border-stone-200"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-paper"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-widest text-stone-900 group-hover:text-neon-blue transition-colors">
              工程師寫書法
              <span className="animate-cursor-blink">_</span>
            </span>
            <span className="text-[10px] font-mono text-stone-500 tracking-tighter">
              git:(main)
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {["作品集", "春聯販售", "關於我", "客製化"].map((item, i) => {
            const view =
              item === "春聯販售"
                ? "shop"
                : item === "作品集"
                ? "portfolio"
                : item === "關於我"
                ? "about"
                : "custom";
            return (
              <button
                key={item}
                onClick={() => navigateTo("home", view as any)}
                className="font-mono text-sm hover:text-stone-900 transition-colors group flex items-center gap-1"
              >
                <span className="opacity-0 group-hover:opacity-100 text-terminal-green transition-opacity">
                  &gt;_
                </span>
                {item}
              </button>
            );
          })}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-900 transition-colors flex items-center gap-1 font-bold text-stone-900"
            title="Follow on Instagram"
          >
            <Instagram size={20} />
          </a>
          <button
            onClick={() => navigateTo("order")}
            className="relative flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-sm hover:bg-stone-700 transition-all border border-stone-900 hover:border-neon-blue"
          >
            <ShoppingBag size={18} />
            <span className="text-sm font-mono">checkout()</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-700 text-white text-xs flex items-center justify-center rounded-full border-2 border-paper">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => navigateTo("order")}
            className="relative text-stone-900"
          >
            <ShoppingBag size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-700 text-white text-xs flex items-center justify-center rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-paper border-b border-stone-200 p-6 flex flex-col space-y-4 shadow-lg animate-ink">
          <button
            onClick={() => navigateTo("home", "portfolio")}
            className="text-lg py-2 border-b border-stone-100 font-mono"
          >
            <span className="text-black">&gt;</span> 作品集
          </button>
          <button
            onClick={() => navigateTo("home", "shop")}
            className="text-lg py-2 border-b border-stone-100 font-mono"
          >
            <span className="text-black">&gt;</span> 春聯販售
          </button>
          <button
            onClick={() => navigateTo("home", "about")}
            className="text-lg py-2 border-b border-stone-100 font-mono"
          >
            <span className="text-black">&gt;</span> 關於我
          </button>
          <button
            onClick={() => navigateTo("home", "custom")}
            className="text-lg py-2 border-b border-stone-100 font-mono"
          >
            <span className="text-black">&gt;</span> 客製化需求
          </button>
          <a
            href={SOCIAL_LINKS.instagram}
            className="text-lg py-2 flex items-center justify-center gap-2 text-red-900 font-bold"
          >
            <Instagram size={20} /> Instagram
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
