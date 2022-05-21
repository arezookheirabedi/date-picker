export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};

export const initialVacinatelInfo = {
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  gtDoses: {...initialDoses},
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
};
export interface IInitialVacinatelInfo {
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: any;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
}
export const initialPcrInfo = {
  positiveMembersCount: 0,
  recoveredMembersCount: 0,
  testResultsCount: 0,
  recoveredMembersCountToTotalPopulationPercentage: 0,
  positiveMembersCountToTotalPopulationPercentage: 0,
};
export interface IInitialPcrInfo {
  positiveMembersCount: number;
  recoveredMembersCount: number;
  testResultsCount: number;
  positiveMembersCountToTotalPopulationPercentage: number;
  recoveredMembersCountToTotalPopulationPercentage: number;
}
export interface IInitialInquiry {
  total: number;
  qualified: number;
  disqualified: number;
}
export const initialInquiry = {
  total: 0,
  qualified: 0,
  disqualified: 0,
};
export interface IInitialNumberOfDoses {
  doses: any;
  dosesToTotalPopulationPercentage: any;
  gtDoses: any;
  gtDosesToTotalDosesPercentage: any;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalPopulation: number;
  totalUnknownVaccinesCount: number;
  totalVaccinesCount: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  // totalVaccinesPercentage: number,
}
export const initialNumberOfDoses = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  // totalVaccinesPercentage: 0,
};
export const mockRegisterPercentage = [
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
export const mockPcrPercentage = [
  {province: 'تهران', positive: 3290},
  {province: 'خراسان رضوی', positive: 1930},
  {province: 'مازندران', positive: 1606},
  {province: 'فارس', positive: 1376},
  {province: 'آذربایجان شرقی', positive: 1205},
  {province: 'گیلان', positive: 1091},
  {province: 'خوزستان', positive: 1024},
  {province: 'آذربایجان غربی', positive: 1014},
  {province: 'کرمان', positive: 9290},
  {province: 'البرز', positive: 7229},
  {province: 'گلستان', positive: 5802},
  {province: 'کرمانشاه', positive: 5748},
  {province: 'همدان', positive: 5491},
  {province: 'کردستان', positive: 5411},
  {province: 'مرکزی', positive: 5048},
  {province: 'یزد', positive: 4410},
  {province: 'لرستان', positive: 4385},
  {province: 'بوشهر', positive: 4166},
  {province: 'هرمزگان', positive: 4005},
  {province: 'اردبيل', positive: 3889},
  {province: 'سیستان و بلوچستان', positive: 3665},
  {province: 'چهارمحال و بختیاری', positive: 3651},
  {province: 'قزوین', positive: 3611},
  {province: 'زنجان', positive: 3371},
  {province: 'قم', positive: 2893},
  {province: 'خراسان جنوبی', positive: 2808},
  {province: 'ایلام', positive: 2794},
  {province: 'سمنان', positive: 2779},
  {province: 'خراسان شمالی', positive: 2685},
  {province: 'کهگیلویه و بویراحمد', positive: 2253},
  {province: 'اصفهان', positive: 2206},
];
export const converters = {
  fa(number: any) {
    return number.toString().replace(/\d/g, (d: any) => {
      return String.fromCharCode(d.charCodeAt(0) + 1728);
    });
  },
};
