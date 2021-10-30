import { IResponseGuildBrief } from "src/models/guild.model";
import { ActionType } from "../action_type";

interface FetchGuildBriefAction {
    type: ActionType.FETCH_GUILD_BRIEF;
}

interface FetchGuildBriefSuccessAction {
    type: ActionType.FETCH_GUILD_BRIEF_SUCCESS;
    payload: IResponseGuildBrief[];
}

interface FetchGuildBriefErrorAction {
    type: ActionType.FETCH_GUILD_BRIEF_ERROR;
    payload: any;
}

interface DeleteGuildAction {
    type: ActionType.DELETE_GUILD;
    payload: any;
}

interface CreateGuildAction {
    type: ActionType.CREATE_GUILD;
    payload: any;
}

export type Action = FetchGuildBriefAction | FetchGuildBriefSuccessAction | FetchGuildBriefErrorAction | DeleteGuildAction | CreateGuildAction;