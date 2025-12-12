import React, { useState } from 'react';
import { CartItem, OrderFormState } from '../types';
import { Trash2, ChevronLeft, CheckCircle2, CreditCard, Calendar, Loader2 } from 'lucide-react';

// Google Form Configuration
// 1. Create a Google Form with these fields (Short Answer for most, Paragraph for 'Order Details').
// 2. Get the specific 'entry.xxxxxx' ID for each field by inspecting the form preview or using 'Get pre-filled link'.
// 3. Paste the IDs below inside the quotes.
const GOOGLE_FORM_CONFIG = {
  // Google Form action URL (read from .env.local)
  FORM_ACTION_URL: import.meta.env.VITE_GOOGLE_FORM_URL,
  
  // Replace these with your specific entry IDs from your Google Form
  ENTRY_IDS: {
    name: 'entry.1756594969',           // 1111 - 姓名
    phone: 'entry.1033544179',          // 2222 - 電話
    email: 'entry.1219332612',          // 3333 - Email
    address: 'entry.33586878',          // 4444 - 地址
    orderDetails: 'entry.61059090',     // 5555 - 訂單內容
    totalAmount: 'entry.569083998',     // 6666 - 總金額
    bankLast5: 'entry.854245075',       // 77777 - 帳號末五碼
    remittanceDate: 'entry.184934367',  // 2025-12-13 - 匯款日期
    message: 'entry.676429565',         // 8888 - 備註
  }
};

interface OrderFormProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onClearCart: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ cart, onUpdateQuantity, onRemoveItem, onBack, onClearCart }) => {
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 60;
  const totalAmount = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Phone validation: 09xxxxxxxx (10 digits) or 09xx-xxx-xxx
    // Remove hyphens and spaces for checking
    const cleanPhone = formData.phone.replace(/[-\s]/g, '');
    const phoneRegex = /^09\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = '請輸入正確的手機號碼格式 (例: 0912-345-678)';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '請輸入正確的 Email 格式';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("購物車是空的");
      return;
    }

    if (!validateForm()) {
      // Scroll to top or first error could be good, but simple return is enough for now
      return;
    }

    setIsSubmitting(true);

    // 1. Format order details into a string
    const orderSummary = cart.map(item => 
      `${item.title} (${item.dimensions}) x ${item.quantity} - $${item.price * item.quantity}`
    ).join('\n');

    //2. Submit using hidden iframe (most reliable method for Google Forms)
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_FORM_CONFIG.FORM_ACTION_URL;
    form.target = 'hidden_iframe';

    // Helper to create hidden input fields
    const addField = (name: string, value: string | number) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = String(value);
      form.appendChild(input);
    };

    // Add all form fields
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.name, formData.name);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.phone, formData.phone);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.email, formData.email);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.address, formData.address);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.orderDetails, `${orderSummary}\n\n總計: $${totalAmount}`);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.totalAmount, totalAmount);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.bankLast5, formData.bankLast5);
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.remittanceDate, formData.remittanceDate);
    
    // Append date to message as backup
    const finalMessage = `${formData.message || '無'} \n(匯款日期: ${formData.remittanceDate})`;
    addField(GOOGLE_FORM_CONFIG.ENTRY_IDS.message, finalMessage);

    // Append form to body and submit
    document.body.appendChild(form);
    form.submit();

    // Clean up after a short delay
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);

    setIsSubmitted(true);
    onClearCart(); // Clear cart after successful submission
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 animate-ink">
        <CheckCircle2 size={64} className="text-stone-800 mb-6" />
        <h2 className="text-3xl font-bold mb-4 font-serif text-stone-900">感謝您的訂購</h2>
        <p className="text-lg text-stone-600 mb-8 max-w-md">
          您的訂單已成功送出！訂單確認後會發送確認信件至您的 Email，我們會盡快核對款項並為您出貨。
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
          
          <div className="bg-stone-50 p-4 rounded mb-6 text-sm text-stone-600 border-l-4 border-stone-300">
            <ul className="list-disc pl-5 space-y-1">
              <li>請於填寫表單後三日內完成匯款, 確認成功後會寄信通知。</li>
              <li>僅提供 7-11 與全家店到店，運費 $60（顯示於總額） 需自行負擔。</li>
              <li>商品將於匯款確認成功後 10 個工作日內寄出。</li>
              <li>若有客製化需求請私訊 @calligraphy.kk 詢問。</li>
            </ul>
          </div>
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
                className={`w-full border-b bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors ${errors.phone ? 'border-red-500' : 'border-stone-300'}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="09xx-xxx-xxx"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                className={`w-full border-b bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors ${errors.email ? 'border-red-500' : 'border-stone-300'}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">全家或711店到店名 / Store Name</label>
              <input 
                type="text" 
                name="address" 
                required 
                className="w-full border-b border-stone-300 bg-transparent py-2 focus:outline-none focus:border-stone-900 transition-colors"
                value={formData.address}
                onChange={handleChange}
                placeholder="請輸入超商門市名稱 (例: 全家-信義店)"
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
                <p>銀行代碼: 013 (國泰世華)</p>
                <p>帳號: 699505149126</p>
                <p>戶名: 龔芳俞</p>
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
              
              <div className="border-t border-stone-200 pt-4 mt-4 space-y-2">
                <div className="flex justify-between items-center text-stone-500 text-sm">
                  <span>商品小計 Subtotal</span>
                  <span className="font-mono">NT$ {subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-stone-500 text-sm">
                  <span>運費 Shipping</span>
                  <span className="font-mono">NT$ {shippingFee}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                  <span className="font-bold text-lg">總計 Total</span>
                  <span className="font-bold text-xl font-mono text-red-800">NT$ {totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;