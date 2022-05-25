export const initialGtDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialDoses = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialDosesToTotalPopulationPercentage = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  null: 0,
};

export const initialVacinatelInfo = {
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  gtDoses: {...initialGtDoses},
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDosesToTotalPopulationPercentage},
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
  totalVaccinesCount: 0,
};
export interface IInitialVacinatelInfo {
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: any;
  doses: any;
  dosesToTotalPopulationPercentage: any;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
  totalVaccinesCount: number;
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

export const waterMelonMockData=[{
  "categoryValue": "دانش آموز پایه دوم",
  "membersCount": 1803713,
  "vaccinesCount": 328180,
  "vaccinesCountToMembersCountPercentage": 18.1946,
  "nonVaccinesCount": 1475533,
  "nonVaccinesCountToMembersCountPercentage": 81.8054
},
{
  "categoryValue": "دانش آموز پایه اول",
  "membersCount": 1731926,
  "vaccinesCount": 293500,
  "vaccinesCountToMembersCountPercentage": 16.9464,
  "nonVaccinesCount": 1438426,
  "nonVaccinesCountToMembersCountPercentage": 83.0536
},
{
  "categoryValue": "دانش آموز پایه سوم",
  "membersCount": 1373249,
  "vaccinesCount": 303919,
  "vaccinesCountToMembersCountPercentage": 22.1313,
  "nonVaccinesCount": 1069330,
  "nonVaccinesCountToMembersCountPercentage": 77.8687
},
{
  "categoryValue": "دانش آموز پایه چهارم",
  "membersCount": 1365631,
  "vaccinesCount": 376426,
  "vaccinesCountToMembersCountPercentage": 27.5642,
  "nonVaccinesCount": 989205,
  "nonVaccinesCountToMembersCountPercentage": 72.4358
},
{
  "categoryValue": "دانش آموز پایه پنجم",
  "membersCount": 1317065,
  "vaccinesCount": 412649,
  "vaccinesCountToMembersCountPercentage": 31.3309,
  "nonVaccinesCount": 904416,
  "nonVaccinesCountToMembersCountPercentage": 68.6691
},
{
  "categoryValue": "دانش آموز پایه ششم",
  "membersCount": 1305599,
  "vaccinesCount": 657503,
  "vaccinesCountToMembersCountPercentage": 50.3602,
  "nonVaccinesCount": 648096,
  "nonVaccinesCountToMembersCountPercentage": 49.6398
},
{
  "categoryValue": "دانش آموز پایه هفتم",
  "membersCount": 1262946,
  "vaccinesCount": 1117644,
  "vaccinesCountToMembersCountPercentage": 88.4949,
  "nonVaccinesCount": 145302,
  "nonVaccinesCountToMembersCountPercentage": 11.5051
},
{
  "categoryValue": "دانش آموز پایه هشتم",
  "membersCount": 1174217,
  "vaccinesCount": 1044213,
  "vaccinesCountToMembersCountPercentage": 88.9284,
  "nonVaccinesCount": 130004,
  "nonVaccinesCountToMembersCountPercentage": 11.0716
},
{
  "categoryValue": "دانش آموز پایه نهم",
  "membersCount": 1152902,
  "vaccinesCount": 1031822,
  "vaccinesCountToMembersCountPercentage": 89.4978,
  "nonVaccinesCount": 121080,
  "nonVaccinesCountToMembersCountPercentage": 10.5022
},
{
  "categoryValue": "دانش آموز پایه دهم",
  "membersCount": 1001812,
  "vaccinesCount": 909721,
  "vaccinesCountToMembersCountPercentage": 90.8075,
  "nonVaccinesCount": 92091,
  "nonVaccinesCountToMembersCountPercentage": 9.1925
},
{
  "categoryValue": "دانش آموز پایه یازدهم",
  "membersCount": 942594,
  "vaccinesCount": 846000,
  "vaccinesCountToMembersCountPercentage": 89.7523,
  "nonVaccinesCount": 96594,
  "nonVaccinesCountToMembersCountPercentage": 10.2477
},
{
  "categoryValue": "دانش آموز پایه دوازدهم",
  "membersCount": 934779,
  "vaccinesCount": 840808,
  "vaccinesCountToMembersCountPercentage": 89.9472,
  "nonVaccinesCount": 93971,
  "nonVaccinesCountToMembersCountPercentage": 10.0528
},
{
  "categoryValue": "دانش آموز بزرگسال",
  "membersCount": 426435,
  "vaccinesCount": 369587,
  "vaccinesCountToMembersCountPercentage": 86.669,
  "nonVaccinesCount": 56848,
  "nonVaccinesCountToMembersCountPercentage": 13.331
},
{
  "categoryValue": "دانش آموز دوره آمادگی",
  "membersCount": 10480,
  "vaccinesCount": 1555,
  "vaccinesCountToMembersCountPercentage": 14.8377,
  "nonVaccinesCount": 8925,
  "nonVaccinesCountToMembersCountPercentage": 85.1623
},
{
  "categoryValue": "دانش آموز وقفه پایه",
  "membersCount": 3778,
  "vaccinesCount": 1295,
  "vaccinesCountToMembersCountPercentage": 34.2773,
  "nonVaccinesCount": 2483,
  "nonVaccinesCountToMembersCountPercentage": 65.7227
},
{
  "categoryValue": "دانش آموز چند پایه",
  "membersCount": 1398,
  "vaccinesCount": 649,
  "vaccinesCountToMembersCountPercentage": 46.4234,
  "nonVaccinesCount": 749,
  "nonVaccinesCountToMembersCountPercentage": 53.5766
},
{
  "categoryValue": "دانش آموز پیش دانشگاهی",
  "membersCount": 43,
  "vaccinesCount": 33,
  "vaccinesCountToMembersCountPercentage": 76.7441,
  "nonVaccinesCount": 10,
  "nonVaccinesCountToMembersCountPercentage": 23.2559
}]