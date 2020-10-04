import { 
    FETCH_USER,
    FETCH_QUESTIONS,
    FETCH_USER_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_USER_FAILED,
    FETCH_QUESTIONS_FAILED,
    SAVE_QUESTION_ANSWER,
    SAVE_QUESTION_ANSWER_SUCCESS,
    SAVE_QUESTION_ANSWER_FAILED,
    USER_SIGN_IN,
    USER_SIGN_IN_FAILED,
    CLEAR_LOGIN_ERROR
  } from "../actions/types";

export const INITIAL_STATE = {
    info:null,
    questions:null,
    quizzresult:null,
    quizz_id:null,
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
    case FETCH_QUESTIONS:
        return {
            ...state,
            loading:true         
        };
    case SAVE_QUESTION_ANSWER:
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
    case SAVE_QUESTION_ANSWER_SUCCESS:
        return {
            ...state,
            info:action.message,
            quizzresult: action.quizzresult,
            quizz_id: action.quizz_id,
            loading:false            
        };
    case FETCH_QUESTIONS_SUCCESS:
        return {
            ...state,
            info:action.payload,
            usertype: action.usertype,
            questions: action.questions,
            quizz_id: action.quizz_id,
            loading:false            
        };
    case FETCH_USER_FAILED:
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
    case SAVE_QUESTION_ANSWER_FAILED:
        return {
            ...state,
            loading:false,
            info:null
        };
    case USER_SIGN_IN:
        return {
            ...state,
            loading:true,
            info: 'sucess'      
        };
    case USER_SIGN_IN_FAILED:
        return {
            ...state,
            info:null,
            loading:false,
            error:{
                flag:true,
                msg:action.payload.message
            }  
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