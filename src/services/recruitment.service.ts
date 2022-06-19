// import qs from 'qs';
import request from '../helpers/request';

function membersGeneral({ ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/test-results/general`, params, { ...config });
}

function dosesTagBased({ tag, category, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/vaccines/tags/${tag}/categories/${category}`, params, { ...config });
}

function dosesProvinceBased({ ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/vaccines/provinces`, params, { ...config });
}

function membersTagBased({ tag, category, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/test-results/overview/tags/${tag}/categories/${category}`, params, {
      ...config,
    });
}

function testResultTagBased({ tag, category, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/test-results/tags/${tag}/categories/${category}`, params, {
      ...config,
    });
}

function testResultTimeBased({ ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/test-results/overview/time-based`, params, {
      ...config,
    });
}

function tags({ tag, category, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/tags/${tag}/categories/${category}/category-values?lang=fa`, params, {
      ...config,
    });
}

const recruitmentService = {
  membersGeneral,
  dosesTagBased,
  dosesProvinceBased,
  membersTagBased,
  testResultTagBased,
  testResultTimeBased,
  tags
};

export default recruitmentService;
