import React from "react";
import { X, Check, Share2 } from "lucide-react";
import { PortfolioItem } from "../types";

interface PortfolioModalProps {
  selectedPortfolioItem: PortfolioItem | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({
  selectedPortfolioItem,
  onClose,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  // Handle Share Logic
  const handleShare = async (item: PortfolioItem) => {
    const shareData = {
      title: `工程師寫書法 - ${item.title}`,
      text: `欣賞這幅書法作品：「${item.title}」\n${item.description || ""}`,
      url: window.location.href, // In a real routing app, this would be a specific URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  if (!selectedPortfolioItem) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-sm animate-ink"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-5xl w-full max-h-[95vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl rounded-sm tech-corner"
        onClick={(e) => e.stopPropagation()}
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
              <h2 className="text-4xl font-bold font-serif text-stone-900">
                {selectedPortfolioItem.title}
              </h2>
              <button
                onClick={onClose}
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
                <span className="font-bold text-stone-400 w-12 uppercase tracking-wider">
                  Year
                </span>
                <span className="text-stone-900">
                  {selectedPortfolioItem.year}
                </span>
              </p>
              {selectedPortfolioItem.dimensions && (
                <p className="flex items-center gap-3 border-b border-stone-100 pb-3">
                  <span className="font-bold text-stone-400 w-12 uppercase tracking-wider">
                    Size
                  </span>
                  <span className="text-stone-900">
                    {selectedPortfolioItem.dimensions}
                  </span>
                </p>
              )}
              {selectedPortfolioItem.description && (
                <div className="pt-2 font-serif text-base">
                  <p className="leading-relaxed italic text-stone-700">
                    "{selectedPortfolioItem.description}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="mt-8 pt-6 border-t border-stone-200">
            <button
              onClick={() => handleShare(selectedPortfolioItem)}
              className="flex items-center justify-center gap-2 w-full border border-stone-300 py-3 text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all active:scale-95 group font-mono text-sm"
            >
              {isCopied ? <Check size={18} /> : <Share2 size={18} />}
              <span>{isCopied ? "copied!" : "navigator.share()"}</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
