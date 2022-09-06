import {ActionType} from '../../action_type';

interface FetchZaerinAction {
  type:
    | ActionType.FETCH_ZAERIN
    | ActionType.FETCH_ZAERIN_SUCCESS
    | ActionType.FETCH_ZAERIN_ERROR
    | ActionType.FETCH_ZAERIN_HOURLY
    | ActionType.FETCH_ZAERIN_HOURLY_SUCCESS
    | ActionType.FETCH_ZAERIN_HOURLY_ERROR;
  payload: any;
}

export type Action = FetchZaerinAction;
