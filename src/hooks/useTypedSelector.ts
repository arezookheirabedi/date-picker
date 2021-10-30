import {useSelector as _useSelector , TypedUseSelectorHook} from "react-redux";
import {RootState} from "../store/index";

export const useSelector : TypedUseSelectorHook<RootState> = _useSelector;