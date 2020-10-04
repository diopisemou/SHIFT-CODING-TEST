import { API_BASE_URL } from "../config/api";
import { 
  FETCH_USER,
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  USER_SIGN_OUT_FAILED,
  CLEAR_LOGIN_ERROR
} from "./types";
import axios from 'axios';
import Swal from "sweetalert2";

export const fetchUser = () => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: FETCH_USER,
    payload: null,
    usertype: null
  });
  // authRef.onAuthStateChanged((user: any) => {
  //   if (user) {
  //       singleUserRef(user.uid).once("value", (snapshot: any) => {
  //         if(snapshot.val() && snapshot.val().usertype === "Owner"){
  //           dispatch({
  //             type: FETCH_USER_SUCCESS,
  //             payload: user,
  //             usertype: "Owner"
  //           });
  //         } else if(snapshot.val() && snapshot.val().isAdmin) {
  //           dispatch({
  //             type: FETCH_USER_SUCCESS,
  //             payload: user,
  //             usertype: "Admin"
  //           });
  //         } else {
  //           authRef
  //           .signOut()
  //           .then(() => {
  //             dispatch({
  //               type: USER_SIGN_IN_FAILED,
  //               payload: "This login is a valid user but not Admin",
  //               usertype: null
  //             });     
  //           })
  //           .catch((error: any) => {
  //             dispatch({
  //               type: USER_SIGN_IN_FAILED,
  //               payload: error,
  //               usertype: null
  //             });
  //           });
  //         }
  //       });
  //   }else{
  //     dispatch({
  //       type: FETCH_USER_FAILED,
  //       payload: null,
  //       usertype: null
  //     });
  //   }
  // });
};

export const signIn = (username: any, password: any) => (dispatch: (arg0: any) => void) => {
  let userData: { email: string; password:string; remember_me:boolean } = 
  { 
    email: username, 
    password:password,
    remember_me: true 
  };
  axios.post(API_BASE_URL+'/auth/login', userData)
  .then((res: any) => { 
        Swal.fire(
          'Welcome !',
          'Login Successful',
          'success'
        );
        let tokenvalue = res.data.token_type+' '+res.data.access_token;
        localStorage.setItem('access_token', tokenvalue);
        dispatch({
          type: USER_SIGN_IN,
          usertype: res.data.usertype,
          isAuthenticated: true,
          token: tokenvalue,
          payload: null
        });     
  })
  .catch(function(error: any) {
    dispatch({
      type: USER_SIGN_IN_FAILED,
      payload: error
    });
  });
};

export const signOut = () => (dispatch: (arg0: any) => void) => {
  axios.post(API_BASE_URL+'/auth/logout')
  .then((res: any) => { 
        localStorage.setItem('access_token', 'undefined');
        localStorage.setItem('token_type', 'undefined');
        dispatch({
          type: USER_SIGN_OUT,
          payload: null,
          info:null
        });   
  })
  .catch(function(error: any) {
    dispatch({
      type: USER_SIGN_OUT_FAILED,
      payload: error
    });
  });
  
};

export const clearLoginError = () => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: CLEAR_LOGIN_ERROR,
    payload: null
  });  
};