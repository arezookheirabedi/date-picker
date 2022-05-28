import {AxiosRequestConfig, AxiosResponse} from 'axios';
import request from '../helpers/request';

function numberOfDrivers(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfDrivers: true,
        province,
      },
      {...config}
    );
}

function numberOfPositiveDrivers(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfPositiveDrivers: true,
        province,
      },
      {...config}
    );
}

function numberOfRecoveredDrivers(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfRecoveredDrivers: true,
        province,
      },
      {...config}
    );
}

function numberOfVaccination(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfVaccination: true,
        province,
      },
      {...config}
    );
}

function numberOfPlaqueVisited(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfPlaqueVisited: true,
        province,
      },
      {...config}
    );
}

function numberOfTestResults(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfTestResults: true,
        province,
      },
      {...config}
    );
}

function numberOfPositivePlaqueVisited(province: any = null, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/transport/reports/general${province ? '/province' : ''}`,
      {
        numberOfPositivePlaqueVisited: true,
        province,
      },
      {...config}
    );
}

function testsInTransport(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/cars/health/test-results/service-type-based/count?lang=fa`, params, {
      ...config,
    });
}

function overviewCategory(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/cars/service-type-based/count?lang=fa`, params, {...config});
}

function overviewVaccine(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/reports/vaccine?lang=fa`, params, {...config});
}

function reportsDose(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/dose?lang=fa`, params, {...config});
}

function overviewVaccinePercent(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/drivers/health/vaccination-doses/service-based/count?lang=fa`, params, {
      ...config,
    });
}

function linearOverviewPublicTransport(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000})
    .build()
    .get(`/api/v1/transport/drivers/health/test-result/time-based/count?lang=fa`, params, {
      ...config,
    });
}
function overviewReport(
  {reportType, ...params}: any = {},
  config?: any
): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports/types/${reportType}`, params, {...config});
}

function transportReportoverviewStatus(
  {...params}: any = {},
  config?: any
): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/transport/reports`, params, {...config});
}
function requestOtpReport(
  {reportType, ...params}: any = {},
  config?: AxiosRequestConfig
): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/transport/reports/types/${reportType}/downloads/request?lang=fa`, params, {
      ...config,
    });
}

function confirmOtpReport({reportType, ...params}: any = {}): Promise<AxiosResponse<any>> {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .post(`/api/v1/transport/reports/types/${reportType}/downloads/confirm?lang=fa`, params);
}

function getSamasInfo(params: any, config?: any){
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8', timeout: 3 * 60 * 1000 })
    .build()
    .get(`/api/v1/transport/reports/types/samas/statistics`, params, { ...config });
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
  requestOtpReport,
  confirmOtpReport,
  overviewReport,
  getSamasInfo,
  transportReportoverviewStatus,

};
