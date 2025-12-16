import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Section from "./Section";
import { PRODUCTS } from "../constants";
import { CartItem, Product } from "../types";

interface ShopCarouselProps {
  addToCart: (product: Product) => void;
  cart: CartItem[];
  navigateTo: (view: "home" | "order", sectionId?: string) => void;
}

const ShopCarousel: React.FC<ShopCarouselProps> = ({
  addToCart,
  cart,
  navigateTo,
}) => {
  const shopScrollRef = useRef<HTMLDivElement>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Auto-play Carousel Logic
  useEffect(() => {
    let interval: number;

    if (!isCarouselPaused) {
      interval = window.setInterval(() => {
        if (shopScrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } =
            shopScrollRef.current;
          const itemWidth =
            window.innerWidth < 768 ? window.innerWidth * 0.7 : 300;

          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            shopScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            shopScrollRef.current.scrollBy({
              left: itemWidth,
              behavior: "smooth",
            });
          }
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const scrollShop = (direction: "left" | "right") => {
    if (shopScrollRef.current) {
      const scrollAmount = 300;
      shopScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section id="shop" className="bg-stone-50 overflow-hidden" fullWidth>
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-widest border-b-2 border-red-800 pb-2 mb-4 text-red-900 font-mono">
          <span className="text-stone-400">new</span> Shop()
        </h2>
        <p className="text-stone-500 text-sm font-mono">
          /* 馬年大發, 馬上開運 */
        </p>
      </div>

      <div
        className="relative group/shop max-w-7xl mx-auto px-0 md:px-12"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        onTouchStart={() => setIsCarouselPaused(true)}
        onTouchEnd={() => setIsCarouselPaused(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={() => scrollShop("left")}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-all opacity-0 group-hover/shop:opacity-100 focus:opacity-100 hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollShop("right")}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-all opacity-0 group-hover/shop:opacity-100 focus:opacity-100 hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={shopScrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-8 px-4 md:px-0"
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="w-[280px] md:w-[220px] lg:w-[260px] snap-center flex-shrink-0 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 flex flex-col group/card"
            >
              <div className="w-full bg-stone-100 mb-3 overflow-hidden relative border border-stone-100 group-hover/card:border-stone-300 transition-colors">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-[350px] object-contain hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                />
                {product.category === "couplet" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute top-2 right-2 w-12 h-12 bg-red-800 rounded-full flex items-center justify-center text-white text-[10px] border border-white shadow-sm font-serif hover:bg-red-900 hover:scale-110 transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    馬上
                    <br />
                    購買
                  </button>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-base mb-1 font-serif">
                  {product.title}
                </h3>
                <p className="text-[10px] text-stone-400 font-mono mb-1">
                  const size = '{product.dimensions}';
                </p>
                <p className="text-xs text-stone-600 mb-2 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                <span className="font-mono text-base font-bold text-stone-900">
                  NT$ {product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="text-xs bg-stone-900 text-white px-3 py-1.5 hover:bg-stone-700 transition-colors font-mono flex items-center gap-1"
                >
                  add()
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigateTo("order")}
          className={`px-8 py-3 bg-red-900 text-white tracking-wider hover:bg-red-800 transition-all shadow-lg font-mono ${
            cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={cart.length === 0}
        >
          &lt;Cart total={cart.reduce((a, b) => a + b.quantity, 0)} /&gt;
        </button>
      </div>
    </Section>
  );
};

export default ShopCarousel;
