interface ConfirmPopupProps {
    setShowConfirmation: (show: boolean) => void;
    handleConfirmedSubmit: () => Promise<void>
}

const ConfirmPopup = ({ setShowConfirmation, handleConfirmedSubmit }: ConfirmPopupProps) => {
    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-ink">
          <div className="bg-white p-8 rounded-sm shadow-2xl max-w-md w-full border border-stone-200 relative tech-corner">
             {/* Tech decoration */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-stone-900"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-stone-900"></div>
            
            <h3 className="text-xl font-bold mb-4 font-serif text-stone-900 text-center">
              確認送出訂單？
            </h3>
            <p className="text-stone-600 mb-8 text-center leading-relaxed">
              請確認您的訂購資訊與匯款後五碼是否正確。<br/>
              送出後將由專人為您核對並安排出貨。
            </p>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 border border-stone-300 text-stone-600 font-mono hover:bg-stone-50 transition-colors"
              >
                再想想
              </button>
              <button
                type="button"
                onClick={handleConfirmedSubmit}
                className="flex-1 py-3 bg-stone-900 text-white font-mono hover:bg-stone-700 transition-colors shadow-lg"
              >
                確認送出
              </button>
            </div>
          </div>
        </div>
    );
};

export default ConfirmPopup;