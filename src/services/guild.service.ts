import { AxiosResponse } from 'axios';
import request from 'src/helpers/request';
import { IProfile } from 'src/models/authentication.model';
import { IMessageSeenInput, IPagable, IResponseGuildMessage } from 'src/models/message.model';
import {
  IEmployeeExclusionInput,
  IEmployeeOutput,
  IResponseGuildBrief,
  IResponseGuildInfo,
} from '../models/guild.model';

function registerGuild(params: any): Promise<AxiosResponse<IProfile>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .post(`/api/v1/guilds?lang=fa`, params);
}

function registerWorkshop(params: any): Promise<AxiosResponse<IEmployeeOutput[]>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .post(`/api/v1/guilds/employees/register/auto?lang=fa`, params);
}

function guildBrief(): Promise<AxiosResponse<IResponseGuildBrief[]>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/guilds/brief?lang=fa`);
}

function guildInfo(guildCode: string): Promise<AxiosResponse<IResponseGuildInfo>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/guilds/guild-code/${guildCode}?lang=fa`);
}

function requestDeleteGuild(guildCode: string): Promise<AxiosResponse<any>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .post(`/api/v1/guilds/${guildCode}/delete-by-otp?lang=fa`);
}

function deleteGuildByOTP({
  guildCode,
  otp,
}: {
  guildCode: string;
  otp: string;
}): Promise<AxiosResponse<any>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .delete(`/api/v1/guilds/${guildCode}/delete-by-otp/confirm/${otp}?lang=fa`);
}

function addEmployee(guildCode: string, params: any): Promise<AxiosResponse<any>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .post(`/api/v1/guilds/${guildCode}/employees/register?lang=fa`, params);
}

function deleteEmployee(guildCode: string, nationalId: any): Promise<AxiosResponse<any>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .delete(`/api/v1/guilds/${guildCode}/employees/${nationalId}?lang=fa`);
}

function updateEmployeHealthStatus(
  params: IEmployeeExclusionInput
): Promise<AxiosResponse<IResponseGuildInfo>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .put(`/api/v1/guilds/health/employee?lang=fa`, params);
}

interface IParams extends IPagable {
  guildCode: string;
}

function guildMessages(params: IParams): Promise<AxiosResponse<IResponseGuildMessage>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/guilds/${params.guildCode}/published-messages?lang=fa`, {
      pageNumber: params.pageNumber || 0,
      pageSize: params.pageSize || 20,
    });
}

function guildMessageSeen(
  params: IMessageSeenInput
): Promise<AxiosResponse<IResponseGuildMessage>> {
  return request
    .forGuildUrl()
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .post(`/api/v1/guilds/${params.guildCode}/published-messages/seen/${params.messageId}?lang=fa`);
}

function guildTestResult({ ...params }: any = {}, config?: any) {
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

function guildOverviewByCategory({ tag, category, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/test-results/overview/tags/${tag}/categories/${category}`, params, { ...config });
}
function guildTestResultByCategory({ tag, category, ...params }: any = {}, config?: any) {
  return request
    .withHeaders({ 'Content-Type': 'application/json;utf-8' })
    .build()
    .get(`/api/v1/hcs-reporter/test-results/tags/${tag}/categories/${category}`, params, { ...config });
}
function guildInquiry({ ...params }: any = {}, config?: any){
  return request
  .withHeaders({ 'Content-Type': 'application/json;utf-8' })
  .build()
  .get(`/api/v1/guilds/visit-histories/general/count`, params, { ...config });
}
export default {
  registerGuild,
  registerWorkshop,
  guildBrief,
  guildInfo,
  requestDeleteGuild,
  deleteGuildByOTP,
  addEmployee,
  deleteEmployee,
  updateEmployeHealthStatus,
  guildMessages,
  guildMessageSeen,
  guildTestResult,
  dosesTagBased,
  guildOverviewByCategory,
  guildTestResultByCategory,
  guildInquiry
};
