import { Dispatch } from "redux";
import { ActionType } from "../../action_type";
import { Action } from "../../actions/recruitments/members.action";

export const addTotalMembersAc = (count: number) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.ADD_TOTAL_MEMBERS_EMPLOYEES,
        payload: count
    })
}