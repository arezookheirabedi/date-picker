import { combineReducers } from "redux";
import fetchGuildInfoReducer from "./fetchGuildInfo.reducer";
import fetchGuildBriefReducer from "./fetchGuildBrief.reducer";
import fetchGuildMessageReducer from "./fetchGuildMessage.reducer";
import recruitmentsMembersReducer from "./recruitments/members.reducers";

const reducers = combineReducers({
    fetchGuildInfo: fetchGuildInfoReducer,
    fetchGuildBrief: fetchGuildBriefReducer,
    fetchGuildMessage: fetchGuildMessageReducer,
    recruitmentsMembers: recruitmentsMembersReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;