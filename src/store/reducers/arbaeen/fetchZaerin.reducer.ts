import {ActionType} from '../../action_type';
import {Action} from '../../actions/arbaeen/fetchZaerin.action';

interface FetchZaerinReducer {
  data: any[];
  error: any;
  loading: boolean;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const fetchZaerinReducer = (
  state: FetchZaerinReducer = initialState,
  action: Action
): FetchZaerinReducer => {
  switch (action.type) {
    case ActionType.FETCH_ZAERIN:
      return {loading: true, error: null, data: []};
    case ActionType.FETCH_ZAERIN_SUCCESS:
      return {loading: false, error: null, data: action.payload};
    case ActionType.FETCH_ZAERIN_ERROR:
      return {loading: false, error: action.payload, data: []};
    default:
      return state;
  }
};

export default fetchZaerinReducer;
