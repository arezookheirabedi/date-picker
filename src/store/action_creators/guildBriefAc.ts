import guildService from "src/services/guild.service";
import { Dispatch } from "redux";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildBrief.action";


export const fetchGuildBriefAc = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCH_GUILD_BRIEF
    })

    try {
        // make a request to fetch guild info and dispatch with appropriate type and payload
        const res = await guildService.guildBrief();
        localStorage.setItem("guild_brief", JSON.stringify(res.data))
        dispatch({ type: ActionType.FETCH_GUILD_BRIEF_SUCCESS, payload: res.data })
    } catch (error: any) {
        dispatch({
            type: ActionType.FETCH_GUILD_BRIEF_ERROR,
            payload: error.message || "خطایی در عملیات"
        })
    }
}

export const deleteGuildAc = (guildCode: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.DELETE_GUILD,
        payload: guildCode
    })
}

export const createGuildAc = (params: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.CREATE_GUILD,
        payload: params
    })
}
