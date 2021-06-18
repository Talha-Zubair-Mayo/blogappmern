const Reducer = (state, action) => {
  switch (action.type) {
    case "Login_Start": {
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    }
    case "Login_Success": {
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    }
    case "Login_Failure": {
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    }

    case "UPDATE_Start": {
      return {
       ...state,
        isFetching: true,
        error: false,
      };
    }
    case "UPDATE_Success": {
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    }
    case "UPDATE_Failure": {
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
    }

    case "LOGOUT": {
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    }

    default:
      return state;
  }
};


export default Reducer;