import type { AuthState, AuthAction } from "../types";
import { initialState } from "../utils/constants";

//state logic of all action
export const authReducer: React.Reducer<AuthState, AuthAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userRole: action.payload.role,
      };

    case "LOGOUT":
      localStorage.setItem("role", "");
      return initialState;

    case "USER_ROLE":
      return {
        ...state,
        userRole: action.payload,
      };

    default:
      return initialState;
  }
};
