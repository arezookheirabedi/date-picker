import request from '../helpers/request';

function getInspector(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/inspection/inspectors/bakeries`, params, {...config});
}

const inspectorServices = {
  getInspector,
};

export default inspectorServices;
