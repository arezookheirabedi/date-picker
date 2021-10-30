declare global {
  interface String {
    toPersianDigits(): string;
    toEnglishDigits(): string;
  }
}

// eslint-disable-next-line
String.prototype.toPersianDigits = function () {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return this.replace(/[0-9]/g, w => id[+w]);
};


// eslint-disable-next-line
String.prototype.toEnglishDigits = function () {
  const id: any = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };
  return this.replace(/[^0-9.]/g, (w: any) => id[w] || w);
};

export {};
