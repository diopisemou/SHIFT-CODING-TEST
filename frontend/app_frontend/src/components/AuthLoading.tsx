import React,{ useEffect } from 'react';
import CircularLoading from "./CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/useractions";
import { fetchQuizzs } from "../actions/quizzactions";

function AuthLoading(props: any) {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    useEffect(()=>{
        dispatch(fetchQuizzs());
        //dispatch(fetchQuestion());
        if(auth.isAuthenticated && auth.usertype === 'Admin'){
            dispatch(fetchUsers());
        }
    },[auth.isAuthenticated,dispatch]);

    return (
        //auth.loading? props.children:props.children
        auth.loading === true ? <CircularLoading/> : props.children
    );
}

export default AuthLoading;