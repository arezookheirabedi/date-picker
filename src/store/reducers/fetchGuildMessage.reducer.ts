import { IPublishedMessageOutputModel } from "src/models/message.model";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildMessage.action";

interface FetchGuildMessageReducer {
  data: IPublishedMessageOutputModel[] | any,
  error: any,
  loading: boolean
}


const initialState = {
  loading: false,
  error: null,
  data: []
}



const fetchGuildMessageReducer = (state: FetchGuildMessageReducer = initialState, action: Action): FetchGuildMessageReducer => {
  switch (action.type) {
    case ActionType.FETCH_GUILD_MESSAGES:
      return { loading: true, error: null, data: [] }
    case ActionType.FETCH_GUILD_MESSAGES_SUCCESS:
      return { loading: false, error: null, data: action.payload.content }
    case ActionType.FETCH_GUILD_MESSAGES_ERROR:
      return { loading: false, error: action.payload, data: [] }
    default:
      return state;
  }
}

export default fetchGuildMessageReducer;