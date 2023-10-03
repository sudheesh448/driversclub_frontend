// authReducers.js
const initialState = {
  isAuthenticated: false,
  loading: true, // You can use loading state for async actions like checking token validity
  error: null,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        userData: action.userData
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.error,
        userData: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        userData: null,
      };
    case 'ACCESS_TOKEN_VALID':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        userData: action.userData
      };
    case 'ACCESS_TOKEN_INVALID':
    case 'ACCESS_TOKEN_MISSING':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
