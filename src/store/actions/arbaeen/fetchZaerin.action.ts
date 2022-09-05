import {ActionType} from '../../action_type';

interface FetchZaerinAction {
  type:
    | ActionType.FETCH_ZAERIN
    | ActionType.FETCH_ZAERIN_SUCCESS
    | ActionType.FETCH_ZAERIN_ERROR;
  payload: any;
}

export type Action = FetchZaerinAction;
