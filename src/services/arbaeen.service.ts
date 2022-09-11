import qs from 'qs';
// import qs from 'qs';
import {EBORDERS} from 'src/constants/border.enum';
import request from '../helpers/request';

function arbaeenGetAll({tag, ...params}: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build({mock: true})
    .get(`/api/v1/arbaeen/all?lang=fa`, params, {...config});
}

function getPiligrimList(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports?lang=fa`, params, {...config});
}

function abroadList() {
  const mock = {
    data: [
      {key: EBORDERS.SHALAMCHE, value: 'شلمچه'},
      {key: EBORDERS.CHAZABE, value: 'چذابه'},
      {key: EBORDERS.MEHRAN, value: 'مهران'},
      {key: EBORDERS.KHOSRAVI, value: 'خسروی'},
      {key: EBORDERS.HAVAEE, value: 'هوایی'},
      {key: EBORDERS.BASHMAGH, value: 'باشماق'},
      {key: EBORDERS.TAMARCHIN, value: 'تمرچین'},
    ],
  };
  return Promise.resolve(mock);
}

function getPligrimGenderPerProvince(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/zaerin/group-by-province-and-gender/count?lang=fa`, params, {
      ...config,
    });
}

function getPligrimCountPerProvince(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/zaerin/group-by-province/count?lang=fa`, params, {
      ...config,
    });
}

function getPligrimGenderPerCity(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/zaerin/group-by-city-and-gender/count?lang=fa`, params, {
      ...config,
    });
}

function getPligrimCountPerBorder(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/arbaeen/reports/zaerin/group-by-departure-destination-border/count?lang=fa`,
      params,
      {
        ...config,
      }
    );
}

function getPilgrimCount(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/number-zaerin?lang=fa`, params, {
      ...config,
    });
}

function getPiligrimAgeRange(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/zaerin/group-by-age-group/count?lang=fa`, params, {
      ...config,
    });
}

function getVaccineInfo(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/arbaeen/reports/zaerin/group-by-last-dose-while-registered/count?lang=fa`,
      params,
      {
        ...config,
      }
    );
}

function getTheLatestVaccineInfo(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/zaerin/group-by-last-dose/count?lang=fa`, params, {
      ...config,
    });
}

function getPiligrimOriginProvince(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/arbaeen/reports/zaerin/group-by-departure-origin-province/general?lang=fa`,
      params,
      {
        ...config,
      }
    );
}

function getPiligrimOriginCity(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/arbaeen/reports/zaerin/group-by-departure-origin-city/general?lang=fa`, params, {
      ...config,
    });
}

function getPiligrimReportAsFile(params: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/reports/coordinates/csv?lang=fa`, params, {
    ...config,
  });
}

function getEntranceAxndExistanceBorder(params: any = [], config?: any) {
  return request.build().get(
    `/api/v1/arbaeen/borders-traffics?lang=fa&${qs.stringify({
      borderIdList: params.borderIdList,
    })}`,
    {},
    {
      ...config,
    }
  );
}

function gerBorderTraffic({...params}: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/borders-traffics/accumulative?lang=fa`, params, {
    ...config,
  });
}

function getMokebList({...params}: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/ar-mokebs?lang=fa`, params, {
    ...config,
  });
}

function getEmergencyList({...params}: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/ar-emergencies?lang=fa`, params, {
    ...config,
  });
}

function getEmergency(params: any, config?: any) {
  return request.build().get(
    `/api/v1/arbaeen/ar-emergencies/${params}/?lang=fa`,
    {},
    {
      ...config,
    }
  );
}

function getRoadStatistics({...params}: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/road-statistics/latest-submit/page?lang=fa`, params, {
    ...config,
  });
}

function getTheLatestBordersStatus({...params}: any = {}, config?: any) {
  // const lists = [250001, 500001, 1, 500002, 300001, 1500001, 1250001, 1750001, 750001];
  return request.build().get(
    `/api/v1/arbaeen/region-statistics/latest-submit/page?lang=fa&regionIdList=250001,500001,1,500002,300001,1500001,1250001,1750001,750001`,
    params,

    {
      ...config,
    }
  );
}

/* pageNumber=0&pageSize=10&sort=ASC&&&&&&&&& */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPilgrimExistanceAndImportanceChart(params: any = {}, config?: any) {
  // const lists = [3, 4, 1, 2, 500001, 500002];
  return request.build().get(
    `/api/v1/arbaeen/borders-traffics/accumulative-based-on-border-id?lang=fa&borderIdList=3,4,1,2,500001,500002`,
    {},
    {
      ...config,
    }
  );
}

function getRoadInfo(id: any, config?: any) {
  return request.build().get(
    `/api/v1/arbaeen/road-statistics/road-id/${id}?lang=fa`,
    {},
    {
      ...config,
    }
  );
}

function getAirportAndBorderInfo(params: any, config?: any) {
  return request.build().get(`/api/v1/arbaeen/reports/region-traffic/count`, params, {
    ...config,
  });
}

function getMokeb(id: any, config?: any) {
  return request.build().get(
    `/api/v1/arbaeen/ar-mokebs/${id}`,
    {},
    {
      ...config,
    }
  );
}

function getPolygonData(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/arbaeen/reports/polygon/count`, params, {
      ...config,
    });
}

function getParckingList(params: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/ar-parkings`, params, {
    ...config,
  });
}

function getParking(params: any = {}, config?: any) {
  return request.build().get(
    `/api/v1/arbaeen/ar-parkings/${params}`,
    {},
    {
      ...config,
    }
  );
}

function getRedCrescent(params: any = {}, config?: any) {
  return request.build().get(
    `/api/v1/arbaeen/ar-helalahmars/${params}`,
    {},
    {
      ...config,
    }
  );
}

function getBorderListById() {
  const mock = {
    data: [
      {key: '3', value: 'شلمچه'},
      {key: '4', value: 'چذابه'},
      {key: '1', value: 'مهران'},
      {key: '2', value: 'خسروی'},
      {key: '500001', value: 'باشماق'},
      {key: '500002', value: 'تمرچین'},
    ],
  };
  return Promise.resolve(mock);
}
function getHelelList(params: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/ar-helalahmars?lang=fa`, params, {
    ...config,
  });
}
function pilgrimsInquiryByNationalId({nationalId, ...params}: any = {}, config?: any) {
  return request
    .build()
    .get(`/api/v1/arbaeen/reports/qr-code/national-id/${nationalId}?lang=fa`, params, {
      ...config,
    });
}
const arbaeenService = {
  getBorderListById,
  arbaeenGetAll,
  getPiligrimList,
  abroadList,
  getPligrimGenderPerProvince,
  getPligrimCountPerBorder,
  getPilgrimCount,
  getPiligrimAgeRange,
  getVaccineInfo,
  getPligrimGenderPerCity,
  getPiligrimOriginProvince,
  getPiligrimOriginCity,
  getTheLatestVaccineInfo,
  getPiligrimReportAsFile,
  getEntranceAxndExistanceBorder,
  getPilgrimExistanceAndImportanceChart,
  gerBorderTraffic,
  getMokebList,
  getRoadStatistics,
  getTheLatestBordersStatus,
  getRoadInfo,
  getAirportAndBorderInfo,
  getMokeb,
  getEmergencyList,
  getParckingList,
  getPligrimCountPerProvince,
  getPolygonData,
  getEmergency,
  getParking,
  getRedCrescent,
  getHelelList,
  pilgrimsInquiryByNationalId,
};

export default arbaeenService;
