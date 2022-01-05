declare global {
  interface String {
    commaSeprator(): string;
    toPersianDigits(): string;
    toEnglishDigits(): string;
  }
  interface Number {
    commaSeprator(): string;
    toPersianDigits(): string;
  }

  // eslint-disable-next-line
  interface Array<T> {
    chunk(p:number) : string[][];
  }
}

// eslint-disable-next-line
String.prototype.commaSeprator = function () {
  return this.replaceAll(/(\d)(?=(\d{3})+$)/g, "$1,");
};

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



// eslint-disable-next-line
Number.prototype.commaSeprator = function () {
  // eslint-disable-next-line
  return (this + "").replaceAll(/(\d)(?=(\d{3})+$)/g, "$1,");
};

// eslint-disable-next-line
Number.prototype.toPersianDigits = function () {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  // eslint-disable-next-line
  return (this + "").replace(/[0-9]/g, w => id[+w]);
};

// eslint-disable-next-line
Array.prototype.chunk = function (n : number) {
  if ( !this.length ) return [];
  return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
};

export { };
