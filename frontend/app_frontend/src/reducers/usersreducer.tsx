import { 
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILED,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILED,
    CLEAR_USERS_ERROR, 
    SAVE_USER, EDIT_USER, FETCH_USER, FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USER_SUCCESS, FETCH_USERS_FAILED, FETCH_USER_FAILED
  } from "../actions/types";
  
  export const INITIAL_STATE = {
    users:null,
    loading: false,
    user: null,
    error:{
      flag:false,
      msg: null
    }
  }
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case FETCH_ALL_USERS:
        return {
          ...state,
          loading:true
        };
      case FETCH_USERS:
        return {
          ...state,
          loading:true
        };
      case FETCH_USER:
        return {
          ...state,
          loading:true
        };
      case FETCH_ALL_USERS_SUCCESS:
        return {
          ...state,
          users:action.payload,
          loading:false
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users:action.users,
          loading:false
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          users:action.user,
          loading:false
        };
      case ADD_USER:
        return {
          ...state,
          //users:action.payload,
          loading:true
        };
      case SAVE_USER:
        return {
          ...state,
          user:action.user,
          loading:true
        };
      case EDIT_USER:
        return {
          ...state,
          user:action.user,
          loading:true
        };
      case ADD_USER_SUCCESS:
        return {
          ...state,
          //users:action.payload,
          loading:false
        };
      case ADD_USER_FAILED:
        alert(action.payload);
        return {
          ...state,
          //users:null,
          loading:false,
          error:{
            flag:true,
            msg:action.payload
          }
        };
      case FETCH_ALL_USERS_FAILED:
        return {
          ...state,
          users:null,
          loading:false,
          error:{
            flag:true,
            msg:action.payload
          }
        };
      case FETCH_USERS_FAILED:
        return {
          ...state,
          users:null,
          loading:false,
          error:{
            flag:true,
            msg:action.payload
          }
        };
      case FETCH_USER_FAILED:
        return {
          ...state,
          user:null,
          loading:false,
          error:{
            flag:true,
            msg:action.payload
          }
        };
        case CLEAR_USERS_ERROR:
          return {
              ...state,
              error:{
                  flag:false,
                  msg:null
              }            
          };
      default:
        return state;
    }
  };