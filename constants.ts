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
    description: '萬物可愛, 可愛萬物。'
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
    year: '2025',
    dimensions: '36x48cm',
    description: '山海相依, 現代潑墨創作。'
  },
  {
    id: 'p5',
    title: '偕老',
    imageUrl: './collections/c03.jpg',
    year: '2025',
    dimensions: '36x48cm',
    description: '偕老白頭, 在這年代已經是最珍貴的存在。'
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
    description: '七言對聯X1, 組合單字X3, 馬上有錢紅包X2, 四言春聯X1, 開運小吊飾X1。',
    price: 700,
    imageUrl: './set2.jpg',
    category: 'couplet',
    dimensions: '多尺寸組合'
  },
  {
    id: 'c3',
    title: '馬上有錢斗方吊飾組',
    description: '馬上, 有錢。',
    price: 160,
    imageUrl: './set3.jpg',
    category: 'couplet',
    dimensions: '多尺寸組合'
  },
  {
    id: 'c4',
    title: '開運小吊飾（1個）',
    description: '內容可客製, 馬上開運！',
    price: 80,
    imageUrl: './small.jpg',
    category: 'couplet',
    dimensions: '多尺寸組合'
  },
   {
    id: 'c5',
    title: '馬上發財紅包組(2個）',
    description: '馬上有錢又發財',
    price: 80,
    imageUrl: './envelope.jpg',
    category: 'couplet',
    dimensions: '多尺寸組合'
  },

  {
    id: 'c7',
    title: '七字對聯組(黑墨）',
    description: '內含3張單字斗方,下單請註明居家or生意聯',
    price: 350,
    imageUrl: './c1.jpg',
    category: 'couplet',
    dimensions: ''
  },
  {
    id: 'c8',
    title: '七字對聯組（金墨）',
    description: '內含3張單字斗方, 下單請註明居家or生意聯',
    price: 400,
    imageUrl: './golden.jpg',
    category: 'couplet',
    dimensions: ''
  },
   {
    id: 'c10',
    title: '馬上有財賺斗方組',
    description: '2張單字斗方',
    price: 120,
    imageUrl: './earn.jpg',
    category: 'couplet',
    dimensions: '17x17cm'
  },
   {
    id: 'c9',
    title: '馬上有錢斗方組',
    description: '內含2張單字斗方',
    price: 120,
    imageUrl: './hourse.jpg',
    category: 'couplet',
    dimensions: '17x17cm'
  },
    {
    id: 'c6',
    title: '客製組合字斗方',
    description: '請在備注註明想要的內容（限定4個字）',
    price: 50,
    imageUrl: './customize.jpg',
    category: 'couplet',
    dimensions: '17x17cm'
  },
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/calligraphy.kk',
  instagramHandle: '@calligraphy.kk'
};