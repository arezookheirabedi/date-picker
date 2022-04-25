import qs from 'qs';
import request from '../helpers/request';

function numberOfDrivers(province: any = null, config?: any) {
  return request.withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfDrivers: true,
      province,
    }, { ...config });
}

function numberOfPositiveDrivers(province: any = null, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfPositiveDrivers: true,
      province,
    }, { ...config });
}

function numberOfRecoveredDrivers(province: any = null, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfRecoveredDrivers: true,
      province,
    }, { ...config });
}

function numberOfVaccination(province: any = null, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfVaccination: true,
      province,
    }, { ...config });
}

function numberOfPlaqueVisited(province: any = null, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfPlaqueVisited: true,
      province,
    }, { ...config });
}

function numberOfTestResults(province: any = null, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfTestResults: true,
      province,
    }, { ...config });
}

function numberOfPositivePlaqueVisited(province: any = null, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/general${province ? '/province' : ''}`, {
      numberOfPositivePlaqueVisited: true,
      province,
    }, { ...config });
}

function testsInTransport(params: any, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/cars/health/test-results/service-type-based/count?lang=fa`, params, { ...config });
}

function overviewCategory(params: any, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(`/api/v1/transport/cars/service-type-based/count?lang=fa`, params, { ...config });
}

function overviewVaccine(params: any, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(`/api/v1/transport/reports/vaccine?lang=fa`, params, { ...config });
}

function reportsDose(params: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/transport/reports/dose?lang=fa`, params, { ...config });
}

function overviewVaccinePercent(params: any, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(`/api/v1/transport/drivers/health/vaccination-doses/service-based/count?lang=fa`, params, { ...config });
}

function linearOverviewPublicTransport(params: any, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(`/api/v1/transport/drivers/health/test-result/time-based/count?lang=fa`, params, { ...config });
}

function fetchRequestedReports(params: any, config: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(
      `/api/v1/transport/reports/drivers?lang=fa&${qs.stringify(params)}`,
      {}, { ...config }
    );
}

function requestReport(params: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .post(
      `/api/v1/transport/reports/drivers/request?lang=fa&${qs.stringify(params, { arrayFormat: "comma" })}`,
      {}
    );
}

function confirmRequestReport(code: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .post(`/api/v1/transport/reports/drivers/request/confirm/${code}?lang=fa`, {});
}

function overviewReport(params: any, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(`/api/v1/transport/reports/drivers/overview?lang=fa`, params, { ...config });
}

function preDownloadReport(id: string, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .post(`/api/v1/transport/reports/drivers/prepare/${id}?lang=fa`, {}, { ...config });
}

function retryReport(id: string, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .post(`/api/v1/transport/reports/drivers/request/retry/${id}?lang=fa`, {}, { ...config });
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
  fetchRequestedReports,
  overviewReport,
  requestReport,
  confirmRequestReport,
  preDownloadReport,
  retryReport
};
