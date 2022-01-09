// import qs from 'qs';
import request from '../helpers/request';

function membersGeneral({ organization, tag, ...params }: any = {}) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build({mock: true})
    .get(`/api/v1/hcs-reporter/organizations/${organization}/member/general/${tag}`, params);
}

function membersTagBased({ organization, ...params }: { organization: string; params?: { tagPattern: string; from: string; to: string } }) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build({mock: true})
    .get(`/api/v1/hcs-reporter/organizations/${organization}/member/tag-based`, params);
}

function testResultTimeBased({ organization, ...params }: { organization: string; params?: { status: string; type: string; from: string; to: string; tag: string; } }) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build({mock: true})
    .get(`/api/v1/hcs-reporter/organizations/${organization}/test-result/time-based`, params);
}

function testResultTagBased({ organization, ...params }: { organization: string; params?: { tagPattern: string; from: string; to: string } }) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build({mock: true})
    .get(`/api/v1/hcs-reporter/organizations/${organization}/test-result/tag-based`, params);
}

function dosesTagBased({ organization }: { organization: string; }) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build({mock: true})
    .get(`/api/v1/hcs-reporter/organizations/${organization}/doses/tag-based`, {});
}

function doses({ organization }: { organization: string; }) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build({mock: true})
    .get(`/api/v1/hcs-reporter/organizations/${organization}/doses`, {});
}



const hcsService = {
  membersGeneral,
  membersTagBased,
  testResultTagBased,
  testResultTimeBased,
  doses,
  dosesTagBased,
}

export default hcsService;
