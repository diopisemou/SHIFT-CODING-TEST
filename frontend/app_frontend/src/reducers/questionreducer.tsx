import { 
    FETCH_QUESTIONS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILED,
    SAVE_QUESTION_ANSWER,
    SAVE_QUESTION_ANSWER_SUCCESS,
    SAVE_QUESTION_ANSWER_FAILED,
    CLEAR_SAVE_QUESTION_ERROR,
  } from "../actions/types";

export const INITIAL_STATE = {
    info:null,
    questions:null,
    quizz_id:null,
    loading: false,
    error:{
        flag:false,
        msg: null
    }
}

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
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
    
    case CLEAR_SAVE_QUESTION_ERROR:
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