import { API_BASE_URL} from "../config/api";
import { 
  FETCH_USER,
  SAVE_USER,
  FETCH_USERS,
  EDIT_USER,
  FETCH_USER_SUCCESS,
  SAVE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAILED,
  SAVE_USER_FAILED,
  FETCH_USERS_FAILED,
  EDIT_USER_FAILED,
} from "./types";
import axios from 'axios';

export const fetchUsers = () => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_USERS,
    payload: null,
    loading:true
  });
  axios.post(API_BASE_URL+'/user/list')
  .then((res: any) => { 
    dispatch({
      type: FETCH_USERS_SUCCESS,
      users: res.data.users,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_USERS_FAILED,
      users: "No user available.",
      loading:false
    });
  });
};


export const fetchUser = (user_id:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_USER,
    payload: null,
    loading:true
  });

  let userData: { user_id:string, } = 
  {
    user_id: user_id
  };

  axios.post(API_BASE_URL+'/user/show', userData)
  .then((res: any) => { 
    dispatch({
      type: FETCH_USER_SUCCESS,
      user: res.data.user,
      message: res.data.message,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: FETCH_USER_FAILED,
      user: "No user available.",
      loading:false
    });
  });
};

export const saveUser = (userdata:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_USER,
    payload: null,
    loading:true
  });
  let userData: { name:string, email:string, password:string, isAdmin:boolean} = 
  {
    name: userdata.name,
    email: userdata.email,
    password: userdata.password,
    isAdmin: userdata.isAdmin
  };
  axios.post(API_BASE_URL+'/user/save',userData)
  .then((res: any) => { 
    dispatch({
      type: SAVE_USER_SUCCESS,
      quizz: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_USER_FAILED,
      quizz: "No quizz available.",
      loading:false
    });
  });
};

export const updateUser = (userdata:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: EDIT_USER,
    payload: null,
    loading:true
  });
  let userData: { name:string, user_id:string} = 
  {
    name: userdata.name,
    user_id: userdata.id,
  };
  axios.post(API_BASE_URL+'/user/update',userData)
  .then((res: any) => { 
    dispatch({
      type: EDIT_USER_SUCCESS,
      user: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: EDIT_USER_FAILED,
      quizz: "No user available.",
      loading:false
    });
  });
};



export const deleteUser = (user_id:any) => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: SAVE_USER,
    payload: null,
    loading:true
  });
  let userData: { user_id:string,} = 
  {
    user_id: user_id,
  };
  axios.post(API_BASE_URL+'/user/delete',userData)
  .then((res: any) => { 
    dispatch({
      type: SAVE_USER_SUCCESS,
      user: res.data,
      loading:false
    });  
  })
  .catch(function(error: any) {
    dispatch({
      type: SAVE_USER_FAILED,
      user: "No user available.",
      loading:false
    });
  });
};



