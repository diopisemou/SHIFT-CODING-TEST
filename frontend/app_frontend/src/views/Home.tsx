import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  languageJson  from "../config/language";





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
}));

/**
 * Home component 
 * @param props 
 */
const Home = (props: { history: string[]; }) => {

  const classes  = useStyles();

  return (
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {languageJson.personality_quizz}
        </Typography>
          <div className="App">
            <header className="App-header">
              <p>
                Welcome to Shift Personnality Quizz.
              </p>
            </header>
          </div>
      </div>
    </Container>
  );
}

export default Home;

