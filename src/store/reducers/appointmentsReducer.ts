import {
  GET_APPOINTMENTS,
  SAVE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "../actions/types";

const INITAL_STATE = {
  loading: false,
  data: {},
  error: "",
};

interface Appointments {
  loading: boolean;
  data: {};
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

export default (
  state: Appointments = INITAL_STATE,
  action: Action
): Appointments => {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return { ...state, data: action.payload, loading: false };
    case SAVE_APPOINTMENT:
      return { ...state, data: action.payload, loading: false };
    case DELETE_APPOINTMENT:
      return { ...state };
    default:
      return state;
  }
};
