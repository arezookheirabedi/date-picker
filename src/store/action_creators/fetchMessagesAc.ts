import { Dispatch } from "redux";
import guildService from "src/services/guild.service";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildMessage.action";

export const fetchMessagesAc = (params: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCH_GUILD_MESSAGES
    })

    try {
        // make a request to fetch guild info and dispatch with appropriate type and payload
        const res = await guildService.guildMessages(params)
        dispatch({ type: ActionType.FETCH_GUILD_MESSAGES_SUCCESS, payload: res.data })
    } catch (error : any) {
        dispatch({
            type: ActionType.FETCH_GUILD_MESSAGES_ERROR,
            payload: error.message || "خطایی در عملیات"
        })
    }
}