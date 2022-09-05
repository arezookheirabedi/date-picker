import {ActionType} from '../../action_type';
import {Action} from '../../actions/arbaeen/fetchZaerin.action';

interface FetchZaerinReducer {
  data: any[];
  error: any;
  loading: boolean;
  dataHourly: any[];
  errorHourly: any;
  loadingHourly: boolean;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  loadingHourly: false,
  errorHourly: null,
  dataHourly: [],
};

const fetchZaerinReducer = (
  state: FetchZaerinReducer = initialState,
  action: Action
): FetchZaerinReducer => {
  switch (action.type) {
    case ActionType.FETCH_ZAERIN:
      return {...state, loading: true, error: null, data: []};
    case ActionType.FETCH_ZAERIN_SUCCESS:
      return {...state, loading: false, error: null, data: action.payload};
    case ActionType.FETCH_ZAERIN_ERROR:
      return {...state, loading: false, error: action.payload, data: []};
    case ActionType.FETCH_ZAERIN_HOURLY:
      return {...state, loadingHourly: true, errorHourly: null, dataHourly: []};
    case ActionType.FETCH_ZAERIN_HOURLY_SUCCESS:
      return {...state, loadingHourly: false, errorHourly: null, dataHourly: action.payload};
    case ActionType.FETCH_ZAERIN_HOURLY_ERROR:
      return {...state, loadingHourly: false, errorHourly: action.payload, dataHourly: []};
    default:
      return state;
  }
};

export default fetchZaerinReducer;
