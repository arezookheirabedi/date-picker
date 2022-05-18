export enum ETestStatus {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  UNKNOWN = 'UNKNOWN',
}
export const getHealthStatusTextAndColor = (status: any) => {
  let colors = 'text-gray-400';
  let text = '-';
  if (status) {
    if (status === ETestStatus.POSITIVE) {
      colors = 'text-red-700';
      text = 'مثبت';
    } else if (status === ETestStatus.NEGATIVE) {
      colors = 'text-green-700';
      text = 'منفی';
    } else if (status === ETestStatus.UNKNOWN) {
      colors = 'text-gray-400'; // white
      text = 'فاقد آزمایش';
    }
  }
  return {colors, text};
};

export const getStatusColor = (status: any) => {
  let colors = 'from-gray-400 to-gray-300';
  if (status) {
    if (status === ETestStatus.UNKNOWN) {
      colors = 'from-orange-600 to-orange-400';
    } else if (status === ETestStatus.POSITIVE) {
      colors = 'from-red-700 to-red-500';
    } else if (status === ETestStatus.NEGATIVE) {
      colors = 'from-green-600 to-green-500';
    }
  }
  return {colors};
};

export const getVaccinesStatusText = (vaccines: number) => {
  let text = '-';
  if (vaccines || vaccines === 0) {
    if (vaccines > 2) {
      text = 'دوز سوم و بیشتر';
    } else if (vaccines > 1) {
      text = 'دوز دوم';
    } else if (vaccines > 0) {
      text = 'دوز اول';
    }
  }
  return {text};
};

export const data111 = [
  {province: 'تهران', register: 3290, unregister: 7960},
  {province: 'خراسان رضوی', register: 1930, unregister: 2694},
  {province: 'مازندران', register: 1606, unregister: 639},
  {province: 'فارس', register: 1376, unregister: 1884},
  {province: 'آذربایجان شرقی', register: 1205, unregister: 1735},
  {province: 'گیلان', register: 1091, unregister: 1945},
  {province: 'خوزستان', register: 1024, unregister: 2128},
  {province: 'آذربایجان غربی', register: 1014, unregister: 866},
  {province: 'کرمان', register: 9290, unregister: 1056},
  {province: 'البرز', register: 7229, unregister: 1579},
  {province: 'گلستان', register: 5802, unregister: 78},
  {province: 'کرمانشاه', register: 5748, unregister: 490},
  {province: 'همدان', register: 5491, unregister: 844},
  {province: 'کردستان', register: 5411, unregister: 888},
  {province: 'مرکزی', register: 5048, unregister: 601},
  {province: 'یزد', register: 4410, unregister: 959},
  {province: 'لرستان', register: 4385, unregister: 1277},
  {province: 'بوشهر', register: 4166, unregister: 455},
  {province: 'هرمزگان', register: 4005, unregister: 868},
  {province: 'اردبيل', register: 3889, unregister: 623},
  {province: 'سیستان و بلوچستان', register: 3665, unregister: 852},
  {province: 'چهارمحال و بختیاری', register: 3651, unregister: 259},
  {province: 'قزوین', register: 3611, unregister: 341},
  {province: 'زنجان', register: 3371, unregister: 470},
  {province: 'قم', register: 2893, unregister: 673},
  {province: 'خراسان جنوبی', register: 2808, unregister: 346},
  {province: 'ایلام', register: 2794, unregister: 589},
  {province: 'سمنان', register: 2779, unregister: 325},
  {province: 'خراسان شمالی', register: 2685, unregister: 228},
  {province: 'کهگیلویه و بویراحمد', register: 2253, unregister: 354},
  {province: 'اصفهان', register: 2206, unregister: 371},
];
