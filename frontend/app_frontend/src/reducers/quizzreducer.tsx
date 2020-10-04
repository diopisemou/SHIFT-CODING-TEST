import { 
    FETCH_QUIZZ,
    FETCH_QUIZZ_SUCCESS,
    FETCH_QUIZZ_FAILED,
    FETCH_QUIZZS,
    FETCH_QUIZZS_SUCCESS,
    FETCH_QUIZZS_FAILED,
    SAVE_QUIZZ,
    SAVE_QUIZZ_SUCCESS,
    SAVE_QUIZZ_FAILED,
    CLEAR_LOGIN_ERROR
  } from "../actions/types";

export const INITIAL_STATE = {
    info:null,
    quizz:null,
    quizzs:null,
    loading: false,
    error:{
        flag:false,
        msg: null
    }
}

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_QUIZZ:
        return {
            ...state,
            loading:true         
        };
    case FETCH_QUIZZ_SUCCESS:
        return {
            ...state,
            info:action.message,
            quizz: action.quizz,
            loading:false            
        };
    case FETCH_QUIZZ_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case FETCH_QUIZZS:
        return {
            ...state,
            loading:true         
        };
    case FETCH_QUIZZS_SUCCESS:
        return {
            ...state,
            info:"Quizz Fetched",
            quizzs: action.quizzs,
            loading:false            
        };
    case FETCH_QUIZZS_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case SAVE_QUIZZ:
        return {
            ...state,
            loading:true         
        };
    case SAVE_QUIZZ_SUCCESS:
        return {
            ...state,
            info:action.message,
            quizz: action.quizz,
            loading:false            
        };
    case SAVE_QUIZZ_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case CLEAR_LOGIN_ERROR:
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