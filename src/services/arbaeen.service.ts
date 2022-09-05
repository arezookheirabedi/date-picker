// import qs from 'qs';
import qs from 'qs';
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
function getEntranceAxndExistanceBorder({borderId, ...params}: any = {}, config?: any) {
  return request
    .build()
    .get(`/api/v1/arbaeen/borders-traffics/border-id/${borderId}?lang=fa`, params, {
      ...config,
    });
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
function getRoadStatistics({...params}: any = {}, config?: any) {
  return request.build().get(`/api/v1/arbaeen/road-statistics/latest-submit/page?lang=fa`, params, {
    ...config,
  });
}

function getTheLatestBordersStatus({...params}: any = {}, config?: any) {
  const lists = [250001, 500001, 1, 500002, 300001, 1500001, 1250001, 1750001, 750001];

  return request.build().get(
    `/api/v1/arbaeen/region-statistics/latest-submit/page?lang=fa&${qs.stringify({
      regionIdList: lists,
    })} `,
    params,
    {
      ...config,
    }
  );
}

/* pageNumber=0&pageSize=10&sort=ASC&&&&&&&&& */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPilgrimExistanceAndImportanceChart(params: any = {}, config?: any) {
  const lists = [3, 4, 1, 2, 500001, 500002];
  return request.build().get(
    `/api/v1/arbaeen/borders-traffics/accumulative-based-on-border-id?lang=fa&${qs.stringify({
      borderIdList: lists,
    })}`,
    {},
    {
      ...config,
    }
  );
}

const arbaeenService = {
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
  getEmergencyList,
};

export default arbaeenService;
