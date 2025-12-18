// Google Form Configuration
// 1. Create a Google Form with these fields (Short Answer for most, Paragraph for 'Order Details').
// 2. Get the specific 'entry.xxxxxx' ID for each field by inspecting the form preview or using 'Get pre-filled link'.
// 3. Paste the IDs below inside the quotes.
export const GOOGLE_FORM_CONFIG = {
  FORM_ACTION_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSd5mXoTqDyPilRClJQ5tTNLeT48EI1_8GyDyYhyGkHLyfjIqg/formResponse',
  
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