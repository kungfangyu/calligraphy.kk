import React, { useState } from 'react';
import { CartItem, OrderFormState } from '../types';
import { Trash2, ChevronLeft, CheckCircle2, CreditCard, Calendar, Loader2 } from 'lucide-react';

// IMPORTANT: Replace this URL with your actual deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GAS_WEB_APP_URL'; 

interface OrderFormProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ cart, onUpdateQuantity, onRemoveItem, onBack }) => {
  const [formData, setFormData] = useState<OrderFormState>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    paymentMethod: 'transfer',
    bankLast5: '',
    remittanceDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("購物車是空的");
      return;
    }

    if (GOOGLE_SCRIPT_URL === 'YOUR_GAS_WEB_APP_URL') {
      alert("請注意：您尚未設定 Google Apps Script URL。請按照說明部署後，在代碼中替換 URL。");
      // Fallback for demo purposes only
    }

    setIsSubmitting(true);

    const orderData = {
      ...formData,
      cart: cart,
      totalAmount: totalAmount
    };

    try {
      // Send data to Google Apps Script
      // Note: 'no-cors' mode is often required for GAS Web Apps if not handling CORS explicitly in the script,
      // but 'text/plain' content-type usually bypasses the preflight check.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', 
        },
        body: JSON.stringify(orderData),
      });

      // Since GAS usually returns an opaque response in simple setups or redirects,
      // we assume success if no network error occurred.
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Submission error:", error);
      alert("訂單送出失敗，請檢查網路連線或稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-ink">
        <CheckCircle2 size={64} className="text-stone-800 mb-6" />
        <h2 className="text-3xl font-bold mb-4 font-serif text-stone-900">感謝您的訂購</h2>
        <p className="text-lg text-stone-600 mb-8 max-w-md">
          您的訂單已成功送出！確認信件已發送至您的 Email，我們會盡快核對款項並為您出貨。
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-stone-900 text-stone-50 hover:bg-stone-700 transition-colors duration-300"
        >
          返回首頁
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 shadow-sm border border-stone-200">
      <button 
        onClick={onBack}
        className="flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors"
      >
        <ChevronLeft size={20} className="mr-1" /> 返回作品列表
      </button>

      <h2 className="text-3xl font-bold mb-10 text-stone-900 font-serif border-b pb-4 border-stone-200">
        訂購確認單
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Col: Form */}
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center mr-3 text-sm">1</span>
            填寫訂購資訊
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">姓名 / Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors"
                value={formData.name}
                onChange={handleChange}
                placeholder="請輸入您的真實姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">電話 / Phone</label>
              <input 
                type="tel" 
                name="phone" 
                required 
                className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09xx-xxx-xxx"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">收件地址 / Address</label>
              <input 
                type="text" 
                name="address" 
                required 
                className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors"
                value={formData.address}
                onChange={handleChange}
                placeholder="請輸入完整收件地址（含郵遞區號）"
              />
            </div>
             <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">備註 / Note</label>
              <textarea 
                name="message" 
                rows={2}
                className="w-full border border-stone-300 bg-stone-50 p-2 focus:outline-none focus:border-stone-900 transition-colors mt-1"
                value={formData.message}
                onChange={handleChange}
                placeholder="若選購客製化商品，請在此填寫內容"
              />
            </div>
            
            <div className="pt-6">
               <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center mr-3 text-sm">2</span>
                匯款驗證
              </h3>
              
              <div className="bg-stone-100 p-4 rounded mb-6 text-sm text-stone-700 font-mono leading-relaxed border-l-4 border-stone-900">
                <p>銀行代碼: 822 (中國信託)</p>
                <p>帳號: 1234-5678-9012</p>
                <p>戶名: 工程師寫書法工作室</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <CreditCard size={14} /> 帳號末五碼
                  </label>
                  <input 
                    type="text" 
                    name="bankLast5" 
                    required 
                    maxLength={5}
                    className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors font-mono"
                    value={formData.bankLast5}
                    onChange={handleChange}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <Calendar size={14} /> 匯款日期
                  </label>
                  <input 
                    type="date" 
                    name="remittanceDate" 
                    required 
                    className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors font-mono"
                    value={formData.remittanceDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-stone-900 text-white py-4 mt-8 text-lg tracking-widest hover:bg-red-900 transition-colors duration-300 shadow-lg flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> 處理中...
                </>
              ) : (
                `送出訂單 | NT$ ${totalAmount}`
              )}
            </button>
          </form>
        </div>

        {/* Right Col: Cart Summary */}
        <div className="bg-stone-50 p-6 h-fit sticky top-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b border-stone-200">選購清單</h3>
          {cart.length === 0 ? (
            <p className="text-stone-500 py-4 text-center">尚未選擇任何作品</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start group">
                  <div className="flex-1">
                    <h4 className="font-bold text-stone-800">{item.title}</h4>
                    <p className="text-xs text-stone-500">{item.dimensions}</p>
                    <div className="flex items-center mt-2 space-x-2">
                       <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center border border-stone-300 hover:bg-stone-200"
                       >-</button>
                       <span className="text-sm w-4 text-center font-mono">{item.quantity}</span>
                       <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center border border-stone-300 hover:bg-stone-200"
                       >+</button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-mono text-stone-900 font-bold">NT$ {item.price * item.quantity}</span>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-700 mt-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-stone-200 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">總計 Total</span>
                <span className="font-bold text-xl font-mono text-red-800">NT$ {totalAmount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;