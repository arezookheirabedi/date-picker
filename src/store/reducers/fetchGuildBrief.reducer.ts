import { IResponseGuildBrief } from "src/models/guild.model";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildBrief.action";

interface FetchGuildBriefReducer {
  data: IResponseGuildBrief[],
  error: any,
  loading: boolean
}

let data = []

try {
  const guildBrief = localStorage.getItem('guild_brief')
  if (guildBrief && typeof guildBrief === "string" && guildBrief.length > 0) {
    data = JSON.parse(guildBrief)
  }
} catch (error) {
  console.info("not found guild brief")
}


const initialState = {
  loading: false,
  error: null,
  data: [...data]
}

const fetchGuildBriefReducer = (state: FetchGuildBriefReducer = initialState, action: Action): FetchGuildBriefReducer => {
  switch (action.type) {
    case ActionType.FETCH_GUILD_BRIEF:
      return { loading: true, error: null, data: [] }
    case ActionType.FETCH_GUILD_BRIEF_SUCCESS:
      return { loading: false, error: null, data: action.payload }
    case ActionType.DELETE_GUILD:
      // eslint-disable-next-line
      const d = state.data.filter(g => g.guildCode !== action.payload as any)
      return { ...state, data: d }
    case ActionType.CREATE_GUILD:
      // eslint-disable-next-line
      return { ...state, data: action.payload as any }
    case ActionType.FETCH_GUILD_BRIEF_ERROR:
      return { loading: false, error: action.payload, data: [] }
    default:
      return state;
  }
}

export default fetchGuildBriefReducer;