import { API_BASE_URL} from "../config/api";
import { 
  FETCH_QUIZZ,
  SAVE_QUIZZ,
  FETCH_QUIZZS,
  FETCH_QUIZZ_SUCCESS,
  SAVE_QUIZZ_SUCCESS,
  FETCH_QUIZZS_SUCCESS,
  FETCH_QUIZZ_FAILED,
  SAVE_QUIZZ_FAILED,
  FETCH_QUIZZS_FAILED,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SAVE_QUESTION_ANSWER_FAILED,
} from "./types";
import axios from 'axios';

export const fetchQuizzs = () => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_QUIZZS,
    payload: null,
    loading:true
  });
  axios.post(API_BASE_URL+'/quizz/')
  .then((res: any) => { 
    dispatch({
      type: FETCH_QUIZZS_SUCCESS,
      quizzs: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_QUIZZS_FAILED,
      quizzs: "No quizz available.",
      loading:false
    });
  });
};


export const fetchQuizz = (quizz_id:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_QUIZZ,
    payload: null,
    loading:true
  });

  let userData: { quizz_id:string} = 
  {
    quizz_id: quizz_id,
  };

  axios.post(API_BASE_URL+'/quizz/show', userData)
  .then((res: any) => { 
    dispatch({
      type: FETCH_QUIZZ_SUCCESS,
      quizz: res.data.quizz,
      message: res.data.message,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_QUIZZ_FAILED,
      quizz: "No quizz available.",
      loading:false
    });
  });
};

export const saveQuizz = (quizzdata:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_QUIZZ,
    payload: null,
    loading:true
  });
  let userData: { quizz_name:string, quizz_active:boolean} = 
  {
    quizz_name: quizzdata.quizz_name,
    quizz_active: quizzdata.quizz_active
  };
  axios.post(API_BASE_URL+'/quizz/save',userData)
  .then((res: any) => { 
    dispatch({
      type: SAVE_QUIZZ_SUCCESS,
      quizz: res.data.quizz,
      message: res.data.message,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_QUIZZ_FAILED,
      quizz: "No quizz available.",
      loading:false
    });
  });
};

export const updateQuizz = (quizzdata:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_QUIZZ,
    payload: null,
    loading:true
  });
  let userData: { quizz_id:string, quizz_name:string, quizz_active:boolean, questions_id:any} = 
  {
    quizz_id: quizzdata.quizz_id,
    quizz_name: quizzdata.quizz_name,
    quizz_active: quizzdata.quizz_active,
    questions_id: quizzdata.questions_toaddid
  };
  axios.post(API_BASE_URL+'/quizz/update',userData)
  .then((res: any) => { 
    dispatch({
      type: SAVE_QUIZZ_SUCCESS,
      quizz: res.data.quizz,
      message: res.data.message,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_QUIZZ_FAILED,
      quizz: "No quizz available.",
      loading:false
    });
  });
};

export const saveQuizzAnswer = (quizzdata: any, qanswer:any, quizz_id:any ) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_QUESTION_ANSWER,
    loading: true,
    payload: null,
    usertype: null
  });
  let userData: { name: string; email:string; answers:any[]; quizz_id:string } = 
  { 
    name: quizzdata.name, 
    email: quizzdata.email,
    answers : qanswer,
    quizz_id: quizz_id ?? "-1"
  };
  axios.post(API_BASE_URL+'/quizzanswer/save/', userData)
  .then((res: any) => { 
    dispatch({
      type: SAVE_QUESTION_ANSWER_SUCCESS,
      payload: null,
      message: res.data.message,
      quizzresult: res.data.quizzresult,
      quizz_id: res.data.quizzresult.quizz_id
    });     
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_QUESTION_ANSWER_FAILED,
      payload: error
    });
  });
};

export const deleteQuizz = (quizz_id:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_QUIZZ,
    payload: null,
    loading:true
  });
  let userData: { quizz_id:string,} = 
  {
    quizz_id: quizz_id,
  };
  axios.post(API_BASE_URL+'/quizz/delete',userData)
  .then((res: any) => { 
    dispatch({
      type: SAVE_QUIZZ_SUCCESS,
      quizz: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_QUIZZ_FAILED,
      quizz: "No quizz available.",
      loading:false
    });
  });
};



