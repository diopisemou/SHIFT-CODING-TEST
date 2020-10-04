import { API_BASE_URL} from "../config/api";
import { 
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_FAILED,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTION,
  FETCH_QUESTION_FAILED,
  FETCH_QUESTION_SUCCESS,
  SAVE_QUESTION,
  SAVE_QUESTION_FAILED,
  SAVE_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_FAILED,
  DELETE_QUESTION_SUCCESS,
} from "./types";
import axios from 'axios';
import Swal from "sweetalert2";

export const fetchQuestions = () => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_QUESTIONS,
    payload: null
  });
  axios.get(API_BASE_URL+'/question/')
  .then((res: any) => { 
        dispatch({
          type: FETCH_QUESTIONS_SUCCESS,
          questions: res.data.questions,
          quizz_id: res.data.quizz_id
        });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_QUESTIONS_FAILED,
      questions: "No questions available.",
      quizz_id: null
    });
  });
};


export const fetchQuestion = (q_id:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_QUESTION,
    payload: null,
    loading:true
  });
  let userData: { q_id:string, } = 
  {
    q_id: q_id
  };
  axios.post(API_BASE_URL+'/question/',userData)
  .then((res: any) => { 
    dispatch({
      type: FETCH_QUESTION_SUCCESS,
      question: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_QUESTION_FAILED,
      question: "No question available.",
      loading:false
    });
  });
};

export const saveQuestion= (qdata:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_QUESTION,
    payload: null,
    loading:true
  });
  let userData: { name:string, question_string:string, question_label:string, 
    question_dimension:string, question_direction:string, question_meaning:string, min_value:string, max_value:string} = 
  {
    name: qdata.name,
    question_string: qdata.question_string,
    question_label: qdata.question_label,
    question_dimension: qdata.question_dimension,
    question_direction: qdata.question_direction,
    question_meaning: qdata.question_meaning,
    min_value: qdata.min_value,
    max_value: qdata.max_value,
  };
  axios.post(API_BASE_URL+'/question/save',userData)
  .then((res: any) => { 
    Swal.fire(
      'Good job!',
      'Save Successful',
      'success'
    );
    dispatch({
      type: SAVE_QUESTION_SUCCESS,
      question: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_QUESTION_FAILED,
      question: "No question available.",
      loading:false
    });
  });
};

export const deleteQuestion = (q_id:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: DELETE_QUESTION,
    payload: null,
    loading:true
  });
  let userData: { q_id:string,} = 
  {
    q_id: q_id,
  };
  axios.post(API_BASE_URL+'/question/delete',userData)
  .then((res: any) => { 
    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      question: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: DELETE_QUESTION_FAILED,
      question: "No question available.",
      loading:false
    });
  });
};



