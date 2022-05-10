import request from '../helpers/request';

function getProfilesNumber() {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get('/api/v1/fs/reports/profiles/count');
}

function getServicesTotalStatistic() {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get('/api/v1/hcs-reporter/services/total')
}

function getServicesStatistic() {
  return request
    .withHeaders({'Content-Type': 'application/json;utf-8'})
    .build()
    .get('/api/v1/hcs-reporter/services')
}


export default {
  getProfilesNumber,
  getServicesTotalStatistic,
  getServicesStatistic
}