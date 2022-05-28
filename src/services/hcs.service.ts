import qs from 'qs';
import request from '../helpers/request';

function membersGeneral({organization, tag, ...params}: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/organizations/${organization}/members/general`, params, {...config});
}

function tripVaccinationGeneral({...params}: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/vaccines/general`, params, {...config});
}

function tripTestResultsGeneral({...params}: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/test-results/general`, params, {...config});
}

function tripVaccinationOverview(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/vaccines/category-based`, params, {...config});
}

function tripsCount(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/count`, params, {...config});
}

function patientsAfterTrip(params: any, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/trips/test-results/unwell/after-trip/time-based`, params, {
      ...config,
    });
}

function membersTagBased(
  {
    organization,
    ...params
  }: {
    organization: string;
    params?: {tagPattern: string; tags: any; from: string; to: string};
  },
  config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/hcs-reporter/organizations/${organization}/members/tag-based?${qs.stringify(params, {
        arrayFormat: 'comma',
      })}`,
      {},
      {...config}
    );
}

function testResultTimeBased(
  {
    organization,
    ...params
  }: {
    organization: string;
    params?: {status: string; type: string; from: string; to: string; tag: string};
  },
  config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/hcs-reporter/organizations/${organization}/test-results/time-based?${qs.stringify(
        params,
        {
          arrayFormat: 'comma',
        }
      )}`,
      {},
      {...config}
    );
}

function testResultTagBased(
  {
    organization,
    ...params
  }: {
    organization: string;
    params?: {tagPattern: string; from: string; to: string};
  },
  config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/hcs-reporter/organizations/${organization}/test-results/tag-based?${qs.stringify(
        params,
        {arrayFormat: 'comma'}
      )}`,
      {},
      {...config}
    );
}

function dosesTagBased(
  {organization, ...params}: {organization: string; params: any},
  config?: any
) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(
      `/api/v1/hcs-reporter/organizations/${organization}/vaccines/doses/tag-based?${qs.stringify(
        params,
        {arrayFormat: 'comma'}
      )}`,
      {},
      {...config}
    );
}

function doses({organization, ...params}: {organization: string; params: any}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/organizations/${organization}/vaccines/doses`, params, {...config});
}

function tags({organization, ...params}: {organization: string; params?: any}, {...config}) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/organizations/${organization}/tags`, params, {...config});
}

function vaccinationOverview(tag: string, category: string, params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/vaccines/tags/${tag}/categories/${category}`, params, {...config});
}
function PeopleVaccinationOverview(  {tag, category, ...params}: any = {},
  config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/people/vaccines/tags/${tag}/categories/${category}`, params, {...config});
}


function PeopleLatestVaccinationOverview( params:any,
  config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/people/vaccines/general`, params, {...config});
}

function testResults(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/test-results/general`, params, {...config});
}

function tableOverviewTestResults(tag: string, category: string, params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/test-results/overview/tags/${tag}/categories/${category}`, params, {
      ...config,
    });
}

function testResultsCategory(tag: string, category: string, params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/test-results/tags/${tag}/categories/${category}`, params, {
      ...config,
    });
}

function columnChartTestResultService(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/test-results/overview/time-based`, params, {
      ...config,
    });
}

function getPeopleVaccine(params: any = {}, config?: any) {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get(`/api/v1/hcs-reporter/people/vaccines/general`, params, {
      ...config,
    });
}

const hcsService = {
  membersGeneral,
  tripVaccinationGeneral,
  tripTestResultsGeneral,
  tripVaccinationOverview,
  tripsCount,
  patientsAfterTrip,
  membersTagBased,
  testResultTagBased,
  testResultTimeBased,
  doses,
  dosesTagBased,
  tags,
  vaccinationOverview,
  testResults,
  tableOverviewTestResults,
  testResultsCategory,
  columnChartTestResultService,
  PeopleVaccinationOverview,
  PeopleLatestVaccinationOverview,
  getPeopleVaccine,
};

export default hcsService;
