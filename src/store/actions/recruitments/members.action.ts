import { ActionType } from "../../action_type";

interface AddTotalMemberAction {
    type: ActionType.ADD_TOTAL_MEMBERS_EMPLOYEES;
    payload: number
}


export type Action = AddTotalMemberAction;