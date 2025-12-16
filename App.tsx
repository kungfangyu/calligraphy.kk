import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ShopCarousel from "./components/ShopCarousel";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import OrderForm from "./components/OrderForm";
import PortfolioModal from "./components/PortfolioModal";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import { PRODUCTS } from "./constants";
import { CartItem, PortfolioItem } from "./types";

function App() {
  const [currentView, setCurrentView] = useState<"home" | "order">("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Portfolio Modal State
  const [selectedPortfolioItem, setSelectedPortfolioItem] =
    useState<PortfolioItem | null>(null);

  // Toast Notification State
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState<string>("");

  // Add item to cart logic
  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Show toast notification
    setToastProduct(product.title);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigateTo = (view: "home" | "order", sectionId?: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    if (view === "home" && sectionId) {
      // Use a slight delay to ensure the view has switched if coming from 'order'
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-serif selection:bg-stone-200">
      <Navbar
        cart={cart}
        currentView={currentView}
        navigateTo={navigateTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-16 md:pt-20">
        {currentView === "home" ? (
          <>
            <Hero navigateTo={navigateTo} />
            <About />
            <ShopCarousel
              addToCart={addToCart}
              cart={cart}
              navigateTo={navigateTo}
            />
            <Portfolio setSelectedPortfolioItem={setSelectedPortfolioItem} />
            <Contact />
          </>
        ) : (
          /* Order View */
          <div className="py-12 bg-stone-50 min-h-screen animate-ink">
            <OrderForm
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onBack={() => navigateTo("home", "shop")}
              onClearCart={clearCart}
            />
          </div>
        )}
      </main>

      <PortfolioModal
        selectedPortfolioItem={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
      />

      <Toast showToast={showToast} toastProduct={toastProduct} />

      <Footer />
    </div>
  );
}

export default App;
