import request from "../helpers/request";


function testsInTransport(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/cars/health/test-results/service-type-based/count?lang=fa&status=POSITIVE&status=NEGATIVE`, params);
}


function overviewCategory(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8", timeout: (3 * 60 * 1000) })
    .build().get(`/api/v1/transport/cars/service-type-based/count?lang=fa`, params);
}

function numberOfDrivers() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfDrivers: true
    });
}

function numberOfPlaqueVisited() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfPlaqueVisited: true
    });
}

function numberOfPositiveDrivers() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfPositiveDrivers: true
    });
}

function numberOfPositivePlaqueVisited() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfPositivePlaqueVisited: true
    });
}

function numberOfRecoveredDrivers() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfRecoveredDrivers: true
    });
}

function numberOfTestResults() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfTestResults: true
    });
}

function numberOfVaccination() {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8" })
    .build().get(`/api/v1/transport/reports/general`, {
      numberOfVaccination: true
    });
}


function overviewVaccine(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8", timeout: (3 * 60 * 1000) })
    .build().get(`/api/v1/transport/reports/vaccine?lang=fa`, params);
}

function overviewVaccinePercent(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8", timeout: (3 * 60 * 1000) })
    .build().get(`/api/v1/transport/drivers/health/vaccination-doses/service-based/count?lang=fa`, params);
}

function linearOverviewPublicTransport(params: any) {
  return request
    .withHeaders({ "Content-Type": "application/json;utf-8", timeout: (3 * 60 * 1000) })
    .build().get(`/api/v1/transport/drivers/health/test-result/time-based/count?lang=fa`, params);
}

export default {
  testsInTransport,
  overviewCategory,
  overviewVaccine,
  overviewVaccinePercent,
  numberOfDrivers,
  numberOfPlaqueVisited,
  numberOfPositiveDrivers,
  numberOfPositivePlaqueVisited,
  numberOfRecoveredDrivers,
  numberOfTestResults,
  numberOfVaccination,
  linearOverviewPublicTransport
}