import { IResponseGuildInfo } from "src/models/guild.model";
import { ActionType } from "../action_type";

interface FetchGuildInfoAction {
    type: ActionType.FETCH_GUILDINFO;
}

interface FetchGuildInfoSuccessAction {
    type: ActionType.FETCH_GUILDINFO_SUCCESS;
    payload: IResponseGuildInfo;
}

interface FetchGuildInfoErrorAction {
    type: ActionType.FETCH_GUILDINFO_ERROR;
    payload: any;
}

interface UpdateGuildEmployeeHealthStatusAction {
    type: ActionType.UPDATE_EMPLOYEE_HEALTH_STATUS;
    payload: any;
}
interface RemoveGuildInfoAction {
    type: ActionType.DELETE_GUILD;
}
interface CreateGuildInfoAction {
    type: ActionType.CREATE_GUILD;
    payload: any;
}

export type Action = FetchGuildInfoAction | FetchGuildInfoSuccessAction | FetchGuildInfoErrorAction | UpdateGuildEmployeeHealthStatusAction | RemoveGuildInfoAction | CreateGuildInfoAction;