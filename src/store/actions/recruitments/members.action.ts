import { ActionType } from "../../action_type";

interface AddTotalMemberAction {
    type: ActionType.ADD_TOTAL_MEMBERS_EMPLOYEES | ActionType.ADD_TOTAL_MEMBERS_STUDENTS;
    payload: number
}


export type Action = AddTotalMemberAction;