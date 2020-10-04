import React,{ useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useDispatch } from "react-redux";
import { signOut }  from "../actions/authactions";
import { useStyles } from '../config/helper';



const Logout = (props: any) => {
  const dispatch = useDispatch();
  const classes  = useStyles();

  useEffect(()=>{
    if( localStorage.getItem('access_token') !== 'undefined' ){
      dispatch(signOut());
      props.history.push('/');
    }
  });

  return (
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paperhome}>
          <div className="App">
            <header className="App-header">
              <p> Log out Successful</p>
            </header>
          </div>
      </div>
    </Container>
  );

}

export default Logout;

