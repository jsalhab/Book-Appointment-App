import { combineReducers } from "redux";
import appointmentsReducer from "./appointmentsReducer";

const reducers = combineReducers({
  appointmentsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
