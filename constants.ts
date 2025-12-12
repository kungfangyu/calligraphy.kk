import { PortfolioItem, Product } from "./types";

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: '靜',
    imageUrl: 'https://picsum.photos/id/10/800/1000',
    year: '2023',
    dimensions: '35x135cm',
    description: '心如止水，萬物皆靜。行書創作，墨色濃淡相間。'
  },
  {
    id: 'p2',
    title: '龍飛鳳舞',
    imageUrl: 'https://picsum.photos/id/1015/800/600',
    year: '2023',
    dimensions: '69x135cm',
    description: '展現狂草奔放之氣勢，筆觸蒼勁有力。'
  },
  {
    id: 'p3',
    title: '初心',
    imageUrl: 'https://picsum.photos/id/1016/800/1000',
    year: '2024',
    dimensions: '35x69cm',
    description: '莫忘初心，方得始終。隸書風格，古樸端莊。'
  },
  {
    id: 'p4',
    title: '行雲流水',
    imageUrl: 'https://picsum.photos/id/1043/800/800',
    year: '2024',
    dimensions: '50x50cm',
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