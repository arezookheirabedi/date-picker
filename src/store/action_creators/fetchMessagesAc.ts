import { Dispatch } from "redux";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildMessage.action";

export const fetchMessagesAc = (params: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCH_GUILD_MESSAGES
    })

    try {
        // make a request to fetch guild info and dispatch with appropriate type and payload
      
        dispatch({ type: ActionType.FETCH_GUILD_MESSAGES_SUCCESS, payload: {   content: undefined,
            empty: false,
            first: false,
            last: false,
            number: 0,
            numberOfElements: 0,
            pageable:{    offset: 0,
                pageNumber: 0,
                pageSize: 0,
                paged: false,
                sort: { empty: false,
                    sorted: false,
                    unsorted: false,},
                unpaged: false,},
            sort: { empty: false,
                sorted: false,
                unsorted: false,},
            size: 0,
            totalElements: 0,
            totalPages: 0,} })
    } catch (error : any) {
        dispatch({
            type: ActionType.FETCH_GUILD_MESSAGES_ERROR,
            payload: error.message || "خطایی در عملیات"
        })
    }
}