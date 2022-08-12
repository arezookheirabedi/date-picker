import request from '../helpers/request';

function getProvince({...params}: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/fs/provinces/list`, params, {...config});
}

function getCities(provinceCode: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/fs/provinces/province/${provinceCode}/cities`, {...config});
}

function addUser(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/fs/users?lang=fa`, params);
}

function addInspector(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/inspection/inspectors/bakeries?lang=fa`, params);
}

const fsServices = {
  getProvince,
  getCities,
  addUser,
  addInspector,
};

export default fsServices;
