import {ActionType} from '../../action_type';
import {Action} from '../../actions/recruitments/members.action';

export interface IRecruimentMemberReducer {
  total: number;
  employe: number;
}

const initialState: IRecruimentMemberReducer = {
  total: 0,
  employe: 0,
};

const studentMemberReducer: (
  state: IRecruimentMemberReducer,
  action: Action
) => IRecruimentMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TOTAL_MEMBERS_STUDENTS:
      // eslint-disable-next-line
      state = {...state, total: action.payload};
      return state;
    case ActionType.ADD_TOTAL_MEMBERS_EMPLOYE:
      // eslint-disable-next-line
      state = {...state, employe: action.payload};
      return state;
    default:
      return state;
  }
};

export default studentMemberReducer;
