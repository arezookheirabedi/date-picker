export const obj = {
  activationStatus: true,
  address: 'string',
  createdDate: '2022-05-30T10:57:53.779',
  guildManagementType: 'OWNER',
  inspectionDateTime: '2022-05-30T06:24:31.831',
  inspectionNumber: 'string',
  inspectionResult: 'string',
  inspectionType: 'ORDER',
  inspectorComment: 'string',
  inspectors: [
    {
      agentFrom: 'string',
      inspectorFirstName: 'string',
      inspectorId: 'string',
      inspectorLastName: 'string',
      inspectorNationalId: 'string',
    },
    {
      agentFrom: 'string',
      inspectorFirstName: 'string',
      inspectorId: 'string',
      inspectorLastName: 'string',
      inspectorNationalId: 'string',
    },
    {
      agentFrom: 'string',
      inspectorFirstName: 'string',
      inspectorId: 'string',
      inspectorLastName: 'string',
      inspectorNationalId: 'string',
    },
    {
      agentFrom: 'string',
      inspectorFirstName: 'string',
      inspectorId: 'string',
      inspectorLastName: 'string',
      inspectorNationalId: 'string',
    },
  ],
  lastInspectionDateTime: '2022-05-30T06:24:31.831',
  managerComment: 'string',
  operatorFirstName: 'string',
  operatorLastName: 'string',
  parameters: {
    afzoudaniha: ['ABE_BEHDASHTI'],
    arzeNanBeGheymateMosavab: true,
    balkonDarad: true,
    behdashtOmoumi: 'HIGH',
    darsadeSabousGiri: 0,
    ertefa: 0,
    estemaleDokhaniat: true,
    jameTedadeKargaran: 12,
    karteBehdasht: true,
    keyfiat: 'HIGH',
    khmirgir: ['ALUMINIUM'],
    mahaleEntezareMoshtariDarad: true,
    mahaleEsterahatDarad: true,
    mahaleNegahdariArdDarad: true,
    majmoueVahedhaDarShoa: 0,
    masahat: 0,
    mizaneTakhsis: [{count: 2, value: 5, flourType: 'flour test', branPercentage: 90.5}],
    mizeNansardkonDarad: true,
    mojoudiDarZamaneBazresi: [{emptyingDate: '2022-06-11', count: 2, fromCompany: 'test'}],
    moshtariMadari: 'HIGH',
    mozoueGozaresh: 'ARD_FOROUSHI',
    naneMantagheTaminAst: true,
    nerkhName: true,
    nezafateKargaran: 'HIGH',
    noeArd: 'string',
    noeDarbVaPanjareh: ['FELEZI_MOSHABAK'],
    noePokht: ['BARBARI'],
    parvaneKasbDarad: true,
    parvaneKasbRoyatGardid: true,
    poushesheDivarha: ['KASHI'], // start
    poushesheKaf: ['KASHI'],
    reayateVazneChaneVaNan: false,
    serviceBehdashtiDarad: true,
    tajhizateBehdashti: ['HASHARE_KOSH'],
    tanavoePokhtDarShoa: null,
    tarikheTakhlieArd: [{emptyingDate: '2022-06-11', count: 0, fromCompany: 'string'}],
    tedadeChaneGir: 10,
    tedadeForoushandeh: 3,
    tedadeKhamirGir: 6,
    tedadeNanDarar: null,
    tedadePokht: null,
    tedadeShater: 45,
    tozihat: 'string',
    vazeiateZaheri: 'HIGH',
    vazneChaneh: 0,
    zirZaminDarad: true,
  },
  permissionNumber: 'string',
  poses: [{posNumber: null, title: 'oooo', bank: 'DAMAVAND'}],
  qrCode: '610237842017',
  unitNumber: 'string',
};
export const mock = [{...obj}];

export enum EMoshtariMadari {
  HIGH = 'HIGH',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
}

