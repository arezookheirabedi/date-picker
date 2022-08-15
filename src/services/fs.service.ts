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
    .post(`/api/v1/fs/report-viewers/users?lang=fa`, params);
}

function addInspector(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/inspection/inspectors/bakeries?lang=fa`, params);
}
function updateUser(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .patch(`/api/v1/fs/report-viewers/users/username/${params.username}?lang=fa`, params);
}
function updateInspector(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .patch(`/api/v1/inspection/inspectors/bakeries/${params.id}?lang=fa`, params);
}

const fsServices = {
  getProvince,
  getCities,
  addUser,
  addInspector,
  updateUser,
  updateInspector,
};

export default fsServices;
