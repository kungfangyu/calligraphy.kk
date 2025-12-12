import { PortfolioItem, Product } from "./types";

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: '大展鴻圖',
    imageUrl: './collections/c08.jpg',
    year: '2025',
    dimensions: '36x48cm',
    description: '我送阿叔茶具他研磨下筆,直接給我四個字「大展宏圖」。'
  },
  {
    id: 'p2',
    title: '可愛萬物',
    imageUrl: './collections/c05.jpg',
    year: '2025',
    dimensions: '69x135cm',
    description: '展現狂草奔放之氣勢，筆觸蒼勁有力。'
  },
  {
    id: 'p3',
    title: '台灣加油',
    imageUrl: './collections/tw.jpg',
    year: '2025',
    dimensions: '',
    description: '台灣加油，我們一起加油。'
  },
  
  {
    id: 'p4',
    title: '山海',
    imageUrl: './collections/sea.jpg',
    year: '2024',
    dimensions: '36x48',
    description: '如行雲般自在，如流水般順暢。現代潑墨少字數創作。'
  },
  {
    id: 'p5',
    title: '偕老',
    imageUrl: './collections/c03.jpg',
    year: '2024',
    dimensions: '36x48cm',
    description: '如行雲般自在，如流水般順暢。現代潑墨少字數創作。'
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'c1',
    title: '金馬奔騰 | 豪華春聯套組',
    description: '手工灑金紅宣紙，包含七言對聯、橫批、斗方與掛飾，完整新春佈置。',
    price: 650,
    imageUrl: './couplets-horse-set.jpg',
    category: 'couplet',
    dimensions: '多尺寸組合'
  },
  {
    id: 'c2',
    title: '金馬立刻賺錢春聯組',
    description: '內含 七言對聯X1, 組合單字X3, 馬上有錢紅包X2, 四言春聯X1, 馬上有錢開運小吊飾X1。',
    price: 700,
    imageUrl: './set2.jpg',
    category: 'couplet',
    dimensions: '多尺寸組合'
  },
  {
    id: 'c3',
    title: '單字斗方 | 福',
    description: '飽滿圓潤的福字，象徵圓滿。',
    price: 150,
    imageUrl: 'https://picsum.photos/id/196/600/600',
    category: 'couplet',
    dimensions: '17x17cm'
  },
  {
    id: 'c4',
    title: '客製化姓名對聯',
    description: '請於備註欄位填寫想要嵌入的姓名或詞句。',
    price: 800,
    imageUrl: 'https://picsum.photos/id/214/600/600',
    category: 'couplet',
    dimensions: '17x112cm'
  },
   {
    id: 'c4',
    title: '客製化姓名對聯',
    description: '請於備註欄位填寫想要嵌入的姓名或詞句。',
    price: 800,
    imageUrl: 'https://picsum.photos/id/214/600/600',
    category: 'couplet',
    dimensions: '17x112cm'
  }
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/calligraphy.kk',
  instagramHandle: '@calligraphy.kk'
};