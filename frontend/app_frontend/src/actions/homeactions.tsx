import { authRef,singleUserRef, API_BASE_URL} from "../config/api";
import { 
  FETCH_USER,
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
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



export const signOut = () => (dispatch: (arg0: any) => void) => {
  // authRef
  //   .signOut()
  //   .then(() => {
  //     dispatch({
  //       type: USER_SIGN_OUT,
  //       payload: null
  //     });       
  //   })
  //   .catch((error: any) => {
  //     //console.log(error);
  //   });
};

export const clearLoginError = () => (dispatch: (arg0: any) => void) => {
  dispatch({
    type: CLEAR_LOGIN_ERROR,
    payload: null
  });  
};