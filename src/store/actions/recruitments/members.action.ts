import {ActionType} from '../../action_type';

interface AddTotalMemberAction {
  type:
    | ActionType.ADD_TOTAL_MEMBERS_EMPLOYEES
    | ActionType.ADD_TOTAL_MEMBERS_STUDENTS
    | ActionType.ADD_TOTAL_MEMBERS_EMPLOYE;
  payload: number;
}

export type Action = AddTotalMemberAction;