export enum EInseptorOrder {
  ORDER = 'ORDER',
  PEOPLE = 'PEOPLE',
  PERIODIC = 'PERIODIC',
}
export enum EMozoeGozaresh {
  ARD_FOROUSHI = 'ARD_FOROUSHI',
  MIZANE_POKHT = 'MIZANE_POKHT',
  SAYER = 'SAYER',
}
export enum EOwnerType {
  OWNER = 'OWNER',
  RENTER = 'RENTER',
  STEWARD = 'STEWARD',
}
export enum EBank {
  PERSIAN = ' PERSIAN',
  DAMAVAND = 'DAMAVAND',
  MELAT = 'MELAT',
  PASARGAD = 'PASARGAD',
  SAMAN = 'SAMAN',
  ARIAN = 'ARIAN',
  PARSIAN = 'PARSIAN',
  SADAD = 'SADAD',
  ARVAND_OMID = 'ARVAND_OMID',
  AVA_KART = 'AVA_KART',
  IRAN_KISH = 'IRAN_KISH',
  SEPEHR = 'SEPEHR',
}
export const getPoseStatus = (data: EBank) => {
  switch (data) {
    case EBank.PERSIAN:
      return 'شرکت آسان پرداخت پرشین';
    case EBank.DAMAVAND:
      return 'شرکت الکترونیک کارت دماوند';
    case EBank.MELAT:
      return 'شرکت به پرداخت ملت';
    case EBank.PASARGAD:
      return 'شرکت پرداخت الکترونیک پاسارگاد';
    case EBank.SAMAN:
      return 'شرکت پرداخت الکترونیک سامان';
    case EBank.ARIAN:
      return 'شرکت پرداخت نوین آرین';
    case EBank.PARSIAN:
      return 'شرکت تجارت الکترونیک پارسیان';
    case EBank.SADAD:
      return 'شرکت پرداخت الکترونیک سداد';
    case EBank.ARVAND_OMID:
      return 'شرکت فراپردازان آروند امید';
    case EBank.AVA_KART:
      return 'شرکت فن آوا کارت';
    case EBank.IRAN_KISH:
      return 'شرکت کارت اعتباری ایران کیش';
    case EBank.SEPEHR:
      return 'شرکت پرداخت الکترونیک سپهر';
    default:
      return '-';
  }
};
export const getOwnerType = (data: EOwnerType) => {
  switch (data) {
    case EOwnerType.OWNER:
      return 'مالک';
    case EOwnerType.RENTER:
      return 'مستاجر';
    case EOwnerType.STEWARD:
      return 'مباشر';
    default:
      return '-';
  }
};

export const getInseptorType = (data: EInseptorOrder) => {
  switch (data) {
    case EInseptorOrder.ORDER:
      return 'دستوری';
    case EInseptorOrder.PEOPLE:
      return 'مردمی';
    case EInseptorOrder.PERIODIC:
      return 'دوره ای';
    default:
      return '-';
  }
};
export const getMoshtariMadari = (data: EMoshtariMadari) => {
  switch (data) {
    case EMoshtariMadari.HIGH:
      return 'خوب';
    case EMoshtariMadari.LOW:
      return 'ضعیف';
    case EMoshtariMadari.MEDIUM:
      return 'متوسط';
    default:
      return '-';
  }
};
export const getMozoeGozaresh = (data: EMozoeGozaresh) => {
  switch (data) {
    case EMozoeGozaresh.ARD_FOROUSHI:
      return 'آرد فروشی';
    case EMozoeGozaresh.MIZANE_POKHT:
      return 'میزان پخت';
    case EMozoeGozaresh.SAYER:
      return 'سایر';
    default:
      return '-';
  }
};
export const getAcctivationStatus = (data: any) => {
  switch (data) {
    case true:
      return 'فعال';
    case false:
      return 'غیرفعال';
    default:
      return '-';
  }
};
export const getBooleanValue = (data: any) => {
  switch (data) {
    case true:
      return 'دارد';
    case false:
      return 'ندارد';
    default:
      return '-';
  }
};
