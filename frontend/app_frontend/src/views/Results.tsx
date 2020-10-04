import React,{ useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from "react-redux";
import  languageJson  from "../config/language";
import { fetchQuizzResult, }  from "../actions/resultactions";

import CircularLoading from "../components/CircularLoading";


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    width:195,
    height:195
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Results = () => {
  let { quizz_id,email } = useParams<any>();
  const dispatch = useDispatch();
  const classes  = useStyles();
  const resultsdata = useSelector((state: any) => state.results);
  const [querycount, setQueryCount] = useState(0);
  
  useEffect(()=>{
    if( email && quizz_id && resultsdata.loading && querycount < 2){
      if (querycount < 1) {
        dispatch(fetchQuizzResult(quizz_id,email));
      }
      setQueryCount(querycount +1);
    }
  }, [email, quizz_id, resultsdata.loading, querycount, dispatch]);

  



  function FormRow1() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Introversion (I)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function1 === 'Introversion' ? 100 : 0} />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Extraversion (E)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function1 === 'Extraversion' ? 100 : 0} />
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow2() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Sensing (S)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function2 === 'Sensing' ? 100 : 0} />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Intuition (N)
          </Paper>            
          <LinearProgress variant="determinate" value={resultsdata.result.function2 === 'Intuition' ? 100 : 0} />
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow3() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Thinking (T)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function3 === 'Thinking' ? 100 : 0} />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Feeling (F)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function3 === 'Feeling' ? 100 : 0} />
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow4() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Judging (J)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function4 === 'Judging' ? 100 : 0} />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Perceiving (P)
          </Paper>
          <LinearProgress variant="determinate" value={resultsdata.result.function4 === 'Perceiving' ? 100 : 0} />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          {languageJson.personality_quizz}
        </Typography>
        
        { resultsdata.result && resultsdata.info ? 
          <div className={classes.paper}>        
            <div className="row">
              <div className="col-lg-6">
                  <header className="App-header">
                  <h3>
                    Your perspective
                  </h3>
                  <p>Your perspective type is : {resultsdata.result.result_string} </p>
                </header>
              </div>
              <div className="col-lg-6">
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={2}>
                  <FormRow1 />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <FormRow2 />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <FormRow3 />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <FormRow4 />
                </Grid>
              </Grid>
              </div>
            </div>
        </div>
        :<CircularLoading/>

      }

      </div>
    </Container>
  );
}

export default Results;
