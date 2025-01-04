import { Dispatch } from "redux";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildBrief.action";




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
