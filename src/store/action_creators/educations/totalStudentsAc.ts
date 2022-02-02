import { Dispatch } from "redux";
import { ActionType } from "../../action_type";
import { Action } from "../../actions/recruitments/members.action";

export const addTotalStudentMembersAc = (count: number) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.ADD_TOTAL_MEMBERS_STUDENTS,
        payload: count
    })
}
export const addTotalEmployeMembersAc = (count: number) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.ADD_TOTAL_MEMBERS_EMPLOYE,
        payload: count
    })
}