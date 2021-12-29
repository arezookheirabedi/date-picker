import { IEmployeeExclusionInput, IEmployeeOutput, IResponseGuildInfo } from "src/models/guild.model";
import { ActionType } from "../action_type";
import { Action } from "../actions/guildInfo.action";

interface FetchGuildInfoReducer {
  data: IResponseGuildInfo | any,
  error: any,
  loading: boolean
}

let data = {}

try {
  const guildInfo = localStorage.getItem('guild_info')
  if (guildInfo && typeof guildInfo === "string" && guildInfo.length > 0) {
    data = JSON.parse(guildInfo)
  }
} catch (error) {
  // eslint-disable-next-line
  console.info("not found guild info")
}

const initialState = {
  loading: false,
  error: null,
  data: { ...data }
}

const fetchGuildInfoReducer = (state: FetchGuildInfoReducer = initialState, action: Action): FetchGuildInfoReducer => {
  switch (action.type) {
    case ActionType.FETCH_GUILDINFO:
      return { loading: true, error: null, data }
    case ActionType.FETCH_GUILDINFO_SUCCESS:
      return { loading: false, error: null, data: action.payload }
    case ActionType.UPDATE_EMPLOYEE_HEALTH_STATUS:
      // eslint-disable-next-line
      const { excluded, exclusionTime, nationalId }: IEmployeeExclusionInput = action.payload;

      // eslint-disable-next-line
      let newData: any = { ...data };
      if (newData && newData.employees) {
        newData.employees = newData.employees?.map((e: IEmployeeOutput) => {
          if (e.nationalId === nationalId) {
            e.excluded = excluded
            e.exclusionTime = excluded ? exclusionTime : null;
          }
          return e;
        })
      }
      // nationalId, excluded, date
      return { loading: false, error: null, data: newData }
    case ActionType.DELETE_GUILD:
      // eslint-disable-next-line
      return { ...state, data: {} }
    case ActionType.CREATE_GUILD:
      return { ...state, data: { ...action.payload } as any }
    case ActionType.FETCH_GUILDINFO_ERROR:
      return { loading: false, error: action.payload, data }
    default:
      return state;
  }
}

export default fetchGuildInfoReducer;