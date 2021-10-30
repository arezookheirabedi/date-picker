import { combineReducers } from "redux";
import fetchGuildInfoReducer from "./fetchGuildInfo.reducer";
import fetchGuildBriefReducer from "./fetchGuildBrief.reducer";
import fetchGuildMessageReducer from "./fetchGuildMessage.reducer";

const reducers = combineReducers({
    fetchGuildInfo: fetchGuildInfoReducer,
    fetchGuildBrief: fetchGuildBriefReducer,
    fetchGuildMessage: fetchGuildMessageReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;