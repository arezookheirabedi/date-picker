import request from "../helpers/request";


function testsInTransport(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/cars/health/test-results/service-type-based/count?lang=fa`, params);
}


function overviewCategory(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/cars/service-type-based/count?lang=fa`, params);
}

export default {
  testsInTransport,
  overviewCategory
}