import { Dispatch } from "redux";
import guildService from "src/services/guild.service";
import { IEmployeeExclusionInput } from "src/models/guild.model";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildInfo.action";


export const fetchGuildInfoAc = (guildCode: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCH_GUILDINFO
    })

    try {
        // make a request to fetch guild info and dispatch with appropriate type and payload
        const res = await guildService.guildInfo(guildCode)
        localStorage.setItem("guild_info", JSON.stringify(res.data))
        dispatch({ type: ActionType.FETCH_GUILDINFO_SUCCESS, payload: res.data })
    } catch (error: any) {
        dispatch({
            type: ActionType.FETCH_GUILDINFO_ERROR,
            payload: error.message || "خطایی در عملیات"
        })
    }
}

export const updateGuildEmployeeHealthStatusAc = (params: IEmployeeExclusionInput) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.UPDATE_EMPLOYEE_HEALTH_STATUS,
        payload: params
    })

}


