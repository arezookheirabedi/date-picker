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
function abroadListWithId() {
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
  abroadListWithId,
  getEntranceAxndExistanceBorder,
};

export default arbaeenService;
