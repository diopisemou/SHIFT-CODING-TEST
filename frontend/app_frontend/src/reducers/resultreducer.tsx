import { 
    FETCH_USER,
    FETCH_QUESTIONS,
    FETCH_RESULTS,
    FETCH_QUIZZ_RESULTS,
    FETCH_USER_SUCCESS,
    FETCH_QUESTION_SUCCESS,
    FETCH_RESULTS_SUCCESS,
    FETCH_QUIZZ_RESULTS_SUCCESS,
    FETCH_USER_FAILED,
    FETCH_RESULTS_FAILED,
    FETCH_QUESTIONS_FAILED,
    FETCH_QUIZZ_RESULTS_FAILED,
    CLEAR_LOGIN_ERROR
  } from "../actions/types";

export const INITIAL_STATE = {
    info:null,
    result:null,
    results:null,
    loading: false,
    error:{
        flag:false,
        msg: null
    }
}

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_USER:
        return {
            ...state,
            loading:true         
        };
    case FETCH_RESULTS:
        return {
            ...state,
            loading:true         
        };
    case FETCH_QUESTIONS:
        return {
            ...state,
            loading:true         
        };
    case FETCH_QUIZZ_RESULTS:
        return {
            ...state,
            loading:true         
        };
    case FETCH_USER_SUCCESS:
        return {
            ...state,
            info:action.payload,
            usertype: action.usertype,
            loading:false            
        };
    case FETCH_RESULTS_SUCCESS:
        return {
            ...state,
            info:action.message,
            results: action.results,
            loading:false            
        };
    case FETCH_QUIZZ_RESULTS_SUCCESS:
        return {
            ...state,
            info:action.message,
            result: action.result,
            loading:false            
        };
    case FETCH_QUESTION_SUCCESS:
        return {
            ...state,
            info:action.payload,
            usertype: action.usertype,
            question: action.question,
            loading:false            
        };
    case FETCH_USER_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case FETCH_RESULTS_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case FETCH_QUIZZ_RESULTS_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case FETCH_QUESTIONS_FAILED:
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