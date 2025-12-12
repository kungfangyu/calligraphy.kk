export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'couplet' | 'artwork';
  dimensions?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  year: string;
  description?: string;
  dimensions?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  paymentMethod: 'transfer';
  bankLast5: string;
  remittanceDate: string;
}