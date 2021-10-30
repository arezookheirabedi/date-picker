import { IResponseGuildMessage } from "src/models/message.model";
import { ActionType } from "../action_type";

interface FetchGuildMessageAction {
    type: ActionType.FETCH_GUILD_MESSAGES;
}

interface FetchGuildMessageSuccessAction {
    type: ActionType.FETCH_GUILD_MESSAGES_SUCCESS;
    payload: IResponseGuildMessage;
}

interface FetchGuildMessageErrorAction {
    type: ActionType.FETCH_GUILD_MESSAGES_ERROR;
    payload: any;
}

export type Action = FetchGuildMessageAction | FetchGuildMessageSuccessAction | FetchGuildMessageErrorAction;