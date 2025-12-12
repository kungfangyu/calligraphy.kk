import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Instagram, Code, PenTool, Menu, X, ArrowRight, ZoomIn, ChevronLeft, ChevronRight, Share2, Check, Link as LinkIcon } from 'lucide-react';
import Section from './components/Section';
import OrderForm from './components/OrderForm';
import { PORTFOLIO_ITEMS, PRODUCTS, SOCIAL_LINKS } from './constants';
import { CartItem, PortfolioItem } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'order'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Portfolio Modal State
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Shop Carousel State & Ref
  const shopScrollRef = useRef<HTMLDivElement>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Auto-play Carousel Logic
  useEffect(() => {
    let interval: number;

    if (!isCarouselPaused && currentView === 'home') {
      interval = window.setInterval(() => {
        if (shopScrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = shopScrollRef.current;
          const itemWidth = window.innerWidth < 768 ? window.innerWidth * 0.7 : 300; 
          
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            shopScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            shopScrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
          }
        }
      }, 3000); 
    }

    return () => clearInterval(interval);
  }, [isCarouselPaused, currentView]);

  // Handle Share Logic
  const handleShare = async (item: PortfolioItem) => {
    const shareData = {
      title: `工程師寫書法 - ${item.title}`,
      text: `欣賞這幅書法作品：「${item.title}」\n${item.description || ''}`,
      url: window.location.href // In a real routing app, this would be a specific URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  // Add item to cart logic
  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigateTo = (view: 'home' | 'order', sectionId?: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const scrollShop = (direction: 'left' | 'right') => {
    if (shopScrollRef.current) {
      const scrollAmount = 300; 
      shopScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-serif selection:bg-stone-200">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-paper/90 backdrop-blur-sm border-b border-stone-200 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div 
            className="group flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
             <div className="relative">
                <img src="./logo.jpg" alt="KK Logo" className="w-10 h-10 rounded-full object-cover border border-stone-200" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-paper"></div>
             </div>
             <div className="flex flex-col">
                <span className="text-lg font-bold tracking-widest text-stone-900 group-hover:text-neon-blue transition-colors">
                  工程師寫書法<span className="animate-cursor-blink text-neon-blue">_</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500 tracking-tighter">git:(main)</span>
             </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['作品集', '春聯販售', '關於我'].map((item, i) => {
               const view = item === '春聯販售' ? 'shop' : item === '作品集' ? 'portfolio' : 'about';
               return (
                  <button 
                    key={item}
                    onClick={() => navigateTo('home', view as any)} 
                    className="font-mono text-sm hover:text-stone-900 transition-colors group flex items-center gap-1"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-terminal-green transition-opacity">&gt;_</span>
                    {item}
                  </button>
               )
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
              onClick={() => navigateTo('order')} 
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
              onClick={() => navigateTo('order')} 
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
          <div className="md:hidden absolute top-20 left-0 w-full bg-paper border-b border-stone-200 p-6 flex flex-col space-y-4 shadow-lg animate-ink">
            <button onClick={() => navigateTo('home', 'portfolio')} className="text-lg py-2 border-b border-stone-100 font-mono"><span className="text-terminal-green">&gt;</span> 作品集</button>
            <button onClick={() => navigateTo('home', 'shop')} className="text-lg py-2 border-b border-stone-100 font-mono"><span className="text-terminal-green">&gt;</span> 春聯販售</button>
            <button onClick={() => navigateTo('home', 'about')} className="text-lg py-2 border-b border-stone-100 font-mono"><span className="text-terminal-green">&gt;</span> 關於我</button>
            <a href={SOCIAL_LINKS.instagram} className="text-lg py-2 flex items-center gap-2 text-red-900 font-bold">
              <Instagram size={20} /> Instagram
            </a>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-50 group">
               {/* Background Code Texture */}
               <div className="absolute inset-0 pointer-events-none opacity-5 select-none overflow-hidden font-mono text-sm leading-relaxed p-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap">
                      <span className="text-stone-400 mr-4">{i + 1}</span>
                      <span className="text-stone-800">import</span> <span className="text-blue-600">Reaction</span> <span className="text-stone-800">from</span> <span className="text-green-600">'life'</span>;
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
                       <span className="text-stone-300">01</span> <span className="text-neon-blue">const</span> <span className="text-yellow-600">project</span> <span className="text-stone-600">=</span>
                    </div>
                    <h1 className="text-2xl md:text-7xl lg:text-7xl font-black tracking-tighter text-stone-900 leading-none drop-shadow-2xl font-serif">
                      <span className="text-stone-800">寫字; 寫字</span>
                      <span className="inline-block w-4 h-16 md:h-24 bg-stone-900 ml-4 animate-cursor-blink align-middle"></span>
                    </h1>
                     <div className="font-mono text-sm md:text-base text-stone-400 mt-2 text-right w-full">
                       <span className="text-stone-300">02</span> <span className="text-stone-400">;</span>
                    </div>
                  </div>

                  <div className="inline-block relative p-4 mb-12">
                     <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-stone-300"></div>
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-stone-300"></div>
                     <span className="block font-mono text-sm md:text-base text-stone-500 tracking-wider">
                        <span className="text-stone-400">// </span>THE SYMPHONY OF LOGIC & ART
                     </span>
                  </div>
                  
                  <p className="font-mono text-stone-800 font-bold tracking-wider mb-12 text-sm md:text-base bg-white/50 backdrop-blur-md inline-block px-8 py-3 rounded-sm border-l-4 border-stone-900 shadow-sm">
                    <span className="text-blue-600">&lt;Engineer /&gt;</span> meets <span className="italic font-serif">Calligraphy</span>
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={() => navigateTo('home', 'shop')}
                      className="group relative px-10 py-4 bg-stone-900 text-white overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 shadow-lg border border-stone-900"
                    >
                      <span className="relative z-10 flex items-center gap-3 text-lg tracking-[0.2em] font-light font-mono">
                         <span className="text-terminal-green">&gt;</span> 選購春聯 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-500 ease-out group-hover:scale-150 group-hover:bg-red-900/90 rounded-full origin-center opacity-90"></div>
                    </button>
                  </div>
               </div>
            </header>


            {/* Shop Section (Carousel) */}
            <Section id="shop" className="bg-stone-50 overflow-hidden" fullWidth>
               <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12 flex flex-col items-center">
                 <h2 className="text-3xl font-bold tracking-widest border-b-2 border-red-800 pb-2 mb-4 text-red-900 font-mono"><span className="text-stone-400">new</span> Shop()</h2>
                 <p className="text-stone-500 text-sm font-mono">/* 馬年大發, 馬上開運 */</p>
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
                  onClick={() => scrollShop('left')}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition-all opacity-0 group-hover/shop:opacity-100 focus:opacity-100 hidden md:block"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Right Arrow */}
                <button 
                  onClick={() => scrollShop('right')}
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
                      className="min-w-[60vw] md:min-w-[220px] lg:min-w-[260px] snap-center flex-shrink-0 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 flex flex-col group/card"
                    >
                      <div className="w-full bg-stone-100 mb-3 overflow-hidden relative border border-stone-100 group-hover/card:border-stone-300 transition-colors">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-[350px] object-contain hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                        {product.category === 'couplet' && (
                          <div className="absolute top-2 right-2 w-7 h-7 bg-red-800 rounded-full flex items-center justify-center text-white text-[10px] border border-white shadow-sm font-serif">
                            吉
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-base mb-1 font-serif">{product.title}</h3>
                        <p className="text-[10px] text-stone-400 font-mono mb-1">const size = '{product.dimensions}';</p>
                        <p className="text-xs text-stone-600 mb-2 line-clamp-2 leading-relaxed">{product.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                        <span className="font-mono text-base font-bold text-stone-900">NT$ {product.price}</span>
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
                   onClick={() => navigateTo('order')}
                   className={`px-8 py-3 bg-red-900 text-white tracking-wider hover:bg-red-800 transition-all shadow-lg font-mono ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                   disabled={cart.length === 0}
                 >
                   &lt;Checkout total={cart.reduce((a,b)=>a+b.quantity,0)} /&gt;
                 </button>
              </div>
            </Section>


            {/* Portfolio Section */}
            <Section id="portfolio" className="bg-white">
              <div className="flex flex-col items-center mb-16">
                 <h2 className="text-3xl font-bold tracking-widest border-b-2 border-stone-900 pb-2 mb-4 font-mono"><span className="text-neon-blue">&lt;</span> 墨跡 / Portfolio <span className="text-neon-blue">/&gt;</span></h2>
                 <p className="text-stone-500 text-sm font-mono">// 平日寫程式，假日寫寫字</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                {PORTFOLIO_ITEMS.map((item, index) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedPortfolioItem(item)}
                    className={`group relative overflow-hidden bg-stone-100 cursor-pointer ${index === 1 || index === 2 ? 'md:col-span-2' : ''}`}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-ink-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-white text-center p-4 border border-white/20 m-4 tech-corner">
                        <ZoomIn size={32} className="mx-auto mb-2 opacity-80 text-neon-blue" />
                        <h3 className="text-2xl font-bold mb-1 font-serif">{item.title}</h3>
                        {/* <p className="font-mono text-sm opacity-80 text-terminal-green">console.log(details)</p> */}
                      </div>
                    </div>
                    {/* Tech Markers */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </Section>

            {/* About Section */}
            <Section id="about" className="bg-stone-50/50">
              <div className="relative flex flex-col md:flex-row items-center gap-16">
                {/* Image Section */}
                <div className="md:w-5/12 relative group">
                    {/* Abstract decoration - Tech + Ink */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 border-t-[1px] border-l-[1px] border-stone-300 opacity-50 transition-all duration-500 group-hover:border-stone-800"></div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-[1px] border-r-[1px] border-stone-300 opacity-50 transition-all duration-500 group-hover:border-stone-800"></div>
                    
                    {/* Main Image Container */}
                    <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-out">
                       <img src="./kk.jpg" alt="Artist working" className="w-full h-[500px] object-cover" />
                       {/* Tech Overlay */}
                       <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.1)_2px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                    </div>

                    {/* Floating Tag */}
                    <div className="absolute bottom-8 -left-4 bg-white px-4 py-2 shadow-xl border-l-2 border-stone-900 hidden md:block">
                         <span className="font-mono text-xs tracking-widest text-stone-500">Scanning... <span className="animate-pulse text-green-600">100%</span></span>
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
                  <div className="relative pl-8 border-l border-stone-200 py-2 hover:border-stone-400 transition-colors duration-500">
                     {/* Code Logic - Minimalist */}
                     <div className="font-mono text-sm text-stone-500 space-y-2 mb-6 bg-stone-100/50 p-4 rounded-sm border border-stone-100 inline-block w-full">
                        <p><span className="text-purple-600">const</span> <span className="text-blue-600">core</span> = <span className="text-stone-900">{'['}</span></p>
                        <p className="pl-4 text-stone-600">'Logic', <span className="text-stone-400">// The Engineer</span></p>
                        <p className="pl-4 text-stone-600">'Aesthetics' <span className="text-stone-400">// The Artist</span></p>
                        <p><span className="text-stone-900">{']'}</span>.reduce((<span className="text-orange-600">a, b</span>) =&gt; a + b);</p>
                     </div>

                     {/* Descriptive Text */}
                     <p className="text-stone-600 leading-8 font-serif text-lg text-justify max-w-lg">
                         軟體與書法都是創造—— <br />
我是一名軟體工程師, 在工作的時間用語法構築應用，在下班後的日常用筆觸維持信念。
我在兩者間找到生活中的平衡，讓邏輯和感性融合成我平日的創作靈感。
                     </p>
                  </div>

                  {/* Signature / CTA */}
                  <div className="pt-4 flex items-center gap-6">
                     <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-stone-900 font-mono text-xs md:text-sm uppercase tracking-widest hover:text-neon-blue transition-colors">
                        <span className="w-8 h-[1px] bg-stone-900 group-hover:bg-neon-blue transition-colors"></span>
                        Follow My Instagram @calligraphy.kk <ArrowRight size={16} className="ml-2" />
                     </a>
                  </div>
                </div>
              </div>
            </Section>

            {/* Custom Orders Section */}
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
                    若您有特殊的書法作品需求，如婚禮佈置、企業題字、禮品訂製等，<br className="hidden md:block" />
                    歡迎來信洽詢，我將為您量身打造專屬的藝術作品。
                  </p>

                  {/* Email Button */}
                  <a 
                    href="mailto:fish19921026@gmail.com"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white font-mono text-sm hover:bg-neon-blue hover:text-stone-900 transition-all duration-300 shadow-lg group"
                  >
                    <span className="opacity-70 group-hover:opacity-100">&gt;_</span>
                    <span>fish19921026@gmail.com</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Additional Info */}
                  <p className="mt-6 text-stone-400 text-sm font-mono">
                    // 通常會在 3-5 個工作日內回覆
                  </p>
                </div>
              </div>
            </Section>
          </>
        ) : (
          /* Order View */
          <div className="py-12 bg-stone-50 min-h-screen animate-ink">
            <OrderForm 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onBack={() => navigateTo('home', 'shop')}
              onClearCart={clearCart}
            />
          </div>
        )}
      </main>

      {/* Portfolio Lightbox Modal */}
      {selectedPortfolioItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-sm animate-ink" onClick={() => setSelectedPortfolioItem(null)}>
          <div 
            className="bg-white max-w-5xl w-full max-h-[95vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl rounded-sm tech-corner" 
            onClick={e => e.stopPropagation()}
          >
            <div className="md:w-3/5 bg-stone-100 flex items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] relative">
                {/* Tech overlay grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <img 
                src={selectedPortfolioItem.imageUrl} 
                alt={selectedPortfolioItem.title} 
                className="max-h-[50vh] md:max-h-[85vh] w-auto object-contain shadow-lg z-10" 
              />
            </div>
            <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-between relative bg-white">
              <div>
                 <div className="flex justify-between items-start mb-2">
                    <h2 className="text-4xl font-bold font-serif text-stone-900">{selectedPortfolioItem.title}</h2>
                    <button 
                      onClick={() => setSelectedPortfolioItem(null)}
                      className="text-stone-400 hover:text-stone-900 transition-colors p-2 -mr-2 -mt-2"
                    >
                      <X size={24} />
                    </button>
                 </div>
                <div className="w-12 h-1 bg-red-800 mb-8 flex gap-1">
                    <div className="w-2/3 h-full bg-red-800"></div>
                    <div className="w-1/3 h-full bg-stone-900"></div>
                </div>
                
                <div className="space-y-6 text-stone-600 font-mono text-sm">
                  <p className="flex items-center gap-3 border-b border-stone-100 pb-3">
                    <span className="font-bold text-stone-400 w-12 uppercase tracking-wider">Year</span> 
                    <span className="text-stone-900">{selectedPortfolioItem.year}</span>
                  </p>
                  {selectedPortfolioItem.dimensions && (
                    <p className="flex items-center gap-3 border-b border-stone-100 pb-3">
                      <span className="font-bold text-stone-400 w-12 uppercase tracking-wider">Size</span> 
                      <span className="text-stone-900">{selectedPortfolioItem.dimensions}</span>
                    </p>
                  )}
                  {selectedPortfolioItem.description && (
                    <div className="pt-2 font-serif text-base">
                      <p className="leading-relaxed italic text-stone-700">"{selectedPortfolioItem.description}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <button 
                  onClick={() => handleShare(selectedPortfolioItem)}
                  className="flex items-center justify-center gap-2 w-full border border-stone-300 py-3 text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all active:scale-95 group font-mono text-sm"
                >
                  {isCopied ? <Check size={18} /> : <Share2 size={18} />}
                  <span>{isCopied ? 'copied!' : 'navigator.share()'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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
           
           <div className="flex items-center gap-6">
             <a href={SOCIAL_LINKS.instagram} className="hover:text-white transition-colors flex items-center gap-2" title="Instagram">
               <Instagram size={16} /> @calligraphy.kk
             </a>
             <span className="text-stone-600 hidden md:inline">© {new Date().getFullYear()}</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;