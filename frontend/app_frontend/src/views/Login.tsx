import React,{ useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logobg from '../logo.svg';
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from '../components/AlertDialog';
import  languageJson  from "../config/language";
import {
  signIn,
  clearLoginError
}  from "../actions/authactions";
import { fetchQuestions } from '../actions/questionactions';
import { useStyles } from '../config/helper';



/**
 * Login component redirecting to dashboard
 * @param props 
 */
const Login = (props: any) => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const classes  = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if( auth.info ){
      dispatch(fetchQuestions());
      props.history.push('/quizzs');
    } else if(auth.info && auth.usertype === "Admin" ){
      props.history.push('/quizzs');
    }
  });

  const handleEmailChange = (e: any) =>{
    setEmail(e.target.value);
  }  

  const handlePasswordChange = (e: any) =>{
    setPassword(e.target.value);
  }  

  const handleSubmit = (e: any) =>{
    e.preventDefault();
    dispatch(signIn(email,password));
  }

  const handleClose = () => {
    setEmail("");
    setPassword("");
    dispatch(clearLoginError());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={logobg} alt="Logo" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {languageJson.sign_in}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={languageJson.email_address}
              name="email"
              autoComplete="email"
              onChange={handleEmailChange}
              value={email}
              autoFocus
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={languageJson.password}
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
          >
              {languageJson.sign_in}
          </Button>
        </form>
      </div>
      <AlertDialog open={auth.error.flag} onClose={handleClose}>{languageJson.sign_in_error} {auth.error.msg} </AlertDialog>
    </Container>
  );
  
}

export default Login;

