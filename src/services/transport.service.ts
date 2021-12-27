import qs from 'qs';
import request from '../helpers/request';

function numberOfDrivers(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfDrivers: true,
      province,
    });
}

function numberOfPositiveDrivers(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfPositiveDrivers: true,
      province,
    });
}

function numberOfRecoveredDrivers(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfRecoveredDrivers: true,
      province,
    });
}

function numberOfVaccination(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfVaccination: true,
      province,
    });
}

function numberOfPlaqueVisited(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfPlaqueVisited: true,
      province,
    });
}

function numberOfTestResults(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfTestResults: true,
      province,
    });
}

function numberOfPositivePlaqueVisited(province: any = null) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfPositivePlaqueVisited: true,
      province,
    });
}

function testsInTransport(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/cars/health/test-results/service-type-based/count?lang=fa`, params);
}

function overviewCategory(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/cars/service-type-based/count?lang=fa`, params);
}

function overviewVaccine(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/reports/vaccine?lang=fa`, params);
}

function reportsDose(params: any = {}) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/dose?lang=fa`, params);
}

function overviewVaccinePercent(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/drivers/health/vaccination-doses/service-based/count?lang=fa`, params);
}

function linearOverviewPublicTransport(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/drivers/health/test-result/time-based/count?lang=fa`, params);
}

function requestReport(params: {from: string; to: string}) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .post(
      `/api/v1/transport/reports/drivers/overview/csv/request?lang=fa&${qs.stringify(params)}`,
      {}
    );
}

function confirmRequestReport(code: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .post(`/api/v1/transport/reports/drivers/overview/csv/request/confirm/${code}?lang=fa`, {});
}

function overviewReport(params: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/reports/drivers/overview?lang=fa`, params);
}

export default {
  testsInTransport,
  overviewCategory,
  overviewVaccine,
  reportsDose,
  overviewVaccinePercent,
  numberOfDrivers,
  numberOfPlaqueVisited,
  numberOfPositiveDrivers,
  numberOfPositivePlaqueVisited,
  numberOfRecoveredDrivers,
  numberOfTestResults,
  numberOfVaccination,
  linearOverviewPublicTransport,
  overviewReport,
  requestReport,
  confirmRequestReport,
};
