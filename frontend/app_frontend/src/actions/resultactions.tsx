import { API_BASE_URL} from "../config/api";
import { 
  FETCH_RESULTS,
  FETCH_QUIZZ_RESULTS,
  FETCH_RESULTS_SUCCESS,
  FETCH_QUIZZ_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILED,
  FETCH_QUIZZ_RESULTS_FAILED
} from "./types";
import axios from 'axios';

export const fetchResults = (emaildata: any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_RESULTS,
    payload: null,
    loading:true
  });
  let userData: {  email:string; } = 
  {
    email: emaildata,
  };
  axios.post(API_BASE_URL+'/quizzresults/results',userData)
  .then((res: any) => { 
    dispatch({
      type: FETCH_RESULTS_SUCCESS,
      results: res.data.quizzresults,
      message: res.data.message,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_RESULTS_FAILED,
      results: "No results available.",
      loading:false
    });
  });
};


export const fetchQuizzResult = (quizz_id:any, emaildata: any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_QUIZZ_RESULTS,
    payload: null,
    loading:true
  });
  let userData: { quizz_id:string, email:string; } = 
  {
    quizz_id: quizz_id,
    email: emaildata,
  };
  axios.post(API_BASE_URL+'/quizzresults/result',userData)
  .then((res: any) => { 
    dispatch({
      type: FETCH_QUIZZ_RESULTS_SUCCESS,
      result: res.data.quizzresults,
      message: res.data.message,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_QUIZZ_RESULTS_FAILED,
      result: "No results available.",
      loading:false
    });
  });
};



