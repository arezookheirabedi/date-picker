import request from "../helpers/request";


function testsInTransport(params: any) {
  return request
    .withHeaders({"Content-Type": "application/json;utf-8"})
    .build().get(`/api/v1/transport/cars/health/test-results/service-type-based/count`, params);
}

export default {
  testsInTransport
}